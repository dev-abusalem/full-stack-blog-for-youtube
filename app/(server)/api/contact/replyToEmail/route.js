import { dbConnect } from "@/app/(server)/libs/mongoose";
import Contact from "@/app/(server)/models/contact";
import { sendEmail } from "../../../utils/sendEmail";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    const { email, type, reply, id } = await request.json();
    // Create a new post document
    const isContact = await Contact.findById(id);
    if (!isContact) {
      return NextResponse.json(
        {
          message: "Contact not found",
        },
        { status: 404 }
      );
    }
    isContact.reply = true;
    // Save the post to the database
    await isContact.save();
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
