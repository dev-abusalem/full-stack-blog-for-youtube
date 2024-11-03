"use client";
import { FilePlus2, MailCheck, Send } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashboardMain = () => {
  const posts = useSelector((state) => state.posts.data) || [];
  const contacts = useSelector((state) => state.contacts.data) || [];
  const newsletters = useSelector((state) => state.newsletters.data) || [];

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-4xl font-semibold">Dashboard Overview</h2>
      </div>
      <div className="grid grid-cols-3 gap-x-5 items-start justify-start">
        <div className="col-span-1 relative shadow-md text-white bg-green-800 p-5">
          <h3>All Posts</h3>
          <h1 className=" font-bold text-5xl">{posts?.length}</h1>
          <Link
            href="/dashboard/posts/manage-posts"
            className="block py-1 px-2 text-center mt-3 bg-green-700"
          >
            See All
          </Link>
          <FilePlus2 className="w-[60px] h-[60px] text-green-600 absolute top-5 right-5" />
        </div>
        <div className="col-span-1 relative shadow-md text-white bg-rose-800 p-5">
          <h3>All Contacts</h3>
          <h1 className=" font-bold text-5xl">{contacts?.length}</h1>
          <Link
            href="#"
            className="block py-1 px-2 text-center mt-3 bg-rose-700"
          >
            See All
          </Link>
          <Send className="w-[60px] h-[60px] text-rose-600 absolute top-5 right-5" />
        </div>
        <div className="col-span-1 relative shadow-md text-white bg-blue-800 p-5">
          <h3>All Newsletters</h3>
          <h1 className=" font-bold text-5xl">{newsletters?.length}</h1>
          <Link
            href="#"
            className="block py-1 px-2 text-center mt-3 bg-blue-700"
          >
            See All
          </Link>
          <MailCheck className="w-[60px] h-[60px] text-blue-600 absolute top-5 right-5" />
        </div>
      </div>
    </section>
  );
};

export default DashboardMain;
