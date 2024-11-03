"use client";
import SingleBlogMain from "@/app/components/Blogs/SingleBlog/SingleBlogMain";
import Footer from "@/app/layouts/Footer";
import Header from "@/app/layouts/Header";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  return (
    <>
      <Header bgColor="bg-[#be7c68] bg-opacity-50" />
      <SingleBlogMain id={id} />
      <Footer />
    </>
  );
};

export default Page;
