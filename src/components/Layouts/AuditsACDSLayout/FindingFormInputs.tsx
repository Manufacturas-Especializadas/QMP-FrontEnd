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
            Tamaño de muestra
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
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
              <Camera size={12} /> Evidencias (Max 3)
            </span>
          </label>

          <div className="space-y-2">
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files || []);
                  const totalCount =
                    (currentFinding.imageFiles?.length || 0) + newFiles.length;

                  if (totalCount > 3) {
                    alert(
                      "Solo puedes adjuntar un máximo de 3 imágenes por hallazgo.",
                    );
                    if (fileInputRef.current) fileInputRef.current.value = "";
                    return;
                  }

                  setCurrentFinding((p: any) => ({
                    ...p,
                    imageFiles: [...(p.imageFiles || []), ...newFiles],
                  }));

                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                disabled={(currentFinding.imageFiles?.length || 0) >= 3}
                className="w-full text-xs font-bold px-3 py-2 bg-white border border-slate-200 rounded-xl 
                  file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-black 
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer shadow-sm
                  disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {currentFinding.imageFiles?.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-2">
                {currentFinding.imageFiles.map((file: File, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-blue-50/50 border 
                    border-blue-100 p-1.5 rounded-lg"
                  >
                    <span className="text-[10px] font-bold text-slate-600 truncate max-w-50">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newArray = [...currentFinding.imageFiles];
                        newArray.splice(idx, 1);
                        setCurrentFinding((p: any) => ({
                          ...p,
                          imageFiles: newArray,
                        }));
                      }}
                      className="p-1 bg-white text-rose-500 rounded-md shadow-sm border 
                      border-slate-200 hover:bg-rose-50"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
