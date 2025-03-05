import { useRef } from "react";

const useImageUploader = () => {
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

  return { imgRef, handleImageUpload };
};

export default useImageUploader;
