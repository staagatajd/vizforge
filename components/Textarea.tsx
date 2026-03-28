interface TextareaProps
{
  onSet: (value: string) => void;
}


export default function Textarea({onSet}: TextareaProps) {

  return (
    <div className="w-full max-w-2xl mx-auto">
      <textarea
        placeholder="Paste your LeetCode-style problem here..."
        className="
          w-full min-h-[200px] p-5 rounded-2xl
          bg-white/5 backdrop-blur-md
          border border-white/10
          text-white/90 placeholder-white/30
          font-mono text-sm leading-relaxed
          resize-none outline-none
          transition-all duration-300
          focus:bg-white/8 focus:border-white/25 focus:shadow-[0_0_30px_rgba(221,24,24,0.1)]
        "
        onChange = {(e) => onSet(e.target.value)}
      />
    </div>
  );
}