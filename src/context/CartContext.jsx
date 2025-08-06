import { createContext, useContext } from "react";
import axios from "axios";
import React from 'react'
import { useAuth } from "./AuthProvider";


export const cartDataContext = createContext();

export const CartContext = ({children}) => {

const {token, cart, setCart } = useAuth();

    //ADD PRODUCT
 const handleAddToCart = async (productId, productQuantity) => {

    try {
      const quantity = productQuantity || 1;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        { productId, quantity },
        {
         withCredentials : true,
        }
      );
      setCart(res.data.cart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  //REDUCE PRODUCT
const handleReduceProduct = async (productId) => {
  try {
    
    const quantity =  -1;

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/cart/add`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
     
    setCart(res.data.cart);
    
  } catch (error) {
    console.error("Error reducing product:", error);
  }
};

// Remove PRODUCT
const handleRemoveFromCart = async (productId) => {
  try {

    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/cart/remove/${productId}`,
      {
        withCredentials : true,
      }
    );
 
    setCart(res.data.cart);
   
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};


  return (
   <cartDataContext.Provider value={{handleAddToCart, handleReduceProduct ,handleRemoveFromCart}}>
    {children}
   </cartDataContext.Provider>
  )
}

export const useCart = () => useContext(cartDataContext);