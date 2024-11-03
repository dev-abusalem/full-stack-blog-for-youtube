import React from "react";
import Conatiner from "../global/Conatiner";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { PrimaryButton, SeconderyButton } from "../global/Buttons";
const Footer = () => {
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
      title: "Videos",
      href: "/videos",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];
  return (
    <header className=" py-16 w-full bg-transparent flex justify-start items-center ">
      <Conatiner>
        <div className="md:flex justify-between gap-x-5 items-center">
          <div className="flex justify-start items-center gap-8">
            <Image
              src="/images/food-blogger-site-logo.svg"
              alt="logo"
              width={60}
              height={60}
            />
          </div>
          <nav>
            <ul className="flex py-4 md:py-0 justify-start items-center gap-4">
              {menu.map((item, index) => (
                <li key={index}>
                  <Link
                    className=" text-[13px] hover:text-primary duration-150 transition-all uppercase"
                    href={item.href}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className=" md:justify-end items-center  flex gap-5">
            <div className="flex justify-end items-center gap-5 text-primary">
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
          </div>
        </div>
        <div className="md:flex text-gray-400 text-sm justify-between items-center gap-5 pt-10">
          <p>© 2024 Food Blogger & Influencer</p>
          <p>Powered by Food Blogger & Influencer</p>
        </div>
      </Conatiner>
    </header>
  );
};

export default Footer;
