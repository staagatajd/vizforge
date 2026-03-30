"use client";

import { motion, AnimatePresence } from "framer-motion";
import ArrayVisualizer from "./ArrayVisualizer";

interface VisualizationPanelProps {
  vizData: any;
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
}

//lookup table <K,V> (key,value pair) syntax ---> const name: Record<K,V> = {}
const difficultyColor: Record<string, string> = {
  Easy: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Medium: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  Hard: "text-red-400 border-red-400/30 bg-red-400/10",
};

export default function VisualizationPanel({ vizData, currentStep, onNext, onPrev }: VisualizationPanelProps) {
  const step = vizData.steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === vizData.steps.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto flex flex-col gap-4"
    >
      {/* metadata */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">{vizData.title}</h2>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${difficultyColor[vizData.difficulty]}`}>
            {vizData.difficulty}
          </span>
        </div>
        <div className="flex gap-3 text-white/40 text-xs">
          <span>{vizData.approach}</span>
          <span>·</span>
          <span>{vizData.time_complexity}</span>
          <span>·</span>
          <span>{vizData.space_complexity}</span>
        </div>
      </div>

      {/* visualizer */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 min-h-[180px] flex items-center justify-center">
        {vizData.category === "array" && (
           <ArrayVisualizer visualization={step.visualization} />
        )}
      </div>

      {/* step description + aux */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 flex flex-col gap-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-white/80 text-sm leading-relaxed"
          >
            {step.description}
          </motion.p>
        </AnimatePresence>

        {step.visualization.aux && Object.keys(step.visualization.aux).length > 0 && (
          <div className="text-white/40 text-xs font-mono mt-1">
            {JSON.stringify(step.visualization.aux)}
          </div>
        )}
      </div>

      {/* step controls */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="px-4 py-2 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          ← Prev
        </button>
        <span className="text-white/30 text-xs">
          Step {currentStep + 1} of {vizData.steps.length}
        </span>
        <button
          onClick={onNext}
          disabled={isLast}
          className="px-4 py-2 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
}