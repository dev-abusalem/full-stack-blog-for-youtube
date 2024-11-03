"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { PrimaryButton } from "../global/Buttons";
import Image from "next/image";

const MobileMenu = () => {
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
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="mt-10">
          <div className="">
            <Image
              src="/images/food-blogger-site-logo.svg"
              alt="logo"
              width={60}
              height={60}
            />
            <nav className="mt-5">
              <ul className="flex flex-col justify-start items-start gap-4">
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
          <div className="flex gap-x-5 items-center mt-12">
            <div>
              <PrimaryButton link="/login">LOGIN</PrimaryButton>
            </div>
            <div className="flex justify-end items-center gap-5 ">
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
