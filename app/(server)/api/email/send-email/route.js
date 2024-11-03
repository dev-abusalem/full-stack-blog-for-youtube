import { NextResponse } from "next/server";
import { sendEmail } from "@/app/(server)/utils/sendEmail";

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
