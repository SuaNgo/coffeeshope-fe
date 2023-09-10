"use client";

import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "@/context/CartContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart, cartProp } =
    useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/orders", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  const moreOfThisProduct = (id) => {
    addProduct(id);
  };
  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };
  const goToPayment = async () => {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProp,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <div className="h-screen bg-slate-200">
          <div className="flex">
            <div className="mt-20 mx-10 mb-10 p-5 bg-white rounded-xl">
              <h1>Cảm ơn bạn đã đặt hàng!</h1>
              <p>Sẽ có thông báo gửi đến email của bạn khi đơn hàng đến nơi</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="min-h-screen max-h-full bg-slate-200">
        <div className="flex flex-row justify-between max-[1024px]:flex-col">
          <div className="mt-20 mx-10 mb-10 p-5 bg-white rounded-xl">
            <h2 className="font-title text-[40px] font-bold">Giỏ hàng</h2>
            {!cartProducts?.length && (
              <div>Không có đơn hàng nào cần thanh toán</div>
            )}

            {products?.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th className="text-left text-[20px] text-gray-400">
                      Sản phẩm
                    </th>
                    <th className="text-left text-[20px] pl-10 pr-10 text-gray-400">
                      Số lượng
                    </th>
                    <th className="text-left text-[20px] pl-10 pr-10 text-gray-400">
                      Loại
                    </th>
                    <th className="text-left text-[20px] pl-10 pr-10 text-gray-400">
                      Đơn giá
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="border-t-2 border-solid border-gray-400">
                        <div className="h-[250px] flex items-center justify-center">
                          <img
                            src={product.images[0]}
                            alt="image-cart"
                            className="h-[240px] w-[100%] "
                          />
                        </div>
                        {product.title}
                      </td>
                      <td className="border-t-2 border-solid border-gray-400 text-center pl-10 pr-10">
                        <button
                          className="bg-gray-300 p-3 rounded-lg text-[20px] w-10 mb-2"
                          onClick={() => moreOfThisProduct(product._id)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <div className="text-[20px]">
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </div>
                        <button
                          className="bg-gray-300 p-3 rounded-lg text-[20px] w-10 mt-2"
                          onClick={() => lessOfThisProduct(product._id)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </td>
                      <td className="border-t-2 border-solid border-gray-400 text-[20px] pl-10 pr-10">
                        {cartProp}
                      </td>
                      <td className="border-t-2 border-solid border-gray-400 text-[20px] pl-10 pr-10">
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}{" "}
                        VND
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="border-t-2 border-solid border-gray-400"></td>
                    <td className="border-t-2 border-solid border-gray-400"></td>
                    <td className="border-t-2 border-solid border-gray-400"></td>
                    <td className="border-t-2 border-solid border-gray-400 text-[20px] pl-10 pr-10">
                      {total} VND
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          {!!cartProducts?.length && (
            <div className="mt-20 mx-10 mb-10 p-5 bg-white rounded-xl flex flex-col">
              <h2 className="font-title text-[40px] font-bold">
                Thông tin đơn hàng
              </h2>
              <input
                className="text-[20px] font-title my-4"
                type="text"
                placeholder="Tên khách hàng"
                value={name}
                name="Tên khách hàng"
                onChange={(ev) => setName(ev.target.value)}
              />
              <input
                className="text-[20px] font-title my-4"
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />

              <input
                className="text-[20px] font-title my-4"
                type="text"
                placeholder="Thành phố"
                value={city}
                name="Thành phố"
                onChange={(ev) => setCity(ev.target.value)}
              />
              <input
                className="text-[20px] font-title my-4"
                type="text"
                placeholder="Mã bưu chính"
                value={postalCode}
                name="Mã bưu chính"
                onChange={(ev) => setPostalCode(ev.target.value)}
              />

              <input
                className="text-[20px] font-title my-4"
                type="text"
                placeholder="Địa chỉ"
                value={streetAddress}
                name="Địa chỉ"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <input
                className="text-[20px] font-title my-4"
                type="text"
                placeholder="Quốc gia"
                value={country}
                name="Quốc gia"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <button
                className="self-end bg-blue-400 text-[20px] text-white font-bold py-1 px-3 rounded-xl"
                onClick={goToPayment}
              >
                Tiếp tục thanh toán
                <FontAwesomeIcon className="ml-4" icon={faArrowRight} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
