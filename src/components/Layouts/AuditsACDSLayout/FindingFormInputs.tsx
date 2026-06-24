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
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Número de Parte
          </label>
          <input
            type="text"
            placeholder="Ej: P-2540-X"
            value={currentFinding.partNumber}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                partNumber: e.target.value,
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Nómina del Empacador
          </label>
          <input
            type="number"
            placeholder="Ej: 8520"
            value={currentFinding.packerPayroll || ""}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                packerPayroll: Number(e.target.value),
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-blue-500 shadow-sm"
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
            placeholder="Ej: 100%, AQL 1.0"
            value={currentFinding.sampleSize}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                sampleSize: e.target.value,
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Nro Piezas
          </label>
          <input
            type="number"
            placeholder="0"
            value={currentFinding.numberOfPieces || ""}
            onChange={(e) =>
              setCurrentFinding((p: any) => ({
                ...p,
                numberOfPieces: Number(e.target.value),
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-blue-500 shadow-sm"
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
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 cursor-pointer shadow-sm"
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
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 cursor-pointer shadow-sm"
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
    </>
  );
};
