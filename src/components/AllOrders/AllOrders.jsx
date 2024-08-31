/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Style from "./AllOrders.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function AllOrders() {

  const [counter, setCounter] = useState(0)

  return (
    <>
      <div className='orders flex flex-wrap justify-center items-center'>
        <div className='text-center'>
          <h1 className='text-green-500'>Thank You!</h1>
          <p className='text-green-500'>The purchase was completed successfully.</p>
          <FontAwesomeIcon 
            icon={faCheckCircle} 
            size="3x" 
            className='text-green-500 mt-4' 
          />
          <Link to={"/"}>
          <button className='btn my-3 w-full'>Continue Shopping</button>

          </Link>
        </div>
      </div>
    </>
  )
}
