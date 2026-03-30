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
          content: `You are a DSA algorithm visualizer. Given any LeetCode-style problem, analyze it and return ONLY a valid JSON object — no markdown, no explanation, nothing outside the JSON.
          {
            "title": "string",
            "difficulty": "Easy | Medium | Hard",
            "category": "array | linked_list | tree | graph | string | stack | queue | heap | dp",
            "approach": "brief name of the algorithm used",
            "time_complexity": "O(...)",
            "space_complexity": "O(...)",
            "example": {
              "input": {},
              "output": {}
            },
            "steps": [
              {
                "step": 1,
                "description": "One clear sentence describing what happens in this step.",
                "visualization": {}
              }
            ]
          }

          The "visualization" object changes shape depending on category:

          If category is "array":
          "visualization": {
            "array": [2, 7, 11, 15],
            "highlights": [0, 1],
            "pointers": { "i": 0, "j": 3 },
            "aux": {}
          }

          If category is "linked_list":
          "visualization": {
            "nodes": [
              { "id": "1", "val": 1, "next": "2" },
              { "id": "2", "val": 2, "next": "3" },
              { "id": "3", "val": 3, "next": null }
            ],
            "highlights": ["1", "2"],
            "pointers": { "head": "1", "curr": "2" }
          }

          If category is "tree":
          "visualization": {
            "nodes": [
              { "id": "1", "val": 4, "left": "2", "right": "3" },
              { "id": "2", "val": 2, "left": "4", "right": "5" },
              { "id": "3", "val": 6, "left": null, "right": null }
            ],
            "highlights": ["2"],
            "pointers": { "curr": "2" }
          }

          If category is "graph":
          "visualization": {
            "nodes": [
              { "id": "0" }, { "id": "1" }, { "id": "2" }
            ],
            "edges": [
              { "from": "0", "to": "1" },
              { "from": "1", "to": "2" }
            ],
            "highlights": ["0", "1"],
            "visited": ["0"],
            "pointers": { "curr": "1" }
          }

          If category is "string":
          "visualization": {
            "string": "abcabcbb",
            "highlights": [0, 3],
            "pointers": { "left": 0, "right": 3 },
            "aux": {}
          }

          If category is "stack" or "queue":
          "visualization": {
            "structure": [3, 1, 4],
            "highlights": [2],
            "last_action": "push | pop | enqueue | dequeue",
            "aux": {}
          }

          If category is "dp":
          "visualization": {
            "table": [[0, 1, 2], [1, 1, 2]],
            "highlights": [[1, 2]],
            "pointers": { "i": 1, "j": 2 },
            "aux": {}
          }

          Rules:
          - Always pick the single most fitting category
          - "highlights" always refers to indices or IDs of elements active in this step
          - "pointers" always maps a meaningful name to a position or node ID
          - "aux" is a free object for any extra state (e.g. running sum, current window size, hash map contents)
          - "description" must be one clear sentence — what operation is happening, not just "step N"
          - Generate enough steps to trace the full algorithm on the example input
          - One meaningful operation per step — keep it granular
          - All values in "aux" must be pre-computed numbers or strings — never expressions like "9 - 7", always the result like 2`,
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
