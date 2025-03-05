import { useState } from "react";
// @ts-expect-error no tengo los tipos para colorthief
import ColorThief from "colorthief/dist/color-thief.mjs";
import useColorUtils from "./useColorUtils";

const useColorExtraction = (imgRef: React.RefObject<HTMLImageElement | null>) => {
  const [colors, setColors] = useState<string[]>([]);
  const { rgbToHex } = useColorUtils();

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

  return { colors, extractColors };
};

export default useColorExtraction;
