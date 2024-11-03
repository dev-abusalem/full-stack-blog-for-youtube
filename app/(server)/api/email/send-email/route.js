// app/api/new-post/route.js

import { dbConnect } from "../../../libs/mongoose";
import Post from "../../../models/post";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import formidable from "formidable";
import path from "path";
import { sendEmail } from "@/app/(server)/utils/sendEmail";

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(request) {
  try {
    const { from, to, subject, html } = await request.json();

    const result = await sendEmail({
      from: from,
      to: to,
      subject: subject,
      html: html,
    });
    return NextResponse.json({
      message: "Email send successfully",
      email: result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Email send failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
