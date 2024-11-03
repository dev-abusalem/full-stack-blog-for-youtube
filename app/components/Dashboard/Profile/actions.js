"use server";

import { revalidatePath } from "next/cache";

export async function updateProfile(prevState, formData) {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Get form data
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const image = formData.get("image");

  console.log(image);
  // Validate data (add more robust validation in a real application)
  if (!name || !email) {
    return { error: "Name and email are required" };
  }

  // Here you would typically update the user's information in your database
  console.log("Updating user profile:", {
    name,
    email,
    password: "********",
    image: image.name,
  });

  // Revalidate the profile page
  revalidatePath("/profile");

  return { success: "Profile updated successfully" };
}
