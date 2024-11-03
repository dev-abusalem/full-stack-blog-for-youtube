import { dbConnect } from "@/app/(server)/libs/mongoose";
import User from "@/app/(server)/models/user";
import { generateAuthToken } from "@/app/(server)/token/generateAuthToken";
import { NextResponse } from "next/server";
// Disable the default body parser

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    const { email, password } = await request.json();

    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      return NextResponse.json(
        {
          message: "Login failed",
          error: "User not found",
        },
        { status: 404 }
      );
    } else {
      if (isUser.password !== password) {
        return NextResponse.json(
          {
            message: "Login failed",
            error: "Password not match",
          },
          { status: 404 }
        );
      } else {
        const authToken = await generateAuthToken(isUser);
        return NextResponse.json(
          {
            message: "Login successfully",
            token: authToken,
          },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Login failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
