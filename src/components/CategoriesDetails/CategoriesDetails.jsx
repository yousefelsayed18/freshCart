/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Style from "./CategoriesDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';
export default function CategoriesDetails() {
  const [category, setcategory] = useState(null)
  let { id } = useParams()
  function getCategory(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/6407f40db575d3b90bf957fa`)
      .then((res) => {
        console.log(res.data.data);
        
        setcategory(res.data.data)
      })
      .catch((res) => { })
  }
  useEffect(() => {
    getCategory(id)
  }, [])
  return (
    <>
    <div className=' text-center'>
      <div className="category"></div>
      <h1>{category?.name}</h1>
    </div>
    </>
  )
}
