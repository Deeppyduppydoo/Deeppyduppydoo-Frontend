"use client"

import React, { useState } from "react";
import { UploadFile, ProcessFile, Success } from "./"

const ProcessStep: React.FC = () => {
    const [step, setStep] = useState(0);

    return (
        <div>
            {step === 0 && <UploadFile setStep={setStep} />}
            {step === 1 && <ProcessFile setStep={setStep} />}
            {step === 2 && <Success setStep={setStep} />}
        </div>
    );
};

export default ProcessStep;
