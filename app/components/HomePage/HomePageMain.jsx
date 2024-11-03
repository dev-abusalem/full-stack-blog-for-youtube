import React from "react";
import HomeHero from "./HomeHero";
import Featured from "./Featured";
import LatestBolgs from "./LatestBolgs";
import BestBolgs from "./BestBolgs";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import JoinMainList from "./JoinMainList";
import HomeContact from "./HomeContact";
const HomePageMain = () => {
  return (
    <>
      <Header />
      <HomeHero />
      <Featured />
      <LatestBolgs />
      <BestBolgs />
      <JoinMainList />
      <HomeContact />
      <Footer />
    </>
  );
};

export default HomePageMain;
