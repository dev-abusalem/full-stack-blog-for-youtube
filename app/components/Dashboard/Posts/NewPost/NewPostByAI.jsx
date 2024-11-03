"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import OpenAI from "openai";
const key = process.env["OPENAI_API_KEY"];

function NewPostByAI({ children }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerateAIPost = async (e) => {
    e.preventDefault();
    if (!prompt) {
      return toast.error("Please enter a prompt");
    }
    setLoading(true);
    const response = await axios.post("/api/posts/new-post/generate-by-ai");
    setResult(response.data);
    console.log(response.data);
    setLoading(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Generate Blog By AI</AlertDialogTitle>
          <AlertDialogDescription>
            <Textarea
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="Type your blog prompt here."
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disbled={loading} onClick={handleGenerateAIPost}>
            Generate Blog
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default NewPostByAI;
