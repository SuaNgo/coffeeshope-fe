"use client";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
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

  const addProduct = (productId, product, prop, image, price) => {
    setCartProducts((prev) => [
      ...prev,
      { productId, product, prop, image, price },
    ]);
  };

  const removeProduct = (productId) => {
    if (cartProducts?.length > 1) {
      setCartProducts((prev) => {
        if (productId !== -1) {
          return prev.toSpliced(productId, 1);
        }
        return prev;
      });
    } else
      setCartProducts((prev) => {
        if (productId !== -1) {
          clearCart();
          return prev.toSpliced(productId, 1);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
