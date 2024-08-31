/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Style from "./Products.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { WishContext } from "../../Context/WishContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  let { addToWishList } = useContext(WishContext);
  let { data, isError, error, isLoading } = useProducts();
  let { addProductsToCart, setnumberItems, numberItems } = useContext(CartContext);
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);

  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addProductsToCart(id);
    if (response.data.status === "success") {
      setnumberItems(numberItems + 1);
      toast.success(response.data.message, {
        decoration: 4000,
        style: {
          backgroundColor: "green",
          color: "white",
        },
        position: "top-right",
      });
      setloading(false);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }

  if (isError) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  async function addToWish(id) {
    let response = await addToWishList(id);
    if (response.data.status === "success") {
      toast.success(response.data.message, {
        decoration: 4000,
        style: {
          backgroundColor: "green",
          color: "white",
        },
        position: "top-right",
      });
      setloading(false);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex flex-wrap -mx-2">
        {data?.data.data.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4 card">
              <div className="product p-4 bg-white border rounded-lg shadow-md">
                <Link to={`productdetails/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} className="w-full h-48 object-cover mb-2" alt="" />
                  <h3 className="text-emerald-600 mb-1">{product.category.name}</h3>
                  <h3 className="font-semibold mb-2">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span>{product.price} EGP</span>
                    <span>
                      {product.ratingsAverage}
                      <i className="fas fa-star text-yellow-400"></i>
                    </span>
                  </div>
                </Link>
                <div className="flex justify-between items-center">
                  <i
                    onClick={() => addToWish(product.id)}
                    className="fas fa-heart text-red-500 cursor-pointer"
                  ></i>
                  <button
                    className="btn bg-emerald-700 text-white px-4 py-2 rounded  focus:outline-none"
                    onClick={() => addToCart(product.id)}
                  >
                    {loading && currentId === product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
