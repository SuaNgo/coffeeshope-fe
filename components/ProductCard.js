"use client";

import { CartContext } from "@/context/CartContextProvider";
import { useContext } from "react";

const ProductCard = ({ _id, product, price, images }) => {
  const url = "/product/" + _id;

  return (
    <div className="h-[350px] mb-10 bg-white m-10 rounded-xl p-5">
      <a href={url}>
        <div className="h-[250px] flex items-center justify-center">
          <img
            src={images?.[0]}
            alt="product-image"
            className="h-[250px] w-[100%] "
          />
        </div>
        <div>
          <h1 className="text-[20px] font-title mb-2">
            {product.charAt(0).toUpperCase() + product.slice(1)}
          </h1>
          <div className="flex flex-col">
            <span className="text-[20px] font-title">{price} VND</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
