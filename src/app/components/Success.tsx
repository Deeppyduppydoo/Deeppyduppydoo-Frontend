"use client";

import React from "react";

interface SuccessProps {
  setStep: (step: number) => void;
  responseData: { filename: string; prediction: string } | null;
}

const Success: React.FC<SuccessProps> = ({ setStep, responseData }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-md w-full min-w-2xl max-w-md text-center flex flex-col gap-10">
      <h2 className="text-5xl font-semibold text-green-500">Success!</h2>

      {responseData && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <p className="text-gray-700">
            <strong>Filename:</strong> {responseData.filename}
          </p>
          <p className="text-gray-700">
            <strong>Prediction:</strong> {responseData.prediction}
          </p>
        </div>
      )}

      <button
        onClick={() => setStep(0)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Upload Another File
      </button>
    </div>
  );
};

export default Success;
