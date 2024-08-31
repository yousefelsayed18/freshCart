/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Brands() {
  const [brands, setBrands] = useState([]);

  function getBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        console.log(res.data.data);
        setBrands(res.data.data);
      })
      .catch((res) => {
        // Handle errors here if necessary
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <h1 className='text-center text-3xl md:text-4xl text-green-600 my-4'>All Brands</h1>
      <div className='flex flex-wrap gap-6 md:gap-10 my-4'>
        {brands.length > 0 ? brands.map((brand) => (
          <div key={brand._id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5'>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg w-full h-32 object-cover" src={brand.image} alt={brand.name} />
              <h4 className='text-center my-2 text-lg'>{brand.name}</h4>
            </div>
          </div>
        )) : (
          <span className="loader text-center">Loading...</span>
        )}
      </div>
    </>
  );
}
