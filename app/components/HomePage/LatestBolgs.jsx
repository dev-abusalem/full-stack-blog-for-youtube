"use client";
import React, { useEffect, useState } from "react";
import BlogCardMain from "./BlogCard/BlogCardMain";
import Conatiner from "../../global/Conatiner";
import { PrimaryButton } from "../../global/Buttons";
import axios from "axios";
import { useSelector } from "react-redux";
const LatestBolgs = () => {
  const data = useSelector((state) => state.posts.data) || [];

  return (
    <section className="lg:py-10 py-6">
      <Conatiner>
        <div>
          <div className="flex justify-between gap-x-4 items-center">
            <h1 className="lg:text-4xl text-2xl font-bold tracking-wide">
              Latest Blogs
            </h1>
            <PrimaryButton link="/blogs">VIEW ALL</PrimaryButton>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10">
            {data &&
              data
                .slice(0, 6)
                .map((item, index) => <BlogCardMain key={index} item={item} />)}
          </div>
        </div>
      </Conatiner>
    </section>
  );
};

export default LatestBolgs;
