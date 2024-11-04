"use client";
import EditPostMain from "@/app/components/Dashboard/Posts/EditPost/EditPostMain";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  return <EditPostMain id={id} />;
};

export default Page;
