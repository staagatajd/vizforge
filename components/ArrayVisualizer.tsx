"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ArrayVisualizerProps {
  visualization: {
    array: number[];
    highlights: number[];
    pointers: Record<string, number>;
    aux?: any;
  };
}

export default function ArrayVisualizer({
  visualization,
}: ArrayVisualizerProps) {
  if (!visualization?.array) {
    return <p className="text-white/30 text-sm">No array data.</p>;
  }

  const { array, highlights, pointers } = visualization;

  // invert pointers map: index → pointer names
  const pointerMap: Record<number, string[]> = {};
  for (const [name, idx] of Object.entries(pointers)) {
    if (!pointerMap[idx]) pointerMap[idx] = [];
    pointerMap[idx].push(name);
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col items-center gap-4 min-w-fit px-2">
        {/* pointer labels */}
        <div className="flex gap-3">
          {array.map((_, i) => (
            <div key={i} className="w-12 flex justify-center">
              <AnimatePresence mode="wait">
                {pointerMap[i] && (
                  <motion.span
                    key={pointerMap[i].join(",")}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-violet-400 text-xs font-mono"
                  >
                    {pointerMap[i].join(",")}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* array boxes */}
        <div className="flex gap-3">
          {array.map((val, i) => {
            const isHighlighted = highlights.includes(i);
            return (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: isHighlighted
                    ? "rgba(167,139,250,0.25)"
                    : "rgba(255,255,255,0.05)",
                  borderColor: isHighlighted
                    ? "rgba(167,139,250,0.6)"
                    : "rgba(255,255,255,0.1)",
                  scale: isHighlighted ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 rounded-xl border flex items-center justify-center text-white font-mono text-sm"
              >
                {val}
              </motion.div>
            );
          })}
        </div>

        {/* index labels */}
        <div className="flex gap-3">
          {array.map((_, i) => (
            <div key={i} className="w-12 flex justify-center">
              <span className="text-white/20 text-xs font-mono">{i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
