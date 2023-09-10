"use client";

import {
  faCartShopping,
  faHome,
  faList,
  faMugHot,
  faRightFromBracket,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContextProvider";

const Navbar = () => {
  const pathname = usePathname();
  const [flexNav, setFlexNav] = useState(false);
  const activeLink =
    "bg-blue-300 max-[1024px]:mb-4 px-3 py-1 rounded-xl shadow-xl shadow-gray-300 min-[1025px]:mx-4";
  const unactiveLink =
    "hover:bg-blue-300 max-[1024px]:mb-4 px-3 py-1 rounded-xl min-[1025px]:mx-4";
  const hideButton =
    "fixed bg-white text-[30px] top-4 right-4 shadow-xl rounded-full border py-1 px-4 min-[1025px]:hidden";
  const showButton =
    "fixed bg-white text-[30px] top-4 left-4 shadow-xl rounded-full border py-2 px-4 min-[1025px]:hidden";
  const cssHideNav =
    "max-[1024px]:w-0 max-[1024px]:z-10 max-[1024px]:overflow-x-hidden max-[1024px]:top-0 max-[1024px]:p-0  bg-white  text-[28px] shadow flex justify-between max-[1024px]:flex-col max-[1024px]:fixed fixed w-full top-0 overflow-hidden min-[1025px]:items-center";
  const cssShowNav =
    "max-[1024px]:w-[250px] max-[1024px]:z-10 max-[1024px]:overflow-x-hidden max-[1024px]:top-0 max-[1024px]:p-0  bg-white text-[28px] rounded-r-xl shadow-2xl flex justify-between max-[1024px]:flex-col max-[1024px]:fixed border min-[1025px]:items-center";
  const { cartProducts } = useContext(CartContext);
  return (
    <>
      <header>
        <button
          onClick={() => {
            setFlexNav(!flexNav);
          }}
          className={flexNav ? hideButton : showButton}
        >
          {flexNav ? (
            <FontAwesomeIcon icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faList} />
          )}
        </button>
        <nav className={flexNav ? cssShowNav : cssHideNav}>
          <div className="max-[1024px]:mb-4 px-3 py-2 h-fit">
            <h1 className="font-logo text-center">NAMMOB'S COFFEE</h1>
          </div>
          <div className="max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:min-h-screen max-[1024px]:mt-10 text-center inline-block">
            <Link
              href="/"
              className={
                pathname == "/" ? `${activeLink} ` : `${unactiveLink} `
              }
            >
              {flexNav && <FontAwesomeIcon icon={faHome} />}
              <span className="text-[20px] leading-5 max-[1024px]:ml-2 font-welcome">
                Trang chủ
              </span>
            </Link>
            <Link
              href="/product"
              className={
                pathname == "/product" ? `${activeLink}` : `${unactiveLink}`
              }
            >
              {flexNav && <FontAwesomeIcon icon={faMugHot} />}
              <span className="text-[20px] leading-5 max-[1024px]:ml-2 font-welcome">
                Sản phẩm
              </span>
            </Link>
            <Link
              href="/order"
              className={
                pathname == "/order" ? `${activeLink}` : `${unactiveLink}`
              }
            >
              {flexNav && <FontAwesomeIcon icon={faCartShopping} />}
              <span className="text-[20px] leading-5 text-center max-[1024px]:ml-2 font-welcome">
                Đơn hàng {cartProducts.length}
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
