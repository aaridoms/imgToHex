import React from "react";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import useClipboard from "../hooks/useClipboard";
import useImageUploader from "../hooks/useImageUploader";
import useColorExtraction from "../hooks/useColorExtraction";
// import useColorPalette from "../hooks/useColorPalette";

const ColorExtractor: React.FC = () => {
  const { imgRef, handleImageUpload } = useImageUploader()
  const { colors, extractColors } = useColorExtraction(imgRef)
  const { copyToClipboard } = useClipboard()
  // const { palette, generatePalette } = useColorPalette()
  // const [ selectedColor, setSelectedColor ] = useState<string | null>(null)

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
