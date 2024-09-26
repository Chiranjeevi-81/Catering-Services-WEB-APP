import React, { useContext, useState } from "react";
// import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2'
import useCart from "../hooks/useCart";
import axios from 'axios';
const Cards = ({ item }) => {
  const { name, image, price, description, _id } = item;

  const {user} = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(item)
  // const [isHeartFilled, setIsHeartFilled] = useState(false);

  // const handleHeartClick = () => {
  //   setIsHeartFilled(!isHeartFilled);
  // };


  // add to cart handler
  const handleAddToCart = item => {
    // console.log(item);
    if(user && user.email){
        const cartItem = {menuItemId: _id, name, quantity : 1, image, price, email: user.email}

        axios.post('http://localhost:5000/carts', cartItem)
        .then((response) => {
          console.log(response);
          if(response){
            refetch(); // refetch cart
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Food added on the cart.',
                  showConfirmButton: false,
                  timer: 1500
                })
          }
        })
        .catch( (error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          })
        });
    }
    else{
        Swal.fire({
            title: 'Please login to order the food',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login', {state: {from: location}})
            }
          })
    }
}

  return (
    <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5 bg-white">
        <figure>
          <img src={item.image} alt="Shoes" className="hover:scale-105 rounded-lg transition-all  w-auto  np duration-200 md:h-60" />
        </figure>
    
      <div className="card-body text-black">
       <p to={`/menu/${item._id}`}><h2 className="card-title text-lg">{item.name}</h2></p>
       <p to={`/menu/${item._id}`}><p className=" text-md text-Green ">{description}</p></p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">Rs </span> {item.price}
          </h5>
          <button onClick={() => handleAddToCart(item)} className="btn bg-green text-white border-none">Add to Cart </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
