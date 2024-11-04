"use client";

import React, { useEffect, useState } from "react";
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
import RemoveAndPreviewImage from "./RemoveAndPreviewImage";
import NewPostByAI from "./NewPostByAI";
import { BASE_URL } from "@/app/utils/base-url";

function NewPostManual({ setIsUseAi }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [uploadImages, setUploadImages] = useState("");
  const [uploadImageKey, setUploadImageKey] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/posts/category`);
        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await axios.post(`${BASE_URL}/api/posts/new-post`, {
        ...data,
        tags: JSON.stringify(tags),
        image: uploadImages,
      });
      toast.success("Post created successfully");
      if (result) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Post created failed");
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

  return (
    <div className="h-full bg-gray-100">
      <Card className="">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Create New Post
            </CardTitle>
            <NewPostByAI>
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => setIsUseAi(true)}
              >
                <Bot className="h-6 w-6" />
              </Button>
            </NewPostByAI>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  className="mt-1"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: "Content is required" }}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      className="mt-1 bg-white h-[300px]"
                    />
                  )}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div className="grid  grid-cols-1 lg:grid-cols-2 gap-x-5 ">
                <div className="pt-10 col-span-1">
                  <Label htmlFor="category">Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
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
                  }}
                  onUploadError={(error) => {
                    console.log(error.message);
                  }}
                />
              </div>
              {uploadImages && (
                <RemoveAndPreviewImage
                  uploadImages={uploadImages} // Pass the uploaded image URL
                  uploadImageKey={uploadImageKey} // Pass the uploaded image key
                  handleDeleteImage={handleDeleteImage}
                />
              )}
            </div>
            <CardFooter className="flex justify-start mt-6 px-0">
              <Button
                disabled={loading ? true : false}
                className="text-white"
                type="submit"
              >
                Publish Post
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default NewPostManual;
