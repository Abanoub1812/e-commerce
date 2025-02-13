import React, { useContext, useEffect } from 'react';
import logo from "./../../assets/freshcart-logo.svg";
import { NavLink, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';
import { CartContext } from '../../Context/CartContext';
import { BsCart3 } from "react-icons/bs"; 

export default function Navbar() {

  let { noOfCartItems, getCart, setNoOfCartItems, clearCart } = useContext(CartContext);
  let { token, setToken } = useContext(TokenContext);
  let navigate = useNavigate();


  function onRegisterSuccess() {
    clearCart(); 
    navigate('/login'); 
  }

  function logout() {
    localStorage.removeItem('userToken');
    // clearCart();
    setToken(null); 
    navigate('/login'); 
  }

  async function getAllCart() {
    await getCart();
  }

 


useEffect(() => {
  getAllCart();

  if (localStorage.getItem("userToken") && !sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", "true");
    window.location.reload();
   
  }
}, [token]);


  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
        </NavLink>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
          
          {token && (
            <NavLink to="cart" className="relative flex items-center">
              <BsCart3 className="text-2xl text-gray-900 dark:text-white" />
              <span className="bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
                {noOfCartItems}
              </span>
            </NavLink>
          )}

          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {token ? (
              <li>
                <a
                  href="#"
                  onClick={logout}
                  className="block py-2 px-3 ms-4 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  LogOut
                </a>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-sm ${
                        isActive
                          ? 'text-blue-700 dark:text-blue-500 font-bold'
                          : 'text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="register"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-sm ${
                        isActive
                          ? 'text-blue-700 dark:text-blue-500 font-bold'
                          : 'text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
                      }`
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          {token ? (
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/" className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive
                      ? 'text-blue-700 dark:text-blue-500 font-bold'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
                  }`
                }>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="brands" className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive
                      ? 'text-blue-700 dark:text-blue-500 font-bold'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
                  }`
                }>
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink to="cat" className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive
                      ? 'text-blue-700 dark:text-blue-500 font-bold'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
                  }`
                }>
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="products" className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive
                      ? 'text-blue-700 dark:text-blue-500 font-bold'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
                  }`
                }>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="wishlist" className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm ${
                    isActive
                      ? 'text-blue-700 dark:text-blue-500 font-bold'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
                  }`
                }>
                  Wishlist
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
