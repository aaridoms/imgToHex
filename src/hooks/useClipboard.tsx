import { toast } from "react-hot-toast";

const useClipboard = () => {
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

  return { copyToClipboard };
};

export default useClipboard;
