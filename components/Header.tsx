
export default function Header() {
  return (
    <div className="flex items-center justify-between px-8">
      <div className="text-[50px] font-helvetica font-bold">
        <span>Viz</span>
        <span className="bg-gradient-to-r from-[#dd1818] to-[#999999]  bg-clip-text text-transparent">
          Forge
        </span>
      </div>
      
      <div className="flex items-center gap-6 font-ginto text-[20px] font-medium leading-6">
        <span className="cursor-pointer hover:opacity-75">
            About the creator 
        </span >

        <span className="cursor-pointer hover:opacity-75">
            About the project
        </span>

        <span className="cursor-pointer hover:opacity-75">
            Feedback
        </span>
      </div>
    </div>
  );
}
