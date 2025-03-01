"use client"
import React, { useEffect } from "react";

interface ProcessFileProps {
  setStep: (step: number) => void;
}

const ProcessFile: React.FC<ProcessFileProps> = ({ setStep }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(2); // Move to success step after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [setStep]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-md w-full max-w-md text-center">
      <h2 className="text-lg font-semibold">Processing File...</h2>
      <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 mx-auto mt-4"></div>
    </div>
  );
};

export default ProcessFile;
