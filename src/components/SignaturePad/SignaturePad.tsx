import { Eraser, Check } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";

interface SignaturePadProps {
  onSave: (file: File) => void;
}

export const SignaturePad = ({ onSave }: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = "#1e293b";
      }
    }
  }, []);

  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    setIsSigned(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      setIsSigned(false);
    }
  };

  const handleConfirm = () => {
    const canvas = canvasRef.current;
    if (canvas && isSigned) {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "signature.png", { type: "image/png" });
          onSave(file);
          toast.success("Firma guardada");
        }
      }, "image/png");
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
        Firma de Conformidad
      </label>
      <div className="relative bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-48 touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            type="button"
            onClick={clear}
            className="p-3 bg-white text-gray-500 rounded-2xl shadow-sm hover:text-red-500 border border-gray-100 transition-colors"
          >
            <Eraser size={18} />
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`p-3 rounded-2xl shadow-md transition-all ${isSigned ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <Check size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
