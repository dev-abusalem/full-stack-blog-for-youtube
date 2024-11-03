import AboutMain from "@/app/components/About/AboutMain";
import Footer from "@/app/layouts/Footer";
import Header from "@/app/layouts/Header";
import React from "react";

const page = () => {
  return (
    <>
      <Header bgColor="bg-[#be7c68] bg-opacity-50" />
      <AboutMain />
      <Footer />
    </>
  );
};

export default page;
