import axios from "axios";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const { prompt } = await request.json();
  const openAiPrompt = `
    Based on the following prompt: "${prompt}"
    Generate a blog post with the following structure:
    - Title
    - Content (3-4 paragraphs)
    - Category (a broad topic, e.g., "Health")
    - Tags (an array of 3-5 relevant keywords)

    Format the response in JSON with these keys: title, content, category, tags.
  `;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: openAiPrompt }],
    });
    console.log(completion);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch data from OpenAI API" },
      { status: 500 }
    );
  }
}
