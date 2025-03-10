"use client";

import React from "react";
import Image from "next/image";

interface SuccessProps {
  setStep: (step: number) => void;
  responseData: { filename: string; prediction: string; percent: Record<string, number> } | null;
}

const Success: React.FC<SuccessProps> = ({ setStep, responseData }) => {
  return (
    <div className="p-8 bg-white shadow-xl rounded-lg w-full max-w-lg border-2 text-center flex flex-col gap-8 min-w-200">
      {/* Success Message */}
      <h2 className="text-5xl font-bold text-black animate-fadeIn">Result!</h2>

      {/* Image Gallery */}
      <div className="flex flex-wrap flex-col justify-center gap-4">
        {responseData ? (
          <>
            {["Oak", "Pat", "Pookkie", "Praewa", "Tup"].map((name) => (
              <div
                key={name}
                className={`overflow-hidden rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 flex justify-between items-center gap-5 p-3 border ${
                  responseData.prediction.toLowerCase() === name.toLowerCase() ? 'border-green-500 border-2' : 'border-transparent'
                }`}
              >
                <Image
                  src={`/people/${name.toLowerCase()}.jpg`}
                  width={150}
                  height={100}
                  alt={name}
                  className="rounded-md w-[150px] h-[100px] object-cover"
                />

                <div className="flex flex-col">
                  <p className="text-center text-sm font-bold">{name}</p>
                  <p className="text-gray-700 text-sm">{responseData.percent[name]?.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-lg">No images available.</p>
        )}
      </div>

      <button
        onClick={() => setStep(0)}
        className="px-5 py-3 bg-black text-white font-medium rounded-lg transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 hover:border-2"
      >
        Draw Again!
      </button>
    </div>
  );
};

export default Success;
