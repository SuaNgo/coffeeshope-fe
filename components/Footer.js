import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="h-full bg-gray-900 mt-20 pb-20">
        <div className="grid pt-10 px-24">
          <div className="grid grid-cols-4">
            <div className="flex flex-col text-white font-title">
              <h1 className="font-bold mb-10 text-[16px]">Giới thiệu</h1>
              <Link className="text-[14px]" href="/">
                Về Trang Web
              </Link>
              <Link className="text-[14px]" href="/">
                Sản phẩm
              </Link>
              <Link className="text-[14px]" href="/">
                Khuyến mãi
              </Link>
            </div>
            <div className="flex flex-col text-white font-title">
              <h1 className="font-bold mb-10 text-[16px]">Điều khoản</h1>
              <Link className="text-[14px]" href="/">
                Điều khoản sử dụng
              </Link>
              <Link className="text-[14px]" href="/">
                Chính sách bảo mật thông tin
              </Link>
            </div>
            <div className="flex flex-col text-white font-title ">
              <h1 className="font-bold text-[16px]">Đặt hàng: </h1>
              <h1 className="font-bold mb-10 text-[16px]">Liên hệ</h1>
              <p className="text-[14px]">
                Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
              </p>
            </div>
            <div className="flex flex-col text-white font-title font-bold text-[20px]">
              <div className="relative w-[270px]">
                <img src="/dhbkhn.jpg" className="" />
                <div className="absolute top-4 left-4">
                  <a href="https://hust.edu.vn/" className="flex">
                    <img
                      src="/hust-logo.png"
                      className="w-10 h-10 border-2 border-solid border-white"
                    />
                    <h1 className="text-black hover:underline text-[14px] ml-4">
                      Đại học Bách Khoa Hà Nội
                    </h1>
                  </a>
                </div>
                <a href="https://www.facebook.com/dhbkhanoi">
                  <FontAwesomeIcon className="mt-4" icon={faFacebook} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-white h-0 mt-8 mb-10 mx-auto w-[90%] "></div>
        <div className="text-white font-medium font-title px-20">
          Bản quyền thuộc về Đại học Bách Khoa Hà Nội <br />
          Địa chỉ: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội <br />
          Điện thoại: <br />
          Email: <br />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
