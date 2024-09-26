//NEEDS TOUCHING
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaHome } from "react-icons/fa"; // Import FaHome icon
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
            };

            axiosPublic.post("/users", userInfo)
              .then((response) => {
                console.log(response)
                // Display success message using Swal.fire()
                Swal.fire("Success!", "New user signed up successfully.", "success");
                navigate(from, { replace: true });
              });
          })
          .catch((error) => {
            const errorMessage = error.message;
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  // login with google
  // login with google
const handleRegister = () => {
  signUpWithGmail().then(result =>{
    console.log(result.user);
    const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName
    }
    axiosPublic.post('/users', userInfo)
    .then(res =>{
        console.log(res.data);
        Swal.fire("Success!", "Logged in with Google successfully.", "success"); // Display success message
        navigate('/');
    })
  }).catch(error => {
    console.error("Error signing up with Google:", error);
  });
};

  return (
    <div className="w-full h-screen bg-f3f1ed flex justify-center items-center">
      <div className="max-w-md bg-white shadow w-full mx-auto ">
        <Link to="/" className="bg-white text-5xl absolute left-4 top-4 text-gray-500"><FaHome /></Link> {/* Back button */}
        <div className="mb-5 p-0">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Please Create An Account!</h3>
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Your name"
                className="input input-bordered"
                {...register("name")}
              />
            </div>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error message */}
            <p>{errors.message}</p>

            {/* submit btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Sign up"
              />
            </div>
          </form>
          <div className="text-center space-x-3 p-8">
            <button
              onClick={handleRegister}
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaGoogle />
            </button>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
