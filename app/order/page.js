"use client";

import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "@/context/CartContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "@/components";

export default function CartPage() {
  const { cartProducts, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const ids = cartProducts.map((p) => p.productId);
  const cartProp = cartProducts.map((p) => p.prop);
  const prices = cartProducts.map((p) => p.price);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/orders", { ids: ids }).then((response) => {
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
      ids,
      cartProp,
      total,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  let total = 0;
  for (const price of prices) {
    total = total + parseInt(price.replace(/\./g, ""));
  }
  let count = {};
  cartProp.forEach((element) => {
    count[element] = (count[element] || 0) + 1;
  });

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
      <div className="min-h-screen max-h-full">
        <div className="flex flex-row justify-between max-[1024px]:flex-col">
          <div className="mt-20 mx-10 mb-10 p-5 bg-white rounded-xl border-solid shadow-new">
            <h2 className="font-title text-[40px] font-bold">Giỏ hàng</h2>
            {!ids?.length && <div>Không có đơn hàng nào cần thanh toán</div>}

            {products?.length > 0 && (
              <div className="grid">
                {cartProducts.map((product, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 max-[425px]:flex max-[425px]:flex-col"
                  >
                    <div className="border-t-2 border-solid border-gray-400">
                      <div className="h-[300px] flex flex-col items-center justify-center ">
                        <h1 className="font-title text-[20px] font-bold">
                          {product.product}
                        </h1>
                        <img
                          src={product.image}
                          alt="image-cart"
                          className="h-[240px] w-[100%] "
                        />
                      </div>
                    </div>

                    <div className="border-t-2 border-solid border-gray-400 text-[20px] px-2 max-[768px]:px-0 flex flex-row items-center justify-center">
                      <p className="leading-8 h-8">{product.prop}</p>
                    </div>
                    <div className="border-t-2 border-solid border-gray-400 text-[20px] px-10 max-[768px]:px-0 flex flex-row justify-between items-center">
                      <p className="leading-8 h-8">
                        {product.price}
                        <span>&#8363;</span>
                      </p>
                      <button
                        className="bg-gray-300 rounded-lg text-[20px] w-10 h-10"
                        onClick={() => lessOfThisProduct(index)}
                      >
                        <FontAwesomeIcon icon={faX} />
                      </button>
                    </div>
                    <div className="border-t-2 border-solid border-gray-400 text-center px-10 max-[768px]:px-0"></div>
                  </div>
                ))}
                <div className="grid grid-cols-3">
                  <div className="border-t-2 border-solid border-gray-400"></div>
                  <div className="border-t-2 border-solid border-gray-400"></div>

                  <div className="border-t-2 border-solid border-gray-400 text-[20px] px-10 max-[768px]:px-0">
                    {total
                      .toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                    <span>&#8363;</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {!!ids?.length && (
            <div className="mt-20 mx-10 mb-10 p-5 bg-white rounded-xl flex flex-col border-solid shadow-new">
              <h2 className="font-title text-[40px] font-bold">
                Thông tin đơn hàng
              </h2>
              <input
                className="text-[20px] font-title my-4 rounded-3xl border-none bg-slate-200"
                type="text"
                placeholder="Tên khách hàng"
                value={name}
                name="Tên khách hàng"
                onChange={(ev) => setName(ev.target.value)}
              />
              <input
                className="text-[20px] font-title my-4 rounded-3xl border-none bg-slate-200"
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />

              <input
                className="text-[20px] font-title my-4 rounded-3xl border-none bg-slate-200"
                type="text"
                placeholder="Thành phố"
                value={city}
                name="Thành phố"
                onChange={(ev) => setCity(ev.target.value)}
              />
              <input
                className="text-[20px] font-title my-4 rounded-3xl border-none bg-slate-200"
                type="text"
                placeholder="Mã bưu chính"
                value={postalCode}
                name="Mã bưu chính"
                onChange={(ev) => setPostalCode(ev.target.value)}
              />

              <input
                className="text-[20px] font-title my-4 rounded-3xl border-none bg-slate-200"
                type="text"
                placeholder="Địa chỉ"
                value={streetAddress}
                name="Địa chỉ"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <input
                className="text-[20px] font-title my-4 rounded-3xl border-none bg-slate-200"
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
      <Footer />
    </>
  );
}
