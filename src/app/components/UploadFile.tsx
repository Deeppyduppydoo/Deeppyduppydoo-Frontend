"use client";

import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

interface UploadFileProps {
  setStep: (step: number) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ setStep }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setStep(1); // Move to next step
    }
  };

  return (
    <div className="p-8 px-20 bg-white shadow-lg rounded-xl w-full max-w-lg text-center">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Upload Your File</h2>

      {/* Drop Area */}
      <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-blue-500 transition duration-300">
        <FiUploadCloud className="text-blue-500 text-5xl mb-3" />
        <p className="text-gray-600">Click to select a file</p>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Selected File */}
      {selectedFile && (
        <p className="mt-4 text-gray-700 font-medium">{selectedFile.name}</p>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className={`mt-6 px-6 py-3 font-medium text-white rounded-lg shadow-md transition duration-300 ${
          selectedFile
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!selectedFile}
      >
        Upload File
      </button>
    </div>
  );
};

export default UploadFile;
