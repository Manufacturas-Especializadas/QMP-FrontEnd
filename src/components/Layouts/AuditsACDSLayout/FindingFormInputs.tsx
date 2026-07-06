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
  // startPoints,
  // endPoints,
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
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Nro Piezas (Lote)
          </label>
          <input
            type="number"
            value={currentFinding.numberOfPieces || ""}
            onChange={(e) => {
              const lotSize = Number(e.target.value);

              let sample = "";
              if (lotSize === 1) sample = "1";
              else if (lotSize >= 2 && lotSize <= 8) sample = "2";
              else if (lotSize >= 9 && lotSize <= 15) sample = "3";
              else if (lotSize >= 16 && lotSize <= 25) sample = "5";
              else if (lotSize >= 26 && lotSize <= 50) sample = "8";
              else if (lotSize >= 51 && lotSize <= 90) sample = "13";
              else if (lotSize >= 91 && lotSize <= 150) sample = "20";
              else if (lotSize >= 151 && lotSize <= 280) sample = "32";
              else if (lotSize >= 281 && lotSize <= 500) sample = "50";
              else if (lotSize >= 501 && lotSize <= 1200) sample = "80";
              else if (lotSize >= 1201 && lotSize <= 3200) sample = "125";
              else if (lotSize >= 3201 && lotSize <= 10000) sample = "200";
              else if (lotSize >= 10001 && lotSize <= 35000) sample = "315";
              else if (lotSize >= 35001 && lotSize <= 150000) sample = "500";
              else if (lotSize >= 150001 && lotSize <= 500000) sample = "800";
              else if (lotSize >= 500001) sample = "1250";

              setCurrentFinding((p: any) => ({
                ...p,
                numberOfPieces: lotSize,
                sampleSize: sample,
              }));
            }}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs
            font-bold outline-none focus:border-blue-500 shadow-sm"
            placeholder="Ej. 100"
          />
        </div>

        <div className="col-span-2 space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 flex items-center justify-between">
            <span>Tamaño de Muestra</span>
            <span className="text-[8px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider border border-blue-100">
              Cálculo Auto
            </span>
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
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs 
            font-black text-blue-700 outline-none focus:border-blue-500 shadow-sm transition-colors"
            placeholder="Esperando cantidad..."
          />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
      </div> */}

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
