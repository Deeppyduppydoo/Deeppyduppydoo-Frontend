"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface UploadFileProps {
  setStep: (step: number) => void;
  setFile: (file: File) => void;
  setSelectedModel: (model: string) => void;
}

const categories = ["O", "P", "PK", "PW", "T"];
const selectImages: string[] = [];

// Generate file paths dynamically
categories.forEach((category) => {
  for (let i = 0; i <= 9; i++) {
    if (category === "O" || category === "PK") {

      selectImages.push(`/Images/${category}${i}.jpeg`);
    } else {
      selectImages.push(`/Images/${category}${i}.jpg`);
    }
  }
});

const UploadFile: React.FC<UploadFileProps> = ({ setStep, setFile, setSelectedModel }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedModel, setSelectedModelState] = useState<string>("Vgg16");
  const [, setLocalFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"draw" | "upload" | "select">("draw"); // Mode management
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e, canvasRef.current);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e, canvasRef.current);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleUpload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const newFile = new File([blob], "drawing.png", { type: "image/png" });

      setFile(newFile);
      setSelectedModel(selectedModel);
      setLocalFile(newFile);

      // Show preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(newFile);
    }, "image/png");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setSelectedModel(selectedModel);
    setLocalFile(uploadedFile);

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(uploadedFile);
  };

  const handleSelectImage = (image: string) => {
    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        const newFile = new File([blob], image, { type: "image/png" });

        setFile(newFile);
        setSelectedModel(selectedModel);
        setLocalFile(newFile);
        setImagePreview(image);
      });
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
    <div className="p-8 px-20 bg-white shadow-2xl rounded-xl w-full max-w-3xl text-center border-2">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Upload, Draw, or Select</h2>

      {/* Mode Selection */}
      <div className="mb-4 flex justify-center gap-4">
        <button
          className={`px-4 py-2 rounded-md ${mode === "draw" ? "bg-black text-white" : "bg-gray-300 text-black"} transition`}
          onClick={() => setMode("draw")}
        >
          Draw
        </button>
        <button
          className={`px-4 py-2 rounded-md ${mode === "upload" ? "bg-black text-white" : "bg-gray-300 text-black"} transition`}
          onClick={() => setMode("upload")}
        >
          Upload
        </button>
        <button
          className={`px-4 py-2 rounded-md ${mode === "select" ? "bg-black text-white" : "bg-gray-300 text-black"} transition`}
          onClick={() => setMode("select")}
        >
          Select Image
        </button>
      </div>

      {/* Draw Mode */}
      {mode === "draw" && (
        <div className="mt-4">
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            className="border border-gray-300 rounded-lg bg-gray-50 w-full"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <div className="mt-4 flex justify-center gap-4">
            <button onClick={clearCanvas} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              Clear
            </button>
            <button onClick={handleUpload} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-green-600">
              Save Drawing
            </button>
          </div>
        </div>
      )}

      {/* Upload Mode */}
      {mode === "upload" && (
        <div className="mt-4">
          <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded-md" />
        </div>
      )}

      {/* Select Image Mode */}
      {mode === "select" && (
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          {selectImages.map((img) => (
            <Image
              key={img}
              src={img}
              width={96}
              height={96}
              alt="Selectable"
              className="w-24 h-24 rounded-lg shadow-md cursor-pointer hover:scale-105 transition"
              onClick={() => handleSelectImage(img)}
            />
          ))}
        </div>
      )}

      {/* Preview */}
      {imagePreview && (
        <div className="mt-4 border-t-2 pt-5">
          <p className="text-gray-700 font-semibold">Selected Image:</p>
          <Image src={imagePreview} alt="Preview" className="mt-2 rounded-lg shadow-md w-[300px] mx-auto" width={300} height={300}/>
        </div>
      )}

      <div className="mt-5 mb-2 flex flex-col border-t-2 pt-5">
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


      {imagePreview &&
        <button
          className={`px-4 py-2 rounded-md  bg-black text-white mt-4 font-bold w-full`}
          onClick={() => setStep(1)}
        >
          Next Step
        </button>

      }






    </div>
  );
};

export default UploadFile;
