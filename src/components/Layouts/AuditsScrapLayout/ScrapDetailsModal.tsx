import { useEffect, useState } from "react";
import { useAuditsScrap } from "../../../hooks/useAuditsScrap";
import {
  X,
  Calendar,
  User,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Camera,
  PenTool,
  Loader2,
  SlidersHorizontal,
  Scale,
} from "lucide-react";
import type { DetailedAuditScrap } from "../../../types/types";

interface ScrapDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditId: number | null;
}

export const ScrapDetailsModal = ({
  isOpen,
  onClose,
  auditId,
}: ScrapDetailsModalProps) => {
  const { fetchAuditById } = useAuditsScrap();
  const [auditData, setAuditData] = useState<DetailedAuditScrap | null>(null);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      if (!auditId) return;
      setLocalLoading(true);
      const data = await fetchAuditById(auditId);
      if (data) {
        setAuditData(data);
      }
      setLocalLoading(false);
    };

    if (isOpen) {
      loadDetails();
    }
  }, [auditId, isOpen]);

  if (!isOpen) return null;

  const renderEvaluationBadge = (value: number) => {
    switch (value) {
      case 1:
        return (
          <span
            className="bg-emerald-50 text-emerald-700 text-[10px] 
            font-black uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 
            border border-emerald-100"
          >
            <CheckCircle2 size={12} /> Cumple
          </span>
        );
      case 2:
        return (
          <span
            className="bg-rose-50 text-rose-700 text-[10px] font-black 
            uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 border 
            border-rose-100"
          >
            <XCircle size={12} /> No Cumple
          </span>
        );
      default:
        return (
          <span
            className="bg-slate-50 text-slate-500 text-[10px] font-black 
            uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 border 
            border-slate-200"
          >
            <AlertCircle size={12} /> N/A
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
      bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl 
        flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95"
      >
        <div
          className="p-6 border-b border-slate-100 bg-slate-50/50 flex 
          justify-between items-center shrink-0"
        >
          <div className="space-y-1">
            <span
              className="bg-slate-800 text-white text-[10px] font-black 
              uppercase px-2.5 py-0.5 rounded-md flex items-center gap-1 w-max"
            >
              <FileSpreadsheet size={10} /> Resumen de Inspección
            </span>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Detalles de Auditoría #{auditId}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 
            cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {localLoading || !auditData ? (
            <div
              className="py-24 flex flex-col items-center justify-center gap-2 
              text-slate-400 font-bold text-xs"
            >
              <Loader2 className="animate-spin text-blue-600" size={28} />
              Recuperando firmas y registros desde Azure Blobs...
            </div>
          ) : (
            <>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 
                bg-slate-50/60 p-5 rounded-3xl border border-slate-100"
              >
                <div className="space-y-1">
                  <span
                    className="text-[10px] font-black text-slate-400 uppercase 
                    tracking-wider flex items-center gap-1"
                  >
                    <Calendar size={12} /> Fecha / Hora
                  </span>
                  <p className="text-xs font-bold text-slate-700">
                    {new Date(auditData.auditDate).toLocaleDateString()} —{" "}
                    {new Date(auditData.auditDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <span
                    className="text-[10px] font-black text-slate-400 uppercase 
                    tracking-wider flex items-center gap-1"
                  >
                    <User size={12} /> Auditor de Calidad
                  </span>
                  <p className="text-xs font-black text-slate-800 uppercase">
                    {auditData.inspectorName}
                  </p>
                </div>
                <div className="space-y-1">
                  <span
                    className="text-[10px] font-black text-slate-400 uppercase 
                    tracking-wider flex items-center gap-1"
                  >
                    <SlidersHorizontal size={12} /> Turno
                  </span>
                  <p className="text-xs font-bold text-slate-700 uppercase">
                    Turno {auditData.shiftName}
                  </p>
                </div>
                <div className="space-y-1">
                  <span
                    className="text-[10px] font-black text-slate-400 uppercase 
                    tracking-wider flex items-center gap-1"
                  >
                    <User size={12} className="text-blue-600" /> Nómina Líder
                  </span>
                  <p className="text-xs font-black text-slate-700 uppercase">
                    #{auditData.leaderPayroll || "—"}
                  </p>
                </div>

                <div className="space-y-1">
                  <span
                    className="text-[10px] font-black text-slate-400 uppercase 
                    tracking-wider flex items-center gap-1"
                  >
                    <Layers size={12} /> Líneas Inspeccionadas
                  </span>
                  <p
                    className="text-xs font-black text-blue-700 uppercase truncate"
                    title={auditData.lineNames.join(", ")}
                  >
                    {auditData.lineNames.join(", ") || "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3
                  className="text-xs font-black text-slate-400 uppercase tracking-wider 
                  block"
                >
                  Contenedores y Desperdicios Declarados (
                  {auditData.findings.length})
                </h3>

                <div className="space-y-4">
                  {auditData.findings.map((finding, index) => (
                    <div
                      key={finding.id}
                      className="border border-slate-150 rounded-4xl p-5 bg-white 
                      shadow-sm space-y-4 hover:border-slate-300 transition-colors"
                    >
                      <div
                        className="flex flex-col sm:flex-row justify-between items-start 
                        sm:items-center gap-2 border-b border-slate-100 pb-3"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-6 h-6 rounded-full bg-slate-800 text-white 
                            font-black text-[10px] flex items-center justify-center"
                          >
                            {index + 1}
                          </span>
                          <h4
                            className="text-sm font-black text-slate-700 uppercase 
                            tracking-tight"
                          >
                            {finding.typeScrapName}
                          </h4>
                        </div>
                        <div
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-xl 
                          font-black text-xs flex items-center gap-1"
                        >
                          <Scale size={13} />{" "}
                          {finding.estimatedWeight.toFixed(2)} KG Estimados
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div
                          className="flex justify-between items-center bg-slate-50/50 
                          p-3 rounded-xl border border-slate-100"
                        >
                          <span className="text-[11px] font-bold text-slate-600 uppercase">
                            Identificación de Material
                          </span>
                          {renderEvaluationBadge(
                            finding.materialCorrectlyIdentified,
                          )}
                        </div>
                        <div
                          className="flex justify-between items-center bg-slate-50/50 
                          p-3 rounded-xl border border-slate-100"
                        >
                          <span className="text-[11px] font-bold text-slate-600 uppercase">
                            Segregación de Contenedor
                          </span>
                          {renderEvaluationBadge(
                            finding.materialCorrectlySegregated,
                          )}
                        </div>
                      </div>

                      {finding.unreportedReason && (
                        <div
                          className="p-3.5 bg-rose-50/40 border border-rose-100 
                          rounded-xl space-y-1"
                        >
                          <span
                            className="text-[10px] font-black uppercase text-rose-700 
                            tracking-wider block"
                          >
                            Descripción:
                          </span>
                          <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                            {finding.unreportedReason}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div className="space-y-1.5 sm:col-span-2">
                          <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                            <Camera size={12} /> Fotografías de Evidencia en
                            Nube
                          </span>
                          {finding.imageEvidence ? (
                            <div className="grid grid-cols-3 gap-2">
                              {finding.imageEvidence
                                .split(",")
                                .filter(Boolean)
                                .map((url, imgIdx) => (
                                  <a
                                    key={imgIdx}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block aspect-video sm:aspect-square rounded-xl border border-slate-200 
                                    overflow-hidden relative group cursor-pointer bg-slate-50 shadow-sm"
                                  >
                                    <img
                                      src={url}
                                      alt={`Evidencia ${imgIdx + 1}`}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform 
                                      duration-300"
                                    />
                                    <div
                                      className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 
                                      transition-opacity flex items-center justify-center text-white font-black text-[9px] 
                                      uppercase tracking-wider"
                                    >
                                      Ampliar ↗
                                    </div>
                                  </a>
                                ))}
                            </div>
                          ) : (
                            <div
                              className="p-4 border border-dashed border-slate-200 rounded-xl flex items-center 
                              justify-center text-[10px] font-bold text-slate-400 bg-slate-50/30"
                            >
                              Sin evidencias fotográficas adjuntas
                            </div>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <span
                            className="text-[10px] font-black uppercase 
                            text-slate-400 flex items-center gap-1"
                          >
                            <PenTool size={12} /> Firma de Validación
                          </span>
                          {finding.supervisorSignature ? (
                            <a
                              href={finding.supervisorSignature}
                              target="_blank"
                              rel="noreferrer"
                              className="aspect-4/2 rounded-xl border border-slate-200 
                              bg-slate-50 p-2 flex items-center justify-center group 
                              cursor-pointer relative"
                            >
                              <img
                                src={finding.supervisorSignature}
                                alt="Firma Supervisor"
                                className="max-w-full max-h-full object-contain 
                                mix-blend-multiply"
                              />
                              <div
                                className="absolute inset-0 bg-slate-900/40 
                                opacity-0 group-hover:opacity-100 transition-opacity 
                                flex items-center justify-center text-white font-black 
                                text-[10px] uppercase tracking-wider gap-1 rounded-xl"
                              >
                                Ver Firma Original ↗
                              </div>
                            </a>
                          ) : (
                            <div
                              className="aspect-4/2 border border-dashed 
                              border-slate-200 rounded-xl flex items-center justify-center 
                              text-[10px] font-bold text-slate-400 bg-slate-50/30"
                            >
                              No se requirió firma de notificación
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div
          className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end 
          shrink-0"
        >
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white 
            font-black text-xs uppercase tracking-wider rounded-xl transition-all 
            cursor-pointer"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};
