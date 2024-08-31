/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Style from "./WishList.module.css"
import { WishContext } from '../../Context/WishContext'

export default function WishList() {
  const [wishDetails, setwishDetails] = useState(null)
  let { getLoggedUserWish ,deleteWishList} = useContext(WishContext)
  const [counter, setCounter] = useState(0)
  async function getWishListItem() {
    let response = await getLoggedUserWish()
    if (response.data.status == "success") {
      // console.log(response.data);
      
      setwishDetails(response.data)
    }

  }
 async function deleteItem(productId){
  let response = await deleteWishList(productId)
  console.log(response.data);

  if(response.data.status=="success"){
    
    setwishDetails(response)

  }
  }
  useEffect(() => {
    getWishListItem()
  }, [wishDetails])
  return (
    <>


<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">Product</th>
        <th scope="col" className="px-6 py-3"></th>
        <th scope="col" className="px-6 py-3">Price</th>
        <th scope="col" className="px-6 py-3">Action</th>
      </tr>
    </thead>
    <tbody>
      {wishDetails?.data?.length > 0 ? (
        wishDetails.data.map((product) => (
          <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt='' />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {/* {product.category.name} */}
            </td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              ${product.price}
            </td>
            <td className="px-6 py-4">
              <span onClick={()=>deleteItem(product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Remove</span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
            No products found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </>
  )
}
