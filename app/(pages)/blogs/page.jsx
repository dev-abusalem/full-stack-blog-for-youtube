import BlogMain from "@/app/components/Blogs/BlogsMain";
import Footer from "@/app/layouts/Footer";
import Header from "@/app/layouts/Header";
import React from "react";

const page = () => {
  return (
    <>
      <Header bgColor="bg-[#be7c68] bg-opacity-50" />
      <BlogMain />
      <Footer />
    </>
  );
};

export default page;
