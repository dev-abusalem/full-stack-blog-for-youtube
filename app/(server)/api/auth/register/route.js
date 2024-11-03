import { dbConnect } from "@/app/(server)/libs/mongoose";
import User from "@/app/(server)/models/user";
import { NextResponse } from "next/server";
// Disable the default body parser

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    const { name, email, password } = await request.json();
    // Create a new post document
    const newUser = new User({
      name,
      email,
      password,
    });
    // Save the post to the database
    await newUser.save();

    return NextResponse.json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "User registration failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
