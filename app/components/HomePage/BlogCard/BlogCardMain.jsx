import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCardMain = ({ item, imageHeight }) => {
  return (
    <div className=" col-span-1">
      <Image
        alt="blog_img"
        src={item.imagePath || "/images/placeholder.webp"}
        width={400}
        height={400}
        className={`w-full ${
          imageHeight ? imageHeight : "h-[250px]"
        } object-cover`}
      />
      <div>
        <h2 className="mt-4 font-bold text-3xl">{item.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: item.content.slice(0, 250) }} />
        <div className="mt-3">
          <Link
            href={`/blogs/${item._id}`}
            className="text-primary hover:opacity-50 duration-150 transition-all font-semibold tracking-wider text-sm"
          >
            Read More...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCardMain;
