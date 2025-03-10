const useColorUtils = () => {
  const rgbToHex = ([r, g, b]: [number, number, number]): string => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  return { rgbToHex };
};

export default useColorUtils;
