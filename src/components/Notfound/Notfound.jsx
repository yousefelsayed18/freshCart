/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Style from "./Notfound.module.css"
import NotFound from "../../assets/images/3861592.jpg"

export default function Notfound() {

  const [counter, setCounter] = useState(0)

  return (
    <>
      <div className='w-full md:w-[75%] lg:w-[50%] mx-auto text-center'>
        <img 
          src={NotFound} 
          alt="Not Found" 
          className='w-full h-auto'
        />
      </div>
    </>
  )
}
