import Image from "next/image";
import Link from "next/link";
import React from "react";

const BestBlogCardMain = ({ item }) => {
  return (
    <div className=" col-span-1">
      <Link href="/">
        <Image
          alt={item.title}
          src={item.imagePath || "/images/placeholder.webp"}
          width={400}
          height={400}
          className={`w-full h-[350px] object-cover`}
        />
      </Link>
      <div>
        <h2 className="mt-4 font-bold text-3xl">{item.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: item.content.slice(0, 250) }} />
      </div>
    </div>
  );
};

export default BestBlogCardMain;
