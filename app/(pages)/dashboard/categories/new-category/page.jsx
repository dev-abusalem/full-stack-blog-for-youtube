"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useState } from "react";
import { set } from "mongoose";

function Page() {
  const [form, setForm] = useState({
    name: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);

  // 2. Define a submit handler.
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/posts/category", form);
      toast.success("Category created successfully");
      if (response) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 grid grid-cols-2 justify-between items-center gap-x-6"
      >
        <div className=" col-span-1">
          <Label>Category Name</Label>
          <Input
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Type your category name"
            className="mt-2"
          />
        </div>
        <div className=" col-span-1">
          <Label>Status</Label>
          <RadioGroup
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            defaultValue="active"
            className="flex py-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inactive" id="inactive" />
              <Label htmlFor="inactive">Inactive</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Button disabled={loading} type="submit">
            {loading ? "Creating......." : "Create Category"}
          </Button>
        </div>
      </form>
    </>
  );
}
export default Page;
