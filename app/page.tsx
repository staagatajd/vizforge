"use client";

import "./globals.css";
import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import Textarea from "@/components/Textarea";
import { useState } from "react";

export default function App() {
  const [problem, setProblem] = useState<string>("");

  const handleProblem = async () => {
    if (problem.trim() === "") {
      return;
    }

    try {
      const res = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API error:", data.error);
        return;
      }

      console.log(data); //test;
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div
      className="w-full h-screen p-4"
      style={{
        background:
          "radial-gradient(ellipse at bottom left, #1a0a2e 0%, #0f0818 50%, #09070f 100%)",
      }}
    >
      <header>
        <Header />
      </header>

      <div className="flex items-center justify-center mt-6 flex-col gap-4">
        <Introduction />

        <Textarea onSet={setProblem} />

        <button className="btn-visualize font-typoround">Visualize</button>
      </div>
    </div>
  );
}
