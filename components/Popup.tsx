interface PopupProps {
  setShowBanner: (value: boolean) => void;
}

export default function Popup({ setShowBanner }: PopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#1a0a2e] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-white shadow-xl">
        <h2 className="text-lg font-bold mb-2">🚧 Work in Progress</h2>
        <p className="text-sm text-white/70 mb-4">
          VizForge is still being actively built. Some features may be
          incomplete or broken. Please read the{" "}
          <a
            href="https://github.com/staagatajd/vizforge/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:underline"
          >
            README
          </a>{" "}
          for more info on the project's progress. Thanks for checking it out
          early!
        </p>
        <button
          onClick={() => setShowBanner(false)}
          className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-sm font-semibold cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
