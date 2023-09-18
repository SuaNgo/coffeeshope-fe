"use client";

import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductCard = ({ _id, product, price, images, discount }) => {
  const url = "/product/" + _id;

  return (
    <div className=" mx-8 rounded-xl border-2 border-solid shadow-new relative">
      {discount !== 0 && discount && (
        <div className="bg-red-500 p-1 w-fit mt-4 absolute">
          {discount} <FontAwesomeIcon icon={faPercent} />
        </div>
      )}

      <a href={url}>
        <div className="h-[250px] flex items-center justify-center p-5">
          <img
            src={images?.[0]}
            alt="product-image"
            className="h-[250px] w-[100%] "
          />
        </div>
        <div className=" rounded-b-xl p-5">
          <h1 className="text-[20px] font-title mb-2 text-ellipsis overflow-hidden whitespace-nowrap">
            {product.charAt(0).toUpperCase() + product.slice(1)}
          </h1>
          <div className="flex flex-col">
            <span
              className={`${
                discount
                  ? "line-through text-[16px] text-gray-400 font-title"
                  : "text-[20px] font-title font-bold "
              }`}
            >
              {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              <span>&#8363;</span>
            </span>
            {discount !== 0 && discount && (
              <span className="text-[20px] font-title font-bold">
                {(price - (price * discount) / 100)
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                <span>&#8363;</span>
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
