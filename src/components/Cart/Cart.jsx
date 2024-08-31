/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  async function clearAllCartItem() {
    setIsLoadingForClearCart(true);
    let response = await clearCart();
    if (response.data.message === "success") {
      setCartDetails(null);
      setIsLoadingForClearCart(false);
    } else {
      toast.error("error");
      setIsLoadingForClearCart(false);
    }
  }
  let { getLoggedUserCart, updateCartProductQuantity, deleteCarItem, setnumberItems, numberItems, clearCart } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
      
    }
  }

  async function updateProduct(id, count) {
    if (count === 0) {
      deleteItem(id);
    } else {
      let response = await updateCartProductQuantity(id, count);
      if (response.data.status === "success") {
        setCartDetails(response.data.data);
        toast.success("Product updated");
      } else {
        toast.error("Error");
      }
    }
  }

  async function deleteItem(productId) {
    let response = await deleteCarItem(productId);
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
      setnumberItems(numberItems - 1);
    }
  }

  useEffect(() => {
    getCartItems();
  }, [CartDetails]);

  return (
    <>
               <button
        onClick={() => clearAllCartItem()}
        className="text-xl border border-emerald-500 p-3 rounded-lg text-gray-700"
      >
        clear all
      </button>
      {CartDetails?.products.length > 0 ? (
        <div className="flex flex-col gap-4">
          {CartDetails.products.map((product) => (
            <div key={product.product.id} className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
              <div className="flex flex-col md:flex-row items-center">
                <img src={product.product.imageCover} className="w-full md:w-1/3 max-w-full h-auto rounded-lg" alt={product.product.title} />
                <div className="flex flex-col md:ml-4 w-full">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{product.product.title}</h2>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">{product.price}</span>
                    <div className="flex items-center">
                      <button onClick={() => updateProduct(product.product.id, product.count - 1)} className="p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700" type="button">
                        <span className="sr-only">Decrease Quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button onClick={() => updateProduct(product.product.id, product.count + 1)} className="p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700" type="button">
                        <span className="sr-only">Increase Quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <span onClick={() => deleteItem(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Remove</span>
                </div>
              </div>
   
            </div>
            
          ))}
          <Link to="/checkout">
            <button className='btn my-3 w-full'>Check out</button>
          </Link>
        </div>
        

      ) : (
        <h1 className='text-2xl font-bold text-red-800 text-center my-8'>There are no items to show</h1>
      )}

    </>
  );
}
