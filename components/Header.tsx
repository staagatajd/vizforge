export default function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 gap-1">
      <div className="flex items-center gap-2 text-[36px] md:text-[50px] font-helvetica font-bold">
        <img src="/favicon.svg" alt="VizForge logo" className="w-8 h-8 md:w-12 md:h-12" />
        <span>Viz</span>
        <span className="bg-gradient-to-r from-[#dd1818] to-[#999999] bg-clip-text text-transparent">
          Forge
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-6 font-ginto text-[13px] md:text-[20px] font-medium leading-6">
        <span className="cursor-pointer hover:opacity-75">
          About the creator
        </span>
        <span className="cursor-pointer hover:opacity-75">
          About the project
        </span>
        <span className="cursor-pointer hover:opacity-75">Feedback</span>
      </div>
    </div>
  );
}
