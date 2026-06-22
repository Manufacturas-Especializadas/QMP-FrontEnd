import { useRef, useState, useEffect } from "react";
import { X, Check, RotateCcw } from "lucide-react";

interface SignaturePadProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
}

export const SignaturePad = ({
  isOpen,
  onClose,
  onSave,
}: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#1e3a8a";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getCoordinates = (e: any) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: any) => {
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.beginPath();
    ctx?.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.lineTo(x, y);
    ctx?.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "firma_supervisor.png", {
          type: "image/png",
        });
        onSave(file);
        onClose();
      }
    }, "image/png");
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 
      bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="bg-white rounded-4xl p-6 max-w-lg w-full space-y-4 
        shadow-2xl animate-in zoom-in-95"
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
            Panel de Firma Digital
          </h4>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 
            cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <canvas
          ref={canvasRef}
          width={450}
          height={200}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full border border-slate-200 rounded-xl bg-slate-50 
          cursor-crosshair shadow-inner"
        />

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={clearCanvas}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 
            rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer 
            transition-colors"
          >
            <RotateCcw size={12} /> Limpiar
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white 
              rounded-xl font-black text-xs uppercase flex items-center gap-1.5 
              shadow-md cursor-pointer transition-colors"
            >
              <Check size={14} /> Confirmar Firma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
