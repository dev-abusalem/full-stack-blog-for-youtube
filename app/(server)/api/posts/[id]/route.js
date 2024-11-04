import { dbConnect } from "../../../libs/mongoose";
import Post from "../../../models/post";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await dbConnect();
    const { id } = params;
    // Create a new post document
    const post = await Post.findById(id);

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
export async function PUT(request, { params }) {
  try {
    // Connect to the database
    await dbConnect();
    const { id } = params;
    // Create a new post document
    const data = await request.json();
    data.tags = data.tags ? JSON.parse(data.tags) : [];

    const post = await Post.findByIdAndUpdate(id, data, { new: true });
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
