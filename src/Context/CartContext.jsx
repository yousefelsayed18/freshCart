import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()
export default function CartContextProvider(props) {

    let headers ={
        token: localStorage.getItem("userToken")

    }
    function clearCart() {
        return axios
          .delete("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: headers,
          })
          .then((res) => res)
          .catch((res) => res);
      }
    const [cartId, setcartId] = useState(0)
    const [numberItems, setnumberItems] = useState(0)
    function addProductsToCart(productId) {
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productId }, {
            headers,
        })
        .then((res)=> res)
        .catch((err)=>err)
    }

    function getLoggedUserCart(){
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((res)=>{
            setcartId(res.data.data._id)
            console.log(res.data.numOfCartItems);
            
            setnumberItems(res.data.numOfCartItems)

            return res
            
        })
        .catch((err)=>err)
    }
    function updateCartProductQuantity(productId,newCount){
      return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount},{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }
    function deleteCarItem(productId){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }
    function checkout(cartId,url,formData){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{shippingAddress:formData,},{headers,})
        .then((res)=>res)
        .catch((err)=>err)
    }
    useEffect(()=>{
        getLoggedUserCart()
        
    },[])
    return <CartContext.Provider value={{ addProductsToCart, getLoggedUserCart, updateCartProductQuantity , deleteCarItem,checkout,cartId,setnumberItems,numberItems,clearCart,}}>
        {props.children}
    </CartContext.Provider>
}