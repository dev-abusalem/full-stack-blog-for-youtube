import { dbConnect } from "../../../../libs/mongoose";
import Caregory from "../../../../models/category";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await dbConnect();
    const { id } = params;
    // Create a new post document
    const caregory = await Caregory.findById(id);

    return NextResponse.json({
      caregory: caregory,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error featching caregory",
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
    const caregory = await Caregory.findByIdAndDelete(id);

    return NextResponse.json({
      caregory: caregory,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error featching post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
