"use client";

import { CartContext } from "@/context/CartContextProvider";
import { useContext } from "react";

const ProductCard = ({ _id, product, description, price, images }) => {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;

  return (
    <div className="h-[400px] mb-10 bg-white m-10 rounded-xl p-5">
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
          <button
            className="text-[20px] bg-blue-400 rounded-xl font-medium text-white mt-2"
            onClick={() => addProduct(_id)}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
