
export default function Header() {
  return (
    <div className="flex items-center justify-between px-8">
      <div className="text-[50px] font-bold">
        <span>Viz</span>
        <span className="bg-gradient-to-r from-[#dd1818] to-[#999999]  bg-clip-text text-transparent">
          Forge
        </span>
      </div>
      
      <div className="flex items-center gap-8">
        <span>
            About the creator 
        </span>

        <span>
            About the project
        </span>

        <span>
            Feedback
        </span>
      </div>
    </div>
  );
}
