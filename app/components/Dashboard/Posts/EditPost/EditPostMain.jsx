"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, BotIcon, Delete, DeleteIcon, X } from "lucide-react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { removeImage } from "@/app/services/ImageRemove";
import { ImageUpage } from "@/app/services/uploadImage";
import Loadar from "@/app/global/Loadar";
import RemoveAndPreviewImage from "../NewPost/RemoveAndPreviewImage";
import { BASE_URL } from "@/app/utils/base-url";
const categories = ["Technology", "Design", "Business", "Lifestyle", "Health"];

function EditPostMain({ id }) {
  const [data, setData] = useState({});
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [uploadImages, setUploadImages] = useState("");
  const [uploadImageKey, setUploadImageKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [loading2, setLoading2] = useState(true);
  useMemo(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/posts/${id}`);
        setTags(res.data.post.tags);
        setImage(res.data.post.imagePath);
        setData({
          title: res.data.post.title,
          content: res.data.post.content,
          category: res.data.post.category,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading2(false);
      }
    };
    fetchPost();
  }, [id]);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await axios.put(`${BASE_URL}/api/posts/${id}`, {
        ...data,
        tags: JSON.stringify(tags),
        image: uploadImages,
      });
      toast.success("Post updated successfully");
      if (result) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Post updated failed");
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  async function handleDeleteImage(image) {
    try {
      const res = await removeImage(image);
      toast.success("Image deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Image delete failed");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(data);
  }

  return (
    <div className="h-full bg-gray-100">
      {loading2 ? (
        <Loadar />
      ) : (
        <Card className="">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Create New Post
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                    value={data.title}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <ReactQuill
                    theme="snow"
                    value={data.content}
                    onChange={(value) => {
                      setData({ ...data, content: value });
                    }}
                    className="mt-1 bg-white h-[300px]"
                  />
                </div>

                <div className="grid  grid-cols-1 lg:grid-cols-2 gap-x-5 ">
                  <div className="pt-10 col-span-1">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(value) =>
                        setData({ ...data, category: value })
                      }
                      value={data.category}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="lg:pt-10 pt-4 col-span-1">
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <div className="flex mt-1">
                        <Input
                          id="tags"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          className="mr-2"
                        />
                        <Button
                          className="text-white"
                          type="button"
                          onClick={addTag}
                        >
                          Add Tag
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-sm py-1 px-2"
                        >
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0 "
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-start gap-x-5 items-center mt-3">
                <div>
                  <Label htmlFor="image">Featured Image</Label>
                  <ImageUpage
                    className="uploadthing_image_custom_design mt-2"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setUploadImages(res[0].appUrl);
                      setUploadImageKey(res[0].key);
                      console.log(res);
                    }}
                    onUploadError={(error) => {
                      console.log(error.message);
                    }}
                  />
                </div>
                {uploadImages ? (
                  <RemoveAndPreviewImage
                    uploadImages={uploadImages} // Pass the uploaded image URL
                    uploadImageKey={uploadImageKey} // Pass the uploaded image key
                    handleDeleteImage={handleDeleteImage}
                  />
                ) : (
                  image && (
                    <Image
                      src={image}
                      alt="Preview"
                      className="mt-2 h-[100px] w-[100px]"
                      width={100}
                      height={100}
                    />
                  )
                )}
              </div>
              <CardFooter className="flex justify-start mt-6 px-0">
                <Button
                  disabled={loading ? true : false}
                  className="text-white"
                  type="submit"
                >
                  Update Post
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
export default EditPostMain;
