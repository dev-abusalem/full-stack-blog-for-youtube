import { dbConnect } from "@/app/(server)/libs/mongoose";
import Newsletter from "@/app/(server)/models/newsletter";
import { sendEmail } from "../../utils/sendEmail";
import { newsletterTemplate } from "../../utils/newsletterTemplate";
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

    const { email } = await request.json();
    // Create a new post document
    const newNewsletter = new Newsletter({
      email,
    });
    // Save the post to the database
    await newNewsletter.save();
    await sendEmail({
      from: process.env.APP_EMAIL,
      to: email,
      subject: "Newsletter Form",
      html: newsletterTemplate(email),
    });
    return NextResponse.json({
      message: "Newsletter form send successfully",
      newsletter: newNewsletter,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating Newsletter form",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    // Connect to the database
    await dbConnect();
    // Create a new post document
    const newsletters = await Newsletter.find();
    console.log(newsletters);
    // Save the post to the database

    return NextResponse.json({
      newsletters: newsletters,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  try {
    // Connect to the database
    await dbConnect();
    const { id } = await request.json();
    // Create a new post document
    const newsletter = await Newsletter.findByIdAndDelete(id);

    return NextResponse.json({
      newsletter: newsletter,
    });
  } catch (error) {
    console.error("Error creating newsletter:", error);
    return NextResponse.json(
      {
        message: "Error featching newsletter",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
