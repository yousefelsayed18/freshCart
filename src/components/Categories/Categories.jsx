/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          {/* Your custom loading screen content */}
          <div className="loader">Loading...</div>
          {/* You can add more styling or an animated spinner here */}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 py-5 px-3">
        {categories.length > 0 ? categories.map((category) => (
          <div key={category._id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 card'>
            <Link to={`/categoriesdetails/${category._id}`}>
              <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className='w-full h-48 object-cover rounded-t-lg' src={category.image} alt={category.name} />
                <h3 className='text-center py-3 text-green-600'>{category.name}</h3>
              </div>
            </Link>
          </div>
        )) : (
          <div className="text-center text-gray-700 text-xl">No categories available</div>
        )}
      </div>
    </>
  );
}
