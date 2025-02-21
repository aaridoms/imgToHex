import React, { useState, useRef } from "react";
// @ts-expect-error no tengo los tipos para colorthief
import ColorThief from "colorthief/dist/color-thief.mjs";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";

const ColorExtractor: React.FC = () => {
  const [colors, setColors] = useState<string[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (imgRef.current && e.target) {
          imgRef.current.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColors = () => {
    const img = imgRef.current;
    if (img && img.complete) {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 6) as [
        number,
        number,
        number
      ][];
      setColors(palette.map(rgbToHex));
    }
  };

  const rgbToHex = ([r, g, b]: [number, number, number]): string => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        toast.success(
          <span style={{ color: color, fontWeight: "bold" }}>
            Color {color} copiado al portapapeles
          </span>,
          {
            icon: "🎨",
            style: {
              borderRadius: "10px",
              background: "#c3c3c3",
            },
          }
        );
      })
      .catch((err) => {
        console.error("Error al copiar el color: ", err);
      });
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center h-screen">
      <Toaster position="top-center" />

      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-transparent border-1 border-gray-400 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-[#3a5d81] transition duration-300"
      >
        Subir imagen
      </label>

      <input
        id="file-upload"
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="mt-4">
        <img
          ref={imgRef}
          alt="Upload"
          onLoad={extractColors}
          crossOrigin="anonymous"
          style={{ maxWidth: "100%", display: "none" }}
        />
      </div>

      <div className="flex gap-2 mt-4">
        {colors.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color }}
            className="w-12 h-12 rounded-md border border-gray-400 cursor-pointer"
            onClick={() => copyToClipboard(color)}
            data-tooltip-id="color-tooltip"
            data-tooltip-content={`Haz click para copiar ${color}`}
            data-tooltip-place="bottom"
          ></div>
        ))}
      </div>

      <Tooltip
        id="color-tooltip"
        className="bg-gray-900 text-white text-sm px-2 py-1 rounded-md shadow-md"
      />
    </div>
  );
};

export default ColorExtractor;
