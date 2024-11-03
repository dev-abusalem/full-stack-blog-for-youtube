import { dbConnect } from "../../../libs/mongoose";
import Category from "../../../models/category";
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
    const { name, status } = await request.json();
    // Create a new Category document
    const newCategory = new Category({
      name,
      status,
    });
    // Save the Category to the database
    await newCategory.save();

    return NextResponse.json({
      message: "Category created successfully",
      newCategory: newCategory,
    });
  } catch (error) {
    console.error("Error creating Category:", error);

    return NextResponse.json(
      {
        message: "Error creating Category",
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

    // Create a new Category document
    const categories = await Category.find();
    // Save the Category to the database

    return NextResponse.json({
      categories: categories,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error featching categories",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
