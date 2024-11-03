import { dbConnect } from "../../../libs/mongoose";
import Post from "../../../models/post";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await dbConnect();
    const { id } = params;
    // Create a new post document
    const post = await Post.findById(id).populate("author");

    return NextResponse.json({
      posts: post,
    });
  } catch (error) {
    console.error("Error creating post:", error);

    return NextResponse.json(
      {
        message: "Error featching post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params }) {
  try {
    // Connect to the database
    await dbConnect();
    const { id } = params;
    // Create a new post document
    const post = await Post.findByIdAndDelete(id);

    return NextResponse.json({
      post: post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      {
        message: "Error featching post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
