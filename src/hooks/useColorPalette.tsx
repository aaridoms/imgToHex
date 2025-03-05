import { useState } from "react";
import tinycolor from "tinycolor2"; // Librería para manipulación de colores

const useColorPalette = () => {
  const [palette, setPalette] = useState<string[]>([]);

  const generatePalette = (hex: string) => {
    const color = tinycolor(hex);

    const newPalette = [
      color.complement().toHexString(), // Complementario
      color.triad()[1].toHexString(), // Triádico 1
      color.triad()[2].toHexString(), // Triádico 2
      color.analogous()[1].toHexString(), // Análogo 1
      color.analogous()[2].toHexString(), // Análogo 2
    ];

    setPalette(newPalette);
  };

  return { palette, generatePalette };
};

export default useColorPalette;
