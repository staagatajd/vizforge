interface TextareaProps {
  onSet: (value: string) => void;
}

export default function Textarea({ onSet }: TextareaProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="
        flex w-full min-h-[200px] p-3 rounded-2xl
        bg-white/5 backdrop-blur-md
        border border-white/10
        transition-all duration-300
        focus-within:bg-white/8 focus-within:border-white/25 focus-within:shadow-[0_0_30px_rgba(221,24,24,0.1)]
      ">
        <textarea
          placeholder="Paste your LeetCode-style problem here..."
          className="
            flex-1 bg-transparent
            text-white/90 placeholder-white/30
            font-mono text-sm leading-relaxed
            resize-none outline-none
            custom-scrollbar
          "
          onChange={(e) => onSet(e.target.value)}
        />
      </div>
    </div>
  );
}