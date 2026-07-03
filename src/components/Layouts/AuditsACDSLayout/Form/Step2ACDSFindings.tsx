import {
  Plus,
  ArrowLeft,
  Save,
  X,
  Check,
  Columns,
  AlertOctagon,
} from "lucide-react";
import { useState } from "react";
import type { CreateAuditACDPayload } from "../../../../types/types";
import { useAuditStartPoints } from "../../../../hooks/useAuditStartPoints";
import { useAuditEndPoints } from "../../../../hooks/useAuditEndPoints";
import { FindingBucketList } from "../FindingBucketList";
import { FindingChecklistMatrix } from "../FindingChecklistMatrix";
import { FindingFormInputs } from "../FindingFormInputs";

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
  const { startPoints } = useAuditStartPoints();
  const { endPoints } = useAuditEndPoints();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [currentFinding, setCurrentFinding] = useState({
    id: 0,
    startPointId: 0,
    endPointId: 0,
    partNumber: "",
    numberOfPieces: 0,
    sampleSize: "",
    packerPayroll: 0,
    containerIdMatch: true as boolean | null,
    frontView: 1,
    sideView: 1,
    topView: 1,
    isometricView: 1,
    completeProcess: true as boolean | null,
    isProductConforming: true,
  });

  const handleSelectEdit = (index: number) => {
    setEditingIndex(index);
    const finding = data.findings[index];
    setCurrentFinding({ id: (finding as any).id ?? 0, ...finding });
  };

  const handleSaveFinding = () => {
    if (
      !currentFinding.partNumber ||
      currentFinding.startPointId === 0 ||
      currentFinding.endPointId === 0 ||
      currentFinding.packerPayroll <= 0
    ) {
      alert(
        "Por favor completa los campos obligatorios antes de cargar el contenedor.",
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

  const hasRejectedItems = data.findings.some((f) => !f.isProductConforming);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-in fade-in duration-200">
      <div
        className="lg:col-span-3 space-y-4 bg-slate-50/50 p-5 rounded-3xl border 
        border-slate-100 relative"
      >
        <h3
          className="text-xs font-black text-slate-700 uppercase tracking-wider border-b 
          border-slate-200/60 pb-2 flex items-center gap-1.5"
        >
          <Columns size={14} className="text-blue-500" /> Parámetros del
          Producto Muestreado
        </h3>

        <FindingFormInputs
          currentFinding={currentFinding}
          setCurrentFinding={setCurrentFinding}
          startPoints={startPoints}
          endPoints={endPoints}
        />
        <FindingChecklistMatrix
          currentFinding={currentFinding}
          setCurrentFinding={setCurrentFinding}
        />

        <div
          className="flex justify-between items-center bg-slate-100 p-3 rounded-xl border 
          border-slate-200"
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
              onClick={() => {
                setEditingIndex(null);
                resetForm();
              }}
              className="px-4 bg-slate-200 text-slate-600 font-black text-xs uppercase 
              rounded-xl flex items-center gap-1"
            >
              <X size={14} /> Cancelar
            </button>
          )}
          <button
            type="button"
            onClick={handleSaveFinding}
            className={`flex-1 py-3.5 font-black text-xs uppercase rounded-xl border flex 
              items-center justify-center gap-1.5 cursor-pointer ${
                editingIndex !== null
                  ? "bg-amber-500 border-amber-500 text-white"
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
          <FindingBucketList
            findings={data.findings}
            editingIndex={editingIndex}
            onSelectEdit={handleSelectEdit}
            onRemove={(idx) =>
              updateFields({
                findings: data.findings.filter((_, i) => i !== idx),
              })
            }
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isSaving || editingIndex !== null}
            className="w-full sm:w-auto px-4 py-3.5 border border-slate-200 text-slate-500 
            font-bold text-xs uppercase rounded-xl disabled:opacity-40"
          >
            <ArrowLeft size={14} /> Atrás
          </button>

          <button
            type="button"
            disabled={
              data.findings.length === 0 || isSaving || editingIndex !== null
            }
            onClick={onSubmit}
            className={`w-full flex-1 order-1 sm:order-2 text-white font-black text-xs 
              uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg transition-all flex 
              items-center justify-center gap-2 cursor-pointer disabled:from-slate-200 
              disabled:to-slate-200 disabled:text-slate-400 ${
                hasRejectedItems && !data.rejectionId
                  ? "bg-linear-to-r from-amber-500 to-rose-600 shadow-rose-100"
                  : "bg-linear-to-r from-emerald-600 to-teal-600 shadow-emerald-100"
              }`}
          >
            {hasRejectedItems && !data.rejectionId ? (
              <>
                <AlertOctagon size={14} /> Registrar RDM Obligatorio
              </>
            ) : (
              <>
                <Save size={14} />{" "}
                {isSaving ? "Guardando..." : "Finalizar Auditoría"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
