"use client";
import React, { useState } from "react";
import Conatiner from "../../global/Conatiner";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "@/app/utils/base-url";

const JoinMainList = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/newsletter`, {
        email: email,
      });
      toast.success(
        "Thank you for your interest in subscribing to our newsletter"
      );
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <section id="susbscribe" className="py-16 bg-primary bg-opacity-10">
      <Conatiner>
        <div className="border-4 grid md:grid-cols-2 grid-cols-1 gap-x-10 justify-between items-center border-gray-200 shadow p-10 bg-white">
          <div className=" col-span-1">
            <Image
              className="w-full lg:-mt-[20%] shadow"
              src="/images/food-blogger-subscribe-cta-img.jpg"
              alt="food-blogger-subscribe-cta-img"
              width={400}
              height={400}
            />
          </div>
          <div className=" col-span-1 mt-10 md:mt-0">
            <h1 className="lg:text-5xl text-3xl font-bold tracking-wide">
              Join Mailing List
            </h1>
            <p className="mt-3">
              Sign up and get all the latest, ad-free reviews, recipes and news
              sent to your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex justify-end items-center"
            >
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 w-full py-2 outline-none border-primary border"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary border border-primary text-white text-xs font-semibold  tracking-widest hover:bg-opacity-75 hover:border-opacity-75 duration-150 transition-all outline-none"
              >
                {loading ? "SUBMITTING..." : "SUBSCRIBE"}
              </button>
            </form>
          </div>
        </div>
      </Conatiner>
    </section>
  );
};

export default JoinMainList;
