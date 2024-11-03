import Link from "next/link";
import React from "react";

export const PrimaryButton = ({ children, link, className }) => {
  return (
    <Link
      className={`${
        className ? className : ""
      } border border-primary text-[12px] font-semibold tracking-widest text-primary transition-all duration-150 hover:bg-primary hover:text-white bg-transparent px-6 py-3 `}
      href={link}
    >
      {children}
    </Link>
  );
};
export const SeconderyButton = ({ children, link, className }) => {
  return (
    <Link
      className={`${
        className ? className : ""
      } border border-white text-[12px] font-semibold tracking-widest text-white transition-all duration-150 hover:bg-white hover:text-primary bg-transparent px-6 py-3 `}
      href={link}
    >
      {children}
    </Link>
  );
};
export const SubmitButton = ({ children, type, className }) => {
  return (
    <button
      type={type ? type : "submit"}
      className={`${
        className ? className : "bg-transparent text-primary "
      } border border-primary text-[12px] font-semibold tracking-widest transition-all duration-150 hover:bg-primary hover:text-white  px-6 py-3 `}
    >
      {children}
    </button>
  );
};
export const SubmitButtonOutline = ({ children, type, className }) => {
  return (
    <button
      type={type ? type : "submit"}
      className={`${
        className ? className : ""
      } border border-white text-[12px] font-semibold tracking-widest text-white transition-all duration-150 hover:bg-white hover:text-primary bg-transparent px-6 py-3 `}
    >
      {children}
    </button>
  );
};
