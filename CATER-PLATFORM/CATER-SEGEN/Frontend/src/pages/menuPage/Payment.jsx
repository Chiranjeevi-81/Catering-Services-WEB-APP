import { Elements } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";

// outside of a component’s render to avoid
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

const Payment = () => {
  const [cart] = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(parseFloat(cartTotal.toFixed(2)));
    };

    calculateTotalPrice();
  }, [cart]);

  return (
    <div>
    
    <div className="page-header mb-0">
    <div className="container">
      <div className="row mx-auto text-center justify-center">
        <div className="col-12">
          <h2 className="font-extrabold  text-6xl text-green ">CHECKOUT</h2>
        </div>

        {/* <!-- <div className="col-12">
          <a href="">Home</a>
          <a href="">Menu</a>
        </div> --> */}
      </div>
    </div>
  </div>
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart}/>
      </Elements>
    </div>
    </div>
  );
};

export default Payment;
