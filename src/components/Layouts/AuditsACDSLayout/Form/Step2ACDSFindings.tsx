import {
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  Pencil,
  X,
  Check,
  Columns,
} from "lucide-react";
import { useState } from "react";
import type { CreateAuditACDPayload } from "../../../../types/types";

interface Step2Props {
  data: CreateAuditACDPayload;
  updateFields: (fields: Partial<CreateAuditACDPayload>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSaving: boolean;
}

export const Step2ACDSFindings = ({
  data,
  updateFields,
  onBack,
  onSubmit,
  isSaving,
}: Step2Props) => {
  // const { startPoints } = useAuditStartPoints();
  // const { endPoints } = useAuditEndPoints();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [currentFinding, setCurrentFinding] = useState({
    id: 0,
    startPointId: 0,
    endPointId: 0,
    partNumber: "",
    numberOfPieces: 0,
    sampleSize: "100%",
    packerPayroll: 0,
    containerIdMatch: true as boolean | null,
    frontView: 1 as number,
    sideView: 1 as number,
    topView: 1 as number,
    isometricView: 1 as number,
    completeProcess: true as boolean | null,
    isProductConforming: true as boolean,
  });

  const handleSelectEdit = (index: number) => {
    setEditingIndex(index);
    const finding = data.findings[index];
    setCurrentFinding({ ...finding });
  };

  const handleSaveFinding = () => {
    if (
      !currentFinding.partNumber ||
      currentFinding.startPointId === 0 ||
      currentFinding.endPointId === 0 ||
      currentFinding.packerPayroll <= 0 ||
      !currentFinding.sampleSize
    ) {
      alert(
        "Por favor completa los campos obligatorios: Número de Parte, Start/End Point, Tamaño de Muestra y Nómina.",
      );
      return;
    }

    if (editingIndex !== null) {
      const updated = [...data.findings];
      updated[editingIndex] = { ...currentFinding };
      updateFields({ findings: updated });
      setEditingIndex(null);
    } else {
      updateFields({ findings: [...data.findings, { ...currentFinding }] });
    }
    resetForm();
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    resetForm();
  };

  const resetForm = () => {
    setCurrentFinding({
      id: 0,
      startPointId: 0,
      endPointId: 0,
      partNumber: "",
      numberOfPieces: 0,
      sampleSize: "100%",
      packerPayroll: 0,
      containerIdMatch: true,
      frontView: 1,
      sideView: 1,
      topView: 1,
      isometricView: 1,
      completeProcess: true,
      isProductConforming: true,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-in fade-in duration-200">
      <div
        className="lg:col-span-3 space-y-4 bg-slate-50/50 p-5 rounded-3xl border 
        border-slate-100 relative"
      >
        {editingIndex !== null && (
          <div
            className="absolute right-5 top-4 bg-amber-50 border border-amber-200 
            text-amber-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md"
          >
            Modificando Item #{editingIndex + 1}
          </div>
        )}

        <h3
          className="text-xs font-black text-slate-700 uppercase tracking-wider border-b 
          border-slate-200/60 pb-2 flex items-center gap-1.5"
        >
          <Columns size={14} className="text-blue-500" /> Parámetros del
          Producto Muestreado
        </h3>

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
                setCurrentFinding((p) => ({ ...p, partNumber: e.target.value }))
              }
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 
              text-xs font-bold outline-none focus:border-blue-500 shadow-sm"
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
                setCurrentFinding((p) => ({
                  ...p,
                  packerPayroll: Number(e.target.value),
                }))
              }
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 
              text-xs font-bold outline-none focus:border-blue-500 shadow-sm"
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
                setCurrentFinding((p) => ({ ...p, sampleSize: e.target.value }))
              }
              className="w-full bg-white border border-slate-200 rounded-xl px-3 
              py-2.5 text-xs font-bold outline-none focus:border-blue-500 shadow-sm"
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
                setCurrentFinding((p) => ({
                  ...p,
                  numberOfPieces: Number(e.target.value),
                }))
              }
              className="w-full bg-white border border-slate-200 rounded-xl px-3 
              py-2.5 text-xs font-bold outline-none focus:border-blue-500 shadow-sm"
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
                setCurrentFinding((p) => ({
                  ...p,
                  startPointId: Number(e.target.value),
                }))
              }
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 
              text-xs font-bold text-slate-700 outline-none focus:border-blue-500 
              cursor-pointer shadow-sm"
            >
              <option value="0">-- Seleccionar --</option>
              {startPoints?.map((t: any) => (
                <option key={t.id} value={t.id}>
                  {t.processName}
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
                setCurrentFinding((p) => ({
                  ...p,
                  endPointId: Number(e.target.value),
                }))
              }
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 
              text-xs font-bold text-slate-700 outline-none focus:border-blue-500 
              cursor-pointer shadow-sm"
            >
              <option value="0">-- Seleccionar --</option>
              {endPoints?.map((t: any) => (
                <option key={t.id} value={t.id}>
                  {t.processName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {[
          {
            l: "ID Contenedor versus ID Pieza coinciden",
            k: "containerIdMatch",
          },
          { l: "Flujo de Operación / Proceso Completo", k: "completeProcess" },
        ].map((t) => (
          <div
            key={t.k}
            className="flex justify-between items-center bg-white p-3 rounded-xl border 
            border-slate-150"
          >
            <span className="text-xs font-black text-slate-600 uppercase tracking-tight">
              {t.l}
            </span>
            <div className="flex gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-100">
              <button
                type="button"
                onClick={() =>
                  setCurrentFinding((p) => ({ ...p, [t.k]: true }))
                }
                className={`px-3 py-1 rounded text-[9px] uppercase font-black cursor-pointer transition-all ${currentFinding[t.k as keyof typeof currentFinding] === true ? "bg-blue-600 text-white shadow-sm" : "text-slate-400"}`}
              >
                SÍ
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentFinding((p) => ({ ...p, [t.k]: false }))
                }
                className={`px-3 py-1 rounded text-[9px] uppercase font-black cursor-pointer 
                  transition-all ${
                    currentFinding[t.k as keyof typeof currentFinding] === false
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-slate-400"
                  }`}
              >
                NO
              </button>
            </div>
          </div>
        ))}

        <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-150">
          <span className="text-[10px] font-black uppercase text-slate-400 block">
            Inspección Visual Cosmética (4 Vistas)
          </span>
          {[
            { label: "Vista Frontal", key: "frontView" },
            { label: "Vista Lateral", key: "sideView" },
            { label: "Vista Superior", key: "topView" },
            { label: "Vista Isométrica", key: "isometricView" },
          ].map((v) => (
            <div
              key={v.key}
              className="flex justify-between items-center py-1.5 border-b border-slate-50 
              last:border-0"
            >
              <span className="text-xs font-bold text-slate-600 uppercase">
                {v.label}
              </span>
              <div className="flex gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-100">
                {[
                  { v: 1, l: "Cumple" },
                  { v: 2, l: "No Cumple" },
                  { v: 3, l: "N/A" },
                ].map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() =>
                      setCurrentFinding((p) => ({ ...p, [v.key]: o.v }))
                    }
                    className={`px-2.5 py-1 rounded text-[8px] uppercase font-black transition-all 
                      cursor-pointer 
                      ${
                        currentFinding[v.key as keyof typeof currentFinding] ===
                        o.v
                          ? "bg-slate-800 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex justify-between items-center bg-slate-100 p-3 rounded-xl 
          border border-slate-200"
        >
          <span className="text-xs font-black text-slate-700 uppercase tracking-tight">
            Dictamen Final de este Contenedor
          </span>
          <div className="flex gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() =>
                setCurrentFinding((p) => ({ ...p, isProductConforming: true }))
              }
              className={`px-4 py-1.5 rounded text-[9px] uppercase font-black cursor-pointer 
                transition-all ${
                  currentFinding.isProductConforming
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400"
                }`}
            >
              Conforme
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentFinding((p) => ({ ...p, isProductConforming: false }))
              }
              className={`px-4 py-1.5 rounded text-[9px] uppercase font-black cursor-pointer 
                transition-all ${
                  !currentFinding.isProductConforming
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-slate-400"
                }`}
            >
              Rechazado
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          {editingIndex !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 bg-slate-200 hover:bg-slate-300 text-slate-600 font-black 
              text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex 
              items-center gap-1"
            >
              <X size={14} /> Cancelar
            </button>
          )}
          <button
            type="button"
            onClick={handleSaveFinding}
            className={`flex-1 py-3.5 font-black text-xs uppercase tracking-wider rounded-xl 
              border flex items-center justify-center gap-1.5 transition-all 
              cursor-pointer ${
                editingIndex !== null
                  ? "bg-amber-500 border-amber-500 text-white hover:bg-amber-600 shadow-sm"
                  : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white"
              }`}
          >
            {editingIndex !== null ? (
              <>
                <Check size={14} /> Confirmar Cambios
              </>
            ) : (
              <>
                <Plus size={14} /> Cargar Contenedor a la Lista
              </>
            )}
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-3 flex flex-col justify-between">
        <div className="space-y-2 flex-1">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider block">
            Lotes en esta Inspección ({data.findings.length})
          </h3>
          <div className="max-h-112 overflow-y-auto space-y-2 pr-1">
            {data.findings.length === 0 ? (
              <div
                className="text-center p-8 border border-slate-100 rounded-2xl text-xs 
                font-semibold text-slate-400 bg-slate-50/40"
              >
                Aún no has agregado números de parte a la lista.
              </div>
            ) : (
              data.findings.map((f: any, i: any) => {
                const isItemBeingEdited = editingIndex === i;
                return (
                  <div
                    key={i}
                    className={`border rounded-xl p-3 flex justify-between items-center shadow-sm 
                      transition-all ${
                        isItemBeingEdited
                          ? "bg-amber-50/40 border-amber-300 ring-1 ring-amber-300"
                          : "bg-white border-slate-100"
                      }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-xs font-black text-slate-700 block uppercase truncate">
                        {f.partNumber}
                      </span>
                      <div className="flex gap-2 text-[10px] text-slate-400 font-bold">
                        <span className="text-blue-600 font-extrabold">
                          {f.numberOfPieces} Pzas
                        </span>
                        <span>•</span>
                        <span
                          className={
                            f.isProductConforming
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }
                        >
                          {f.isProductConforming ? "Conforme" : "Rechazado"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSelectEdit(i)}
                        disabled={isItemBeingEdited}
                        className="p-2 text-slate-400 hover:text-blue-600 rounded-lg 
                        transition-colors cursor-pointer disabled:opacity-30"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateFields({
                            findings: data.findings.filter(
                              (_: any, idx: any) => idx !== i,
                            ),
                          })
                        }
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors 
                        cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isSaving || editingIndex !== null}
            className="w-full sm:w-auto order-2 sm:order-1 border border-slate-200 
            hover:bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider 
            px-4 py-3.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer 
            disabled:opacity-40"
          >
            <ArrowLeft size={14} /> Atrás
          </button>
          <button
            type="button"
            disabled={
              data.findings.length === 0 || isSaving || editingIndex !== null
            }
            onClick={onSubmit}
            className="w-full flex-1 order-1 sm:order-2 bg-linear-to-r from-emerald-600 
            to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black 
            text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg shadow-emerald-100 
            flex items-center justify-center gap-2 cursor-pointer disabled:from-slate-200 
            disabled:to-slate-200 disabled:text-slate-400"
          >
            <Save size={14} />{" "}
            {isSaving ? "Guardando..." : "Finalizar Auditoría"}
          </button>
        </div>
      </div>
    </div>
  );
};
