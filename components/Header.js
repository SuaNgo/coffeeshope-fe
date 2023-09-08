"use client";

import {
  faArrowAltCircleLeft,
  faCubes,
  faGear,
  faHome,
  faList,
  faListDots,
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
    "bg-blue-300 max-[1024px]:mb-4 px-3 py-1 rounded-xl shadow-xl shadow-gray-400 ";
  const unactiveLink =
    "hover:bg-blue-300 max-[1024px]:mb-4 px-3 py-1 rounded-xl";
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
            <h1 className="font-logo ">NAMMOB'S COFFEE</h1>
          </div>
          <div className="max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:min-h-screen max-[1024px]:mt-10 text-center inline-block">
            <Link
              href="/"
              className={
                pathname == "/" ? `${activeLink} ` : `${unactiveLink} `
              }
            >
              {flexNav && <FontAwesomeIcon icon={faList} />}
              <span className="text-[20px] leading-5 ml-2 font-welcome">
                Trang chủ
              </span>
            </Link>
            <Link
              href="/product"
              className={
                pathname == "/product" ? `${activeLink}` : `${unactiveLink}`
              }
            >
              {flexNav && <FontAwesomeIcon icon={faList} />}
              <span className="text-[20px] leading-5 ml-2 font-welcome">
                Sản phẩm
              </span>
            </Link>
            <Link
              href="/account"
              className={
                pathname == "/account" ? `${activeLink}` : `${unactiveLink}`
              }
            >
              {flexNav && <FontAwesomeIcon icon={faList} />}
              <span className="text-[20px] leading-5 ml-2 font-welcome">
                Tài khoản
              </span>
            </Link>
            <Link
              href="/order"
              className={
                pathname == "/order" ? `${activeLink}` : `${unactiveLink}`
              }
            >
              {flexNav && <FontAwesomeIcon icon={faList} />}
              <span className="text-[20px] leading-5 text-center ml-2 font-welcome">
                Đơn hàng {cartProducts.length}
              </span>
            </Link>
            <button
              className={`${unactiveLink} max-[1024px]:w-full text-left max-[1024px]:absolute max-[1024px]:bottom-[150px]`}
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              {flexNav && (
                <FontAwesomeIcon icon={faRightFromBracket} flip="horizontal" />
              )}
              <span className="text-[20px] leading-5 ml-2 font-welcome">
                Logout
              </span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
