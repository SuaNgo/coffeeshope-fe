"use client";
import { CartContext } from "@/context/CartContextProvider";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const SingleProduct = ({
  _id,
  product,
  category,
  properties,
  images,
  description,
  price,
  discount,
}) => {
  const { addProduct } = useContext(CartContext);
  const [activeImage, setActiveImage] = useState(images?.[0]);
  const [activeChoice, setActiveChoice] = useState(null);
  const [evaluate, setEvaluate] = useState(null);
  const [changePrice, setChangePrice] = useState(1);
  const productProp = properties?.split(",");

  useEffect(() => {
    if (evaluate) {
      const intEvaluate = parseFloat(evaluate);
      if (intEvaluate > 1) {
        setChangePrice((intEvaluate / 30).toFixed(2));
      } else if (100 <= intEvaluate < 600) {
        setChangePrice((intEvaluate / 100).toFixed(2));
      } else if (evaluate === "S") {
        setChangePrice(1);
      } else if (evaluate === "M") {
        setChangePrice(1.2);
      } else if (evaluate === "XL") {
        setChangePrice(1.5);
      }
    } else setChangePrice(1);
  }, [activeChoice]);

  let newPrice = 0;
  if (discount) {
    newPrice = ((price - (price * discount) / 100) * changePrice)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  } else {
    newPrice = (price * changePrice)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  }

  return (
    <div className="my-0 mx-20 pt-20 max-[1024px]:pt-10 pb-0 px-5">
      <div className="grid grid-cols-2 max-[768px]:grid-cols-1 gap-10">
        <div className="bg-white rounded-xl p-8 mb-10">
          <div className="">
            <img className="max-w-full max-h-full" src={activeImage} />
          </div>
          <div className="flex gap-3 mt-3">
            {images?.map((image, index) => (
              <div
                className="border-2 border-solid h-20 p-1 cursor-pointer rounded-md"
                key={index}
                onClick={() => setActiveImage(image)}
              >
                <img
                  src={image}
                  alt="product-pic"
                  className="max-w-full max-h-full"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[40px] leading-10 font-title font-semibold mt-2 mb-8 max-[1024px]:mt-20">
            {product}
          </span>
          <div className="my-4 flex flex-row">
            {discount !== 0 && discount && (
              <span className="text-[28px] text-red-600 font-title font-semibold ">
                {((price - (price * discount) / 100) * changePrice)
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                <span>&#8363;</span>
              </span>
            )}

            <span
              className={`${
                discount
                  ? "line-through text-[16px] text-gray-400 font-title p-3"
                  : "text-[20px] font-title"
              }`}
            >
              {(price * changePrice)
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              <span>&#8363;</span>
            </span>
          </div>
          <div>
            <div>
              {productProp?.map((w, index) => (
                <button
                  name={w}
                  type="button"
                  className={`${
                    activeChoice === w
                      ? "mr-4 mb-4 p-2 rounded-md bg-slate-950 text-[20px] text-white"
                      : "mr-4 mb-4 p-2 rounded-md bg-slate-100 text-[20px]"
                  }  `}
                  key={index}
                  onClick={() => {
                    setActiveChoice(w);
                    setEvaluate(w);
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <div>
            <button
              className="text-[20px] bg-blue-400 rounded-lg font-medium text-white p-2"
              onClick={() => {
                addProduct(_id, activeChoice, images?.[0], newPrice);
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              Add to cart
            </button>
          </div>
          <div>
            <h1 className="text-[16px] font-title font-semibold my-4 ">
              Mô tả
            </h1>
            <p className="text-[14px] font-title my-4 text-justify">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
