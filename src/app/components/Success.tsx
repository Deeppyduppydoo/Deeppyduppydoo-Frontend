import React from "react";

interface SuccessProps {
  setStep: (step: number) => void;
}

const Success: React.FC<SuccessProps> = ({ setStep }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-md w-full max-w-md text-center">
      <h2 className="text-lg font-semibold text-green-500">Success!</h2>
      <p className="mt-2 text-gray-600">Your file has been successfully uploaded.</p>
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
