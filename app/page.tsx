import "./globals.css";
import Header from "@/components/Header";

export default function App() {
  return (
    <div
      className="w-full h-screen p-4"
      style={{
        background:
          "radial-gradient(ellipse at bottom left, #1a0a2e 0%, #0f0818 50%, #09070f 100%)",
      }}
    >
      <header className="header">
        <Header/>
      </header>
    </div>
  );
}
