import { Eraser, Check, Cloud } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";

interface SignaturePadProps {
  onSave: (file: File) => void;
  existingSignature?: string | null;
}

export const SignaturePad = ({
  onSave,
  existingSignature,
}: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showExisting, setShowExisting] = useState(!!existingSignature);

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
    if (showExisting) setShowExisting(false);

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
          toast.success("Nueva firma capturada");
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
        {showExisting && existingSignature && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50/20 
            pointer-events-none"
          >
            <img
              src={existingSignature}
              className="max-h-32 object-contain opacity-40 grayscale"
              alt="Firma actual"
            />
            <div
              className="flex items-center gap-1 mt-2 text-blue-400 font-bold text-[9px] 
              uppercase tracking-tighter"
            >
              <Cloud size={12} /> Firma actual en servidor
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="w-full h-48 touch-none cursor-crosshair relative z-10"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          <button
            type="button"
            onClick={clear}
            className="p-3 bg-white text-gray-500 rounded-2xl shadow-sm hover:text-red-500 
            border border-gray-100 transition-colors"
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
      <p className="text-[10px] text-gray-400 italic ml-1">
        {showExisting
          ? "Dibuje sobre el recuadro para actualizar la firma"
          : "Capture la firma para validar el registro"}
      </p>
    </div>
  );
};
