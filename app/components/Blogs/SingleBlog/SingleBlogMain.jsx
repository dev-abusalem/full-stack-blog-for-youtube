"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { User, Clock, Eye, Linkedin, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

function SingleBlogMain({ id }) {
  const primaryColor = "#be7c68";
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        console.log({ result: res });
        setData(res.data.posts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  // Add logic for sharing the post here
  // const shareUrl = window?.location?.href;
  const shareUrl = "";

  const title = data?.title;
  const description = data?.content?.substring(0, 100);
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6  lg:px-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{data?.title}</h1>

        <div className="flex items-center space-x-4 mb-6">
          <img
            src="/images/food-blogger-hero-img.jpg?height=40&width=40"
            alt="Author"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">By Musharof Chy</p>
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              <span>{format(new Date(2024, 0, 12), "dd MMM yyyy")}</span>
              <span className="mx-2">•</span>
              <Eye className="w-4 h-4 mr-1" />
              <span>35 views</span>
            </div>
          </div>
          <Badge style={{ backgroundColor: primaryColor }}>Design</Badge>
        </div>

        <Image
          src={data?.imagePath || "/images/placeholder.webp"}
          width={400}
          height={400}
          alt="Featured image"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <div className="space-y-6">
          <div dangerouslySetInnerHTML={{ __html: data?.content }} />

          <Card
            className="bg-gray-100 p-6 border-l-4"
            style={{ borderLeftColor: primaryColor }}
          >
            <p className="italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod incididunt utabore et dolore magna aliqua. Quis lobortis
              scelerisque fermentum, The Neque ut etiam sit amet.
            </p>
          </Card>

          <p>
            consectetur adipiscing elit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat mattis vulputate
            cupidatat.
          </p>

          <div className="flex justify-between items-center mt-8">
            <div>
              <p className="text-sm text-gray-400 mb-2">Popular Tags :</p>
              <div className="flex space-x-2">
                {data?.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Share this post:</p>
              <div className="flex space-x-2">
                {/* LinkedIn Share Button */}
                <LinkedinShareButton
                  url={shareUrl}
                  title={title}
                  summary={description}
                >
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </LinkedinShareButton>

                {/* Twitter Share Button */}
                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  hashtags={["yourHashtag"]}
                >
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </TwitterShareButton>

                {/* Facebook Share Button */}
                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  hashtag="#invms"
                >
                  <Button variant="outline" size="icon">
                    <Facebook className="h-4 w-4" />
                  </Button>
                </FacebookShareButton>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
export default SingleBlogMain;
