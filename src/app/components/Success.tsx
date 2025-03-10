"use client";

import React from "react";
import Image from "next/image";

interface SuccessProps {
  setStep: (step: number) => void;
  responseData: { filename: string; prediction: string } | null;
}

const Success: React.FC<SuccessProps> = ({ setStep, responseData }) => {
  return (
    <div className="p-8 bg-white shadow-xl rounded-lg w-full max-w-lg text-center flex flex-col gap-8">
      {/* Success Message */}
      <h2 className="text-5xl font-bold text-green-500 animate-fadeIn">Result!</h2>

      {/* Image Gallery */}
      <div className="flex flex-wrap flex-col justify-center gap-4">
        {responseData ? (
          <>
            {["Oak", "Pat", "Pookkie", "Praewa", "Tup"].map((name) => (
              <div
                key={name}
                className={`overflow-hidden rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 flex items-center gap-5 p-3 border ${responseData.prediction.toLowerCase() === name.toLowerCase() ? 'border-green-500 border-2' : 'border-transparent'}`}
              >
                <Image
                  src={`/people/${name.toLowerCase()}.jpg`}
                  width={150}
                  height={100}
                  alt={name}
                  className="rounded-md w-[150px] h-[100px] object-cover"
                />

                <p className="text-center text-sm font-medium">{name}</p>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-lg">No images available.</p>
        )}
      </div>

      
      <button
        onClick={() => setStep(0)}
        className="px-5 py-3 bg-blue-500 text-white font-medium rounded-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105 focus:ring-4 focus:ring-blue-300"
      >
        Draw Again!
      </button>

    </div>
  );
};

export default Success;
