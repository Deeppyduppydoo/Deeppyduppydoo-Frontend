"use client";

import React, { useRef, useState, useEffect } from "react";

interface UploadFileProps {
  setStep: (step: number) => void;
  setFile: (file: File) => void;
  setSelectedModel: (model: string) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ setStep, setFile, setSelectedModel }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedModel, setSelectedModelState] = useState<string>("Vgg16"); // Default model

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
      }
    }
  }, []);



  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e, canvas);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e, canvas);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleUpload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert the canvas drawing to a PNG file
    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], "drawing.png", { type: "image/png" });

      // ✅ Set file in state
      setFile(file);

      // ✅ Set selected model
      setSelectedModel(selectedModel);

      // ✅ Move to next step (Processing)
      setStep(1);
    }, "image/png");
  };
  
  

  const getCoordinates = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    if ("touches" in e) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      return { offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top };
    } else {
      return { offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.offsetY };
    }
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModelState(event.target.value);
  };
  


  return (
    <div className="p-8 px-20 bg-white shadow-2xl rounded-xl w-full max-w-3xl text-center border-2 ">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Draw Something</h2>

      <div className="mt-6">
        <div
          className="border border-gray-300 rounded-lg bg-gray-50 cursor-crosshair"
          style={{ width: "600px", height: "300px" }}
        >
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            className="w-full h-full justify-center"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={clearCanvas}
            className="px-4 py-2 w-full bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-5 mb-2">
        <label className="text-lg font-semibold text-gray-700">Select Model  </label>
        <select
          value={selectedModel}
          onChange={handleModelChange}
          className="mt-2 p-2 border border-gray-300 rounded-md"
        >
          <option value="Vgg16">VGG16</option>
          <option value="Resnet">ResNet50</option>
          <option value="Mbv3">MobileNetV3</option>
          {/* Add other models here */}
        </select>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-6 px-6 py-3 w-full font-medium text-white rounded-lg shadow-md transition duration-300 bg-black hover:bg-white hover:text-black hover:border"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadFile;
