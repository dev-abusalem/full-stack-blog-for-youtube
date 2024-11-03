"use client";
import React from "react";
import Conatiner from "../global/Conatiner";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { SeconderyButton } from "../global/Buttons";
import MobileMenu from "./MobileMenu";
import { getToken } from "../(server)/token/getToken";
const Header = ({ bgColor }) => {
  const menu = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },

    {
      title: "Blogs",
      href: "/blogs",
    },

    {
      title: "Contact",
      href: "/contact",
    },
  ];

  const token = getToken();
  return (
    <header
      className={`min-h-[60px] z-50 w-full ${
        bgColor ? bgColor : "bg-transparent"
      } flex justify-start items-center absolute top-0`}
    >
      <Conatiner>
        <div className="block lg:hidden">
          <MobileMenu />
        </div>
        <div className=" lg:flex hidden justify-between gap-x-5 items-center">
          <div className="flex justify-start items-center gap-8">
            <Image
              src="/images/food-blogger-site-logo.svg"
              alt="logo"
              width={60}
              height={60}
            />
            <nav>
              <ul className="flex justify-start items-center gap-4">
                {menu.map((item, index) => (
                  <li key={index}>
                    <Link
                      className=" font-[600] text-[13px] hover:text-primary duration-150 transition-all uppercase"
                      href={item.href}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className=" justify-end items-center flex gap-5">
            <div className="flex justify-end items-center gap-5 text-white">
              <Link href="#">
                <FaYoutube />
              </Link>
              <Link href="#">
                <FaInstagram />
              </Link>
              <Link href="#">
                <FaFacebook />
              </Link>
            </div>
            <div>
              <SeconderyButton link="/login">
                {token ? "DASHBOARD" : "LOGIN"}
              </SeconderyButton>
            </div>
          </div>
        </div>
      </Conatiner>
    </header>
  );
};

export default Header;
