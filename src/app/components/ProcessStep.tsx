"use client";

import React, { useState } from "react";
import { UploadFile, ProcessFile, Success } from "./";

const ProcessStep: React.FC = () => {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("default"); // Store selected model
  const [responseData, setResponseData] = useState<{ filename: string; prediction: string; percent: Record<string, number> } | null>(null);

  return (
    <div>
      {step === 0 && <UploadFile setStep={setStep} setFile={setFile} setSelectedModel={setSelectedModel} />}
      {step === 1 && file && (
        <ProcessFile setStep={setStep} file={file} selectedModel={selectedModel} setResponseData={setResponseData} />
      )}
      {step === 2 && <Success setStep={setStep} responseData={responseData} />}
    </div>
  );
};

export default ProcessStep;
