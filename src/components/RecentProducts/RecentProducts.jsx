/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import { WishContext } from "../../Context/WishContext";

export default function RecentProducts() {
  const [heartLoading, setHeartLoading] = useState(false);
  let { addToWishList } = useContext(WishContext);
  let { data, isError, error, isLoading } = useProducts();
  let { addProductsToCart, setnumberItems, numberItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [currentIdHeart, setCurrentIdHeart] = useState(0);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    let response = await addProductsToCart(id);
    console.log(response);
    if (response.data.status === "success") {
      setnumberItems(numberItems + 1);
      toast.success(response.data.message, {
        duration: 4000,
        style: {
          backgroundColor: "green", color: "white"
        },
        position: "top-right"
      });
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  if (isError) {
    return <h3>{error}</h3>;
  }

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  async function addToWish(id) {
    setCurrentIdHeart(id);
    setHeartLoading(true);
    let response = await addToWishList(id);
    console.log(response.data);
    if (response.data.status === "success") {
      toast.success(response.data.message, {
        duration: 4000,
        style: {
          backgroundColor: "green", color: "white"
        },
        position: "top-right"
      });
      setHeartLoading(false);
    } else {
      toast.error(response.data.message);
      setHeartLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.data.data.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg bg-white card">
            <Link to={`productdetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className="w-full h-48 object-cover" alt={product.title} />
              <div className="p-4">
                <h3 className="text-emerald-600 text-lg">{product.category.name}</h3>
                <h3 className="font-semibold mb-2 text-sm">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-400 ml-1"></i>
                  </span>
                </div>
              </div>
            </Link>
            <div className="flex justify-between items-center p-4">
              <i
                onClick={() => addToWish(product.id)}
                className="cursor-pointer"
              >
                {heartLoading && currentIdHeart === product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-heart text-red-500"></i>
                )}
              </i>
              <button
                className="btn bg-blue-500 text-white py-2 px-4 rounded"
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
        ))}
      </div>
    </div>
  );
}
