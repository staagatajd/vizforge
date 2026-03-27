import "./globals.css";
import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import Textarea from "@/components/Textarea";
export default function App() {
  return (
    <div
      className="w-full h-screen p-4"
      style={{
        background:
          "radial-gradient(ellipse at bottom left, #1a0a2e 0%, #0f0818 50%, #09070f 100%)",
      }}
    >
      <header>
        <Header/>
      </header>

      <div className="flex items-center justify-center mt-6 flex-col gap-4">
        <Introduction/>

        <Textarea/>
        <button className="btn-visualize font-typoround">
          Visualize
        </button>
      </div>

    </div>
  );
}
