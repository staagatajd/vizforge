import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { problem } = body;

  if (!problem || typeof problem !== "string" || problem.trim() === "") {
    return NextResponse.json(
      { error: "Invalid problem input" },
      { status: 400 },
    );
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a data structure analyzer. Given a LeetCode-style problem, return ONLY a JSON object with no markdown, no explanation.`,
        },
        {
          role: "user",
          content: problem,
        },
      ],
      response_format: { type: "json_object" }, // forces JSON output
    });
    const content = completion.choices[0].message.content;
    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 },
      );
    }

    let result;
    try {
      result = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "AI returned malformed JSON" },
        { status: 500 },
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Groq error:", err); 
    return NextResponse.json(
      { error: "Failed to analyze problem" },
      { status: 500 },
    );
  }
}
