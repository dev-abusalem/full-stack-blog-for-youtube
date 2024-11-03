import { PrimaryButton } from "../../global/Buttons";
import Image from "next/image";
import React from "react";
import { FaInstagram, FaRss, FaYoutube } from "react-icons/fa";

const HomeHero = () => {
  return (
    <section>
      <div className=" grid grid-cols-5 justify-between items-center h-screen gap-10">
        <div className=" col-span-3 bg-white h-full flex justify-start items-center">
          <div className="pl-[17%] pr-[10%]">
            <div className="flex justify-start items-center gap-x-2">
              <span className="w-[70px] h-[2px] bg-primary"></span>
              <p className="text-primary">Welcome</p>
            </div>
            <div className="my-3">
              <h1 className="font-bold text-7xl">I’m Dianna Adams</h1>
              <h4 className="text-3xl font-semibold py-3">
                Food Critic / Influencer / Blogger
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
                totam excepturi temporibus saepe delectus laborum atque
                consequatur alias, voluptatum voluptas.
              </p>
              <div className="mt-8">
                <PrimaryButton link="#susbscribe">JOIN INSIDER</PrimaryButton>
              </div>
            </div>
            <div className="flex justify-start items-center mt-[10%] gap-x-10">
              <div>
                <FaYoutube className="text-primary text-4xl" />
                <h2 className="font-bold text-2xl py-2"> 1.2M+ </h2>
                <p className=" uppercase  tracking-widest font-semibold text-[12px]">
                  Subscribers
                </p>
              </div>
              <div>
                <FaInstagram className="text-primary text-4xl" />
                <h2 className="font-bold text-2xl py-2"> 1.8M+ </h2>
                <p className=" uppercase  tracking-widest font-semibold text-[12px]">
                  {" "}
                  Followers{" "}
                </p>
              </div>
              <div>
                <FaRss className="text-primary text-4xl" />
                <h2 className="font-bold text-2xl py-2"> 800K+ </h2>
                <p className=" uppercase tracking-widest font-semibold text-[12px]">
                  Readers
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-primary hidden col-span-2 h-full lg:flex justify-start items-center">
          <Image
            className="-ml-[15%] w-full"
            src="/images/food-blogger-hero-img.jpg"
            alt="hero image"
            width={500}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
