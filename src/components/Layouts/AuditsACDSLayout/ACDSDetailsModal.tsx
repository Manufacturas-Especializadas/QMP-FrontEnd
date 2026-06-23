import {
  X,
  Calendar,
  User,
  CheckCircle2,
  AlertTriangle,
  Hash,
  Activity,
  Package,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuditsACD } from "../../../hooks/useAuditsACD";
import type { AuditACDRead } from "../../../types/types";

interface ACDSDetailsModalProps {
  isOpen: boolean;
  auditId: number | null;
  onClose: () => void;
}

export const ACDSDetailsModal = ({
  isOpen,
  auditId,
  onClose,
}: ACDSDetailsModalProps) => {
  const { fetchAuditById } = useAuditsACD();
  const [auditData, setAuditData] = useState<AuditACDRead | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && auditId) {
      setLoading(true);
      fetchAuditById(auditId).then((res) => {
        if (res) setAuditData(res);
        setLoading(false);
      });
    }
  }, [isOpen, auditId]);

  if (!isOpen) return null;

  const renderViewStatus = (val: number) => {
    if (val === 1)
      return (
        <span
          className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-100 
          text-emerald-700 rounded-md text-[9px] font-black uppercase tracking-wider"
        >
          Cumple
        </span>
      );
    if (val === 2)
      return (
        <span
          className="px-2.5 py-0.5 bg-rose-50 border border-rose-100 text-rose-700 
          rounded-md text-[9px] font-black uppercase tracking-wider"
        >
          No Cumple
        </span>
      );
    return (
      <span
        className="px-2.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-400 
        rounded-md text-[9px] font-black uppercase tracking-wider"
      >
        N/A
      </span>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
      bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl flex flex-col 
        max-h-[85vh] overflow-hidden animate-in zoom-in-95"
      >
        <div
          className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between 
          items-center shrink-0"
        >
          <div className="space-y-1">
            <span
              className="bg-blue-50 border border-blue-100 text-blue-700 text-[10px] 
              font-black uppercase px-2.5 py-0.5 rounded-md flex items-center gap-1 w-max"
            >
              <Package size={11} /> Visor Histórico Premium
            </span>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Detalles de Auditoría ACD #{auditId}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer 
            transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {loading || !auditData ? (
            <div
              className="py-24 flex flex-col items-center justify-center gap-2 
              text-slate-400 font-black text-xs uppercase tracking-widest"
            >
              <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
              Consultando Base de Datos SQL Server...
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
                    <User size={12} /> Inspector Firmante
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
                    <Activity size={12} /> Turno Laboral
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
                    <Hash size={12} /> Vinculación RDM
                  </span>
                  <p className="text-xs font-black uppercase">
                    {auditData.rejectionId ? (
                      <span
                        className="text-rose-600 font-black bg-rose-50 px-2 py-0.5 
                        rounded border border-rose-100"
                      >
                        RDM Folio #{auditData.rejectionId}
                      </span>
                    ) : (
                      <span
                        className="text-emerald-600 font-black bg-emerald-50 px-2 
                        py-0.5 rounded border border-emerald-100"
                      >
                        Producto Conforme ✓
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span
                  className="text-[10px] font-black text-slate-400 uppercase 
                  tracking-wider block"
                >
                  Líneas / Celdas Asociadas a esta Inspección
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {auditData.lineNames.map((line, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 border border-blue-100/50 text-blue-700 
                      px-3 py-1 rounded-xl text-xs font-black uppercase tracking-tight"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Contenedores Muestreados en este Reporte (
                  {auditData.findings.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {auditData.findings.map((f, i) => (
                    <div
                      key={f.id || i}
                      className={`border rounded-[2.2rem] p-5 space-y-4 shadow-sm bg-white relative overflow-hidden transition-all hover:border-slate-200 ${
                        !f.isProductConforming
                          ? "border-rose-100 bg-rose-50/5"
                          : "border-slate-100"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-0.5">
                          <span
                            className="text-[9px] font-black bg-slate-100 text-slate-500 
                            px-2 py-0.5 rounded uppercase tracking-wider"
                          >
                            No. Parte
                          </span>
                          <h4
                            className="text-base font-black text-slate-800 uppercase 
                            tracking-tight"
                          >
                            {f.partNumber}
                          </h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            Muestra:{" "}
                            <span className="text-slate-600 font-extrabold">
                              {f.sampleSize}
                            </span>{" "}
                            ({f.numberOfPieces} Pzas) • Empacador: #
                            {f.packerPayroll}
                          </p>
                        </div>

                        {f.isProductConforming ? (
                          <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md flex items-center gap-1">
                            <CheckCircle2 size={11} /> Conforme
                          </span>
                        ) : (
                          <span className="bg-rose-50 border border-rose-100 text-rose-700 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md flex items-center gap-1">
                            <AlertTriangle size={11} /> Rechazado
                          </span>
                        )}
                      </div>

                      {/* Parámetros Geométricos de Fin de Proceso */}
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100/70">
                        <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-1">
                          <span className="text-[9px] font-black text-slate-400 uppercase block tracking-wider">
                            Flujos de Ruta
                          </span>
                          <p className="text-[10px] font-bold text-slate-600 truncate">
                            📥 Start:{" "}
                            <span className="font-black text-blue-700 uppercase">
                              {f.startPointName}
                            </span>
                          </p>
                          <p className="text-[10px] font-bold text-slate-600 truncate">
                            📤 End:{" "}
                            <span className="font-black text-blue-700 uppercase">
                              {f.endPointName}
                            </span>
                          </p>
                        </div>

                        <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-1">
                          <span className="text-[9px] font-black text-slate-400 uppercase block tracking-wider">
                            Validaciones BIT
                          </span>
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                            <span>ID Match:</span>
                            <span
                              className={
                                f.containerIdMatch
                                  ? "text-emerald-600 font-black"
                                  : "text-rose-600 font-black"
                              }
                            >
                              {f.containerIdMatch ? "SÍ" : "NO"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                            <span>Completo:</span>
                            <span
                              className={
                                f.completeProcess
                                  ? "text-emerald-600 font-black"
                                  : "text-rose-600 font-black"
                              }
                            >
                              {f.completeProcess ? "SÍ" : "NO"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Checklist Matricial de las 4 Vistas Cosméticas */}
                      <div className="bg-slate-50/40 p-3 rounded-2xl border border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                        <div className="space-y-1">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight block">
                            V. Frontal
                          </span>
                          {renderViewStatus(f.frontView)}
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight block">
                            V. Lateral
                          </span>
                          {renderViewStatus(f.sideView)}
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight block">
                            V. Superior
                          </span>
                          {renderViewStatus(f.topView)}
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight block">
                            V. Isométrica
                          </span>
                          {renderViewStatus(f.isometricView)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
