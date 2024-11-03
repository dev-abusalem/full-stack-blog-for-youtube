import ContactMain from "@/app/components/Contact/ContactMain";
import Footer from "@/app/layouts/Footer";
import Header from "@/app/layouts/Header";
import React from "react";

const page = () => {
  return (
    <>
      <Header bgColor="bg-[#be7c68] bg-opacity-50" />
      <ContactMain />
      <Footer />
    </>
  );
};

export default page;
