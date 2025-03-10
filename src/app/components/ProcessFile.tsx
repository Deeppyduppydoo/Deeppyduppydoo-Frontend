"use client";
import React, { useEffect } from "react";

interface ProcessFileProps {
  setStep: (step: number) => void;
  file: File;
  selectedModel: string; // Added selectedModel prop
  setResponseData: (data: { filename: string; prediction: string ,percent: Record<string, number>  }) => void;
}


const ProcessFile: React.FC<ProcessFileProps> = ({ setStep, file, setResponseData, selectedModel }) => {
  useEffect(() => {
    const uploadFileToBackend = async () => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`https://deeppyduppydoo-backend.micromew.com/predict-${selectedModel}`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("File uploaded successfully!", data);
          setResponseData(data); // Store response
          setStep(2); // Move to Success step
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    uploadFileToBackend();
  }, [file, setStep, setResponseData , selectedModel]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-md w-full max-w-md text-center">
      <h2 className="text-lg font-semibold">Processing File...</h2>
      <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 mx-auto mt-4"></div>
    </div>
  );
};

export default ProcessFile;
