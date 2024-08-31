/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Style from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  let { numberItems } = useContext(CartContext);

  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-slate-200 fixed top-0 right-0 left-0 z-[99]">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className="flex items-center gap-5">
          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} width={110} className="h-8" alt="fresh cart Logo" />
          </Link>
        </div>
        <div className="hidden md:flex flex-grow justify-center">
          {userLogin !== null ? (
            <ul className="flex gap-4">
              <li><Link to="">Home</Link></li>
              <li><Link to="cart">Cart</Link></li>
              <li><Link to="wishlist">Wish List</Link></li>
              <li><Link to="products">Products</Link></li>
              <li><Link to="categories">Categories</Link></li>
              <li><Link to="brands">Brands</Link></li>
            </ul>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
      
          <div className="flex items-center gap-4">
            {userLogin !== null ? (
              <>
                <span onClick={signOut} className="text-sm cursor-pointer">Log Out</span>
                <Link to="cart" className="relative flex items-center">
                  <i className="fas fa-shopping-cart cartIcon"></i>
                  <div className="absolute top-[-5px] right-[-10px] bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {numberItems}
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="login" className="text-sm">Login</Link>
                <Link to="register" className="text-sm">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
