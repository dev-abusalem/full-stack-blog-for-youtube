"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import axios from "axios";

function BlogMain() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/posts");
        setBlogPosts(res.data.posts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  console.log(blogPosts);
  return (
    <div className="min-h-screen bg-white text-gray-900 py-24">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog Grid</h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius
            eros eget sapien consectetur ultrices. Ut quis dapibus libero.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <Link href={`/blogs/${post._id}`} key={post._id}>
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <img
                    src={post.imagePath || "/images/placeholder.webp"}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                </CardContent>
                <CardFooter className="bg-gray-100 p-6 flex items-center">
                  <img
                    src={post?.author?.avatar || "/images/placeholder.webp"}
                    alt={post?.author?.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{post?.author?.name}</p>
                    <p className="text-sm text-gray-600">
                      {post?.author && post?.author?.role} -{" "}
                      {post?.date && format(post?.date, "yyyy")}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => paginate(i + 1)}
              className="mx-1"
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default BlogMain;
