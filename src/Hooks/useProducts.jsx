import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
export default function useProducts() {

    function getProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
      }
    
      let producrInfo = useQuery({
        queryKey: ["recentProducts"],
        queryFn: getProducts,
        staleTime: 20000,
      });
      return producrInfo
}
