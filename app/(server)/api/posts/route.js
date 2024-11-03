import { dbConnect } from "../../libs/mongoose";
import Post from "../../models/post";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Create a new post document
    const posts = await Post.find();

    return NextResponse.json({
      posts: posts,
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
