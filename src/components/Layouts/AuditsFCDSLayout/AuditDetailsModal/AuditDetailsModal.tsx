import { useEffect, useState } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { apiClient } from "../../../../api/client";
import { EvaluationControlsSection } from "./Ui/EvaluationControlsSection";
import { FinalReleaseSection } from "./Ui/FinalReleaseSection";
import { PhysicalConditionSection } from "./Ui/PhysicalConditionSection";
import { TraceabilitySection } from "./Ui/TraceabilitySection";

interface AuditDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditId: number | null;
}

export const AuditDetailsModal = ({
  isOpen,
  onClose,
  auditId,
}: AuditDetailsModalProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && auditId) {
      setLoading(true);
      apiClient
        .get(`/api/AuditsFcds/GetById/${auditId}`)
        .then((res) => setData(res))
        .catch(() => setData(null))
        .finally(() => setLoading(false));
    }
  }, [isOpen, auditId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
      bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl flex 
        flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95"
      >
        <div
          className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50 flex 
          justify-between items-center shrink-0"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="bg-blue-600 text-white text-[10px] font-black uppercase 
                px-2.5 py-0.5 rounded-md"
              >
                Resumen de Auditoría
              </span>
              {data &&
                (data.isProductConforming ? (
                  <span
                    className="inline-flex items-center gap-1 bg-emerald-50 
                    text-emerald-700 text-[10px] font-black uppercase px-2.5 py-0.5 
                    rounded-full"
                  >
                    <CheckCircle2 size={10} /> Conforme
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 bg-rose-50 
                    text-rose-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full"
                  >
                    <X size={10} /> No Conforme (RDM)
                  </span>
                ))}
            </div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              No. de Parte: {data?.partNumber || "---"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 rounded-full transition-colors 
            text-slate-400 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar">
          {loading ? (
            <div
              className="py-20 flex flex-col items-center justify-center gap-2 
              text-slate-400 font-bold text-sm"
            >
              <Loader2 className="animate-spin text-blue-600" size={32} />
              Estructurando datos del servidor...
            </div>
          ) : !data ? (
            <div className="text-center py-12 text-sm font-bold text-slate-400">
              No se pudo cargar la información.
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in 
              duration-300"
            >
              <TraceabilitySection data={data} />
              <EvaluationControlsSection controls={data.controls} />
              <PhysicalConditionSection physicals={data.physicals} />
              <FinalReleaseSection data={data} />
            </div>
          )}
        </div>

        <div
          className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end 
          shrink-0"
        >
          <button
            onClick={onClose}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white 
            font-black text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all 
            cursor-pointer"
          >
            Cerrar Detalles
          </button>
        </div>
      </div>
    </div>
  );
};
