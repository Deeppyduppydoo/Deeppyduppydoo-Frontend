import Image from "next/image";

import { ParticlesBackground } from "@/components/Background";
import { ProcessStep } from "./components";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Particles */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <ParticlesBackground />
      </div>

      {/* Foreground Content */}
      <div className="relative flex items-center justify-center h-screen">
        <ProcessStep />
      </div>
    </div>
  );
}