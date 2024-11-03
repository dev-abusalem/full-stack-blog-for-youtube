"use client";
import React, { useEffect, useState } from "react";
import BestBlogCardMain from "./BestBlogCard/BestBlogCardMain";
import Conatiner from "../../global/Conatiner";
import axios from "axios";
import { useSelector } from "react-redux";

const BestBolgs = () => {
  const data = useSelector((state) => state.posts.data) || [];

  return (
    <section className="py-16 bg-primary bg-opacity-10">
      <Conatiner>
        <div>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold tracking-wide">
              Best in Class Restaurant
            </h1>
            <p className="mt-3">
              Massa urna magnis dignissim id euismod porttitor vitae etiam
              viverra nunc at adipiscing sit morbi aliquet mauris porttitor
              nisi, senectus pharetra ac porttitor orci.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10">
            {data &&
              data
                .slice()
                .reverse()
                .slice(0, 3)
                .map((item, index) => (
                  <BestBlogCardMain key={index} item={item} />
                ))}
          </div>
        </div>
      </Conatiner>
    </section>
  );
};

export default BestBolgs;
