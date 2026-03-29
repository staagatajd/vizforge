"use client";

import "./globals.css";
import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import Textarea from "@/components/Textarea";
import { useState, useEffect } from "react";
import { ThreeDot } from "react-loading-indicators";
import VisualizationPanel from "@/components/VisualizationPanel";

export default function App() {
  const [problem, setProblem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisualized, setIsVisualized] = useState<boolean>(false);
  const [vizData, setVizData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleProblem = async () => {
    if (problem.trim() === "") {
      return; //check if text area exists
    }

    setLoading(true);

    try {
      const res = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem }),
      }); //request to the server, stored inside res

      const data = await res.json(); //turn data "json string" into json ({data: " "})

      if (!res.ok) {
        console.error("API error:", data.error);
        return;
      } //if res.ok it null, error

      setVizData(data);
      setCurrentStep(0);
      setIsVisualized(true);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (problem.trim() === "") {
      setIsVisualized(false);
      setVizData(null);
      setCurrentStep(0);
    }
  }, [problem]);
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

        <button
          disabled={isVisualized}
          className="btn-visualize font-typoround items-center justify-center"
          onClick={handleProblem}
        >
          {loading ? (
            <ThreeDot color={["#f32323", "#f55454", "#f88484", "#fbb4b4"]} />
          ) : (
            <span>Visualize</span>
          )}
        </button>

        {isVisualized && vizData && (
          <VisualizationPanel
            vizData={vizData}
            currentStep={currentStep}
            onNext={() =>
              setCurrentStep((prev) =>
                Math.min(prev + 1, vizData.steps.length - 1),
              )
            }
            onPrev={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          />
        )}
      </div>
    </div>
  );
}
