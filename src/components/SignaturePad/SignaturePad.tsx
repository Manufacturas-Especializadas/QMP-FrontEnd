import { Eraser, Check } from "lucide-react";
import { useRef, useState } from "react";

export const SignaturePad = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSigned, setIsSigned] = useState(false);

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      setIsSigned(false);
    }
  };

  return (
    <div className="space-y-2">
      <label
        className="block text-xs font-black text-gray-400 uppercase 
        tracking-widest ml-1"
      >
        Firma de Conformidad
      </label>
      <div
        className="relative bg-gray-50 rounded-3xl border border-gray-200 
        overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-48 touch-none cursor-crosshair"
          onMouseDown={() => setIsSigned(true)}
          onTouchStart={() => setIsSigned(true)}
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={clear}
            className="p-3 bg-white text-gray-500 rounded-2xl shadow-sm 
            hover:text-red-500 transition-colors border border-gray-100"
          >
            <Eraser size={18} />
          </button>
          <button
            className={`p-3 rounded-2xl shadow-md transition-all ${isSigned ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"}`}
          >
            <Check size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
