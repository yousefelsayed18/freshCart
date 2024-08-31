import axios from "axios";
import { createContext } from "react";

export let WishContext = createContext()
export default function WishContextProvider(props) {

let headers = {
    token:localStorage.getItem("userToken"),
}
    function addToWishList(productId){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:productId},{headers,})
        .then((res)=>res)
        .catch((err)=>err)
    }
    function getLoggedUserWish(){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers}
           
        )
        .then((res)=>res)
        .catch((err)=>err)
    }
    function deleteWishList(productId){
     return   axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }

    return <WishContext.Provider value={{addToWishList,getLoggedUserWish,deleteWishList}}>
        {props.children}
    </WishContext.Provider>

}