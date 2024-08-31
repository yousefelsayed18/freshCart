/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import  { Toaster } from 'react-hot-toast';
import Checkout from "./components/Checkout/Checkout";
import AllOrders from "./components/AllOrders/AllOrders";
import CategoriesContextProvider from "./Context/CategoriesContext";
import CategoriesDetails from "./components/CategoriesDetails/CategoriesDetails";
import WishList from "./components/WishList/WishList";
import WishContextProvider from "./Context/WishContext";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import RestPassword from "./components/RestPassword/RestPassword";



let query = new QueryClient();
let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><Checkout/></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><WishList/></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
      { path: "categoriesdetails/:id", element: <ProtectedRoute><CategoriesDetails/></ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      {path:"forget-password",element:<ForgetPassword/>,},
      {path:"verify-code",element:<VerifyCode/>,},
      {path:"resetpassword",element:<RestPassword/>,},
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <CategoriesContextProvider>
              <WishContextProvider>
              <RouterProvider router={router}></RouterProvider>
              </WishContextProvider>
            </CategoriesContextProvider>
          <Toaster/>
          </CartContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
