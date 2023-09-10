"use client";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [cartProp, setCartProp] = useState(null);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  useEffect(() => {
    if (cartProp?.length > 0) {
      ls?.setItem("prop", JSON.stringify(cartProp));
    }
  }, [cartProp]);
  useEffect(() => {
    if (ls && ls.getItem("prop")) {
      setCartProp(JSON.parse(ls.getItem("prop")));
    }
  }, []);
  const addProduct = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  const addProp = (prop) => {
    setCartProp((prev) => [prop]);
  };
  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  };
  const clearCart = () => {
    window.localStorage.clear();
  };
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
        cartProp,
        addProp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
