import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import useCart from "../hooks/useCart";
import logo from '../../public/image.png'
import useAdmin from '../hooks/useAdmin';
import { useTheme } from "../hooks/ThemeContext";
import "../index.css";

const Navbar = () => {
  const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isSticky, setSticky] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/boxgenie", label: "Box-Genie" },
    { path: "/wedding-catering", label: "Wedding-Catering" },
    { path: "/event-catering", label: "Event-Catering" },
    { path: "/corporate-catering", label: "Corporate-Catering" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      id="navbar"
      className={`max-w-screen-2xl container1 mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out  ${
        isDarkMode ? "dark" : ""
      } ${isSticky ? "sticky-bg-white" : "sticky-bg-white"}`}
    >
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-white transition-all duration-300 ease-in-out  text-black font-semibold"
            : ""
        }`}
        style={{ maxWidth: "100%", width: "100%" ,maxHeight:"14.5vh"}}
      >
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <label
              onClick={toggleMenu}
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3 text ${
                isDarkMode ? "dark" : ""
              }`}
              style={{ display: isMenuOpen ? "block" : "none" }}
            >
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`text-${isSticky ? "black" : "black"} font-bold hover:text-green text-G hover:bg-transparent ${
                      location.pathname === item.path ? "active text-gold" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <a href="/" className="font-extrabold text-green text-4xl ">
            LOGO
          </a> */}
         <a href="/">
         <a href="/">
  <img
    src={logo}
    alt=""
    className="my-5 h-20"
    style={{ filter: 'brightness(250%) contrast(200%);', minHeight: '80px' }}
    id="logoms"
  />
</a>

</a>

         
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1   text-lg">
            {navItems.map((item, index) => (
              
              <li key={index}>
              <Link
    to={item.path}
    className={`text-${isSticky ? "black" : "black"} font-bold rounded-full hover:text-white text-G  hover:rounded-full hover:bg-hover  px-3 py-1 ${
        location.pathname === item.path ? "active text-gold" : ""
    }`}
>
    {item.label}
</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/cart-page">
            <label
              tabIndex={0}
              className={`btn btn-ghost btn-circle lg:flex items-center justify-center mr-3 text-${
                isSticky ? "black" : "black"
              } font-bold`}
            >
              <div className="indicator">
                <svg                   xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.length || 0}
                </span>
              </div>
            </label>
          </Link>
          {user ? (
                        <>
                            {isAdmin ? ( // Render dashboard link if user is admin
                                <Link to="/dashboard" className="btn flex items-center  rounded-full px-6 bg-green text-white">Dashboard</Link>
                            ) : null}
                            <Profile user={user} />
                        </>
                    ) : (
                        <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white">
                            <FaRegUser /> Login
                        </button>
                    )}
                    <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;