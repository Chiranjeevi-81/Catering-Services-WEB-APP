import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof price !== 'number' || price < 1) {
      console.error('Invalid price value. Must be a number greater than or equal to 1.');
      return;
    }

    axiosSecure.post('/create-payment-intent', { price })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(error => {
        console.error("Error fetching client secret:", error);
      });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'anonymous',
          email: user?.email || 'unknown'
        },
      },
    });

    if (error) {
      setCardError(error.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const transitionId = paymentIntent.id;
      const itemwithquantity = cart.map(item => `${item.name} * ${item.quantity}`)
      let total=0;
      setCardError(`Your transitionId is: ${transitionId}`);
      cart.forEach(item => {
        total+=item.quantity;
      });
      console.log("Total: ",total);
      console.log(cart[0]);
      const paymentInfo = {
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: total,
        status: "order pending",
        itemsName: itemwithquantity,
        cartItems: cart.map(item => item._id),
        menuItems: cart.map(item => item.menuItemId)
      };

      axiosSecure.post('/payments', paymentInfo)
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: 'Payment info sent successfully!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/order');
            }
          });
        })
        .catch(error => {
          console.error("Error sending payment info:", error);
        });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
        <div className="md:w-1/2 space-y-3">
          <h4 className="text-4xl font-semibold">Order Summary</h4>
          <p>Total Price: ₹{price}</p>
      
          <p>Number of Items: {cart.length}</p>
          <p>
    User_id: <span className="text-sm">{user?.uid}</span>
  </p>
  <h3 className="text-lg font-semibold mt-4">Item Details</h3>
  {cart.map((item, index) => (
    <p key={index}>
      {item.name} - Quantity: {item.quantity}
    </p>
  ))}
        </div>
        <div className={`md:w-1/3 bg-white w-full border space-y-5  card shrink-0 max-w-sm shadow-2xl px-4 py-8`}>
          <h4 className="text-lg font-semibold">Process your Payment!</h4>
          <h5 className="font-medium">Credit/Debit Card</h5>
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#00cc66",
                    "::placeholder": {
                      color: "black",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              type="submit"
              disabled={!stripe || !clientSecret}
              className="btn btn-primary btn-sm mt-5 w-full"
            >
              Pay
            </button>
          </form>
          {cardError && <p className="text-red text-xs italic">{cardError}</p>}
          <div className="mt-5 text-center">
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
