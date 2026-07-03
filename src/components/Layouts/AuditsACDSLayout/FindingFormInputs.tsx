import { Camera, FileText, X } from "lucide-react";
import { useRef } from "react";

interface FindingFormInputsProps {
  currentFinding: any;
  setCurrentFinding: React.Dispatch<React.SetStateAction<any>>;
  startPoints: any[];
  endPoints: any[];
}

export const FindingFormInputs = ({
  currentFinding,
  setCurrentFinding,
  startPoints,
  endPoints,
}: FindingFormInputsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Número de Parte
          </label>
          <input
            type="text"
            value={currentFinding.partNumber}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                partNumber: e.target.value,
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs 
            font-bold outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Nómina del Empacador
          </label>
          <input
            type="number"
            value={currentFinding.packerPayroll || ""}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                packerPayroll: Number(e.target.value),
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs 
            font-bold outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Tamaño Muestra / Plan
          </label>
          <input
            type="text"
            value={currentFinding.sampleSize}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                sampleSize: e.target.value,
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs 
            font-bold outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Nro Piezas
          </label>
          <input
            type="number"
            value={currentFinding.numberOfPieces || ""}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                numberOfPieces: Number(e.target.value),
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs
            font-bold outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Proceso Inicial (Start Point)
          </label>
          <select
            value={currentFinding.startPointId}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                startPointId: Number(e.target.value),
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs 
            font-bold text-slate-700 outline-none focus:border-blue-500 cursor-pointer shadow-sm"
          >
            <option value="0">-- Seleccionar --</option>
            {startPoints?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Proceso Final (End Point)
          </label>
          <select
            value={currentFinding.endPointId}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                endPointId: Number(e.target.value),
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs 
            font-bold text-slate-700 outline-none focus:border-blue-500 cursor-pointer shadow-sm"
          >
            <option value="0">-- Seleccionar --</option>
            {endPoints?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
        <div className="space-y-1">
          <label
            className="text-[10px] font-black uppercase text-slate-400 flex items-center 
            gap-1"
          >
            <FileText size={12} /> Shop Order
          </label>
          <input
            type="text"
            value={currentFinding.shopOrder || ""}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                shopOrder: e.target.value,
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs 
            font-bold outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label
            className="text-[10px] font-black uppercase text-slate-400 flex items-center 
            gap-1 justify-between"
          >
            <span className="flex items-center gap-1">
              <Camera size={12} /> Evidencia Fotográfica
            </span>
            <span className="text-[8px] bg-slate-100 text-slate-400 px-1.5 rounded-sm">
              Opcional
            </span>
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setCurrentFinding((p: any) => ({ ...p, imageFile: file }));
                }}
                className="w-full text-xs font-bold px-3 py-2 bg-white border border-slate-200 rounded-xl 
                file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-black 
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer shadow-sm"
              />
            </div>
            {currentFinding.imageFile && (
              <button
                type="button"
                onClick={() => {
                  setCurrentFinding((p: any) => ({ ...p, imageFile: null }));
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 
                transition-colors shadow-sm"
                title="Remover imagen"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
