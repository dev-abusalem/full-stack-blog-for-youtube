import { dbConnect } from "@/app/(server)/libs/mongoose";
import Contact from "@/app/(server)/models/contact";
import { sendEmail } from "../../utils/sendEmail";
import { contactTemplate } from "../../utils/contactTemplate";
import { NextResponse } from "next/server";
// Disable the default body parser

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    const { name, email, phone, message } = await request.json();
    // Create a new post document
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
      reply: false,
    });
    // Save the post to the database
    await newContact.save();
    await sendEmail({
      from: process.env.APP_EMAIL,
      to: email,
      subject: "Contact Form",
      html: contactTemplate(name, email, phone, message),
    });
    console.log(newContact);
    return NextResponse.json({
      message: "Contact form send successfully",
      contact: newContact,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating contact form",
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
    const contacts = await Contact.find();
    // Save the post to the database

    return NextResponse.json({
      contacts: contacts,
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
