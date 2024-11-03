import { dbConnect } from "../../../libs/mongoose";
import Post from "../../../models/post";
import { NextResponse } from "next/server";

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    const { title, content, category, tags, image } = await request.json();
    const allTags = tags ? JSON.parse(tags) : [];
    // Create a new post document
    const newPost = new Post({
      title: title,
      content: content,
      category: category,
      tags: allTags,
      imagePath: image || "",
    });
    // Save the post to the database
    await newPost.save();

    return NextResponse.json({
      message: "Post created successfully",
      postId: newPost._id,
    });
  } catch (error) {
    console.error("Error creating post:", error);

    return NextResponse.json(
      {
        message: "Error creating post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
