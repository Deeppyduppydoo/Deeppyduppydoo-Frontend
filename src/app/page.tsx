import Image from "next/image";
import { FaGithub } from "react-icons/fa";

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

      {/* GitHub Icon Link */}
      <a
        href="https://github.com/yourusername/your-repo"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors"
      >
        <FaGithub size={50} />
        <span className="text-[50px]">GitHub</span>
      </a>


    </div>
  );
}
