import { dbConnect } from "@/app/(server)/libs/mongoose";
import Newsletter from "@/app/(server)/models/newsletter";
import { sendEmail } from "../../../utils/sendEmail";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    const { email, type, reply, id } = await request.json();
    // Create a new post document
    const isNewsletter = await Newsletter.findById(id);
    if (!isNewsletter) {
      return NextResponse.json(
        {
          message: "Newsletter not found",
        },
        { status: 404 }
      );
    }
    isNewsletter.reply = true;
    // Save the post to the database
    await isNewsletter.save();
    await sendEmail({
      from: process.env.APP_EMAIL,
      to: email,
      subject: `${type} Reply`,
      html: reply,
    });
    return NextResponse.json({
      message: "Reply send successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error sending reply",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
