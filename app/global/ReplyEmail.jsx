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
import { Button } from "@/components/ui/button";

function ReplyEmail({ children, email, type, id }) {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateAIPost = async () => {
    try {
      if (!reply) {
        return toast.error("Please enter a reply message");
      }
      setLoading(true);
      if (type === "contact") {
        const res = await axios.post("/api/contact/replyToEmail", {
          email,
          reply,
          type,
          id,
        });
      } else {
        const res = await axios.post("/api/newsletter/replyToEmail", {
          email,
          reply,
          type,
          id,
        });
      }
      toast.success("Reply send successfully");
      setReply("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Reply To <span className="text-green-700">{email}</span>{" "}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Textarea
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              placeholder={`Type your ${type} reply here.`}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button disbled={loading} onClick={handleGenerateAIPost}>
              Send Reply
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ReplyEmail;
