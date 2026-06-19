import { useEffect, useState } from "react";
import {
  X,
  Loader2,
  Calendar,
  ShieldAlert,
  Activity,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { apiClient } from "../../../../api/client";

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

  const getEvalBadge = (val: number) => {
    if (val === 1)
      return (
        <span
          className="text-[10px] uppercase font-black px-2 py-0.5 bg-emerald-50 
          text-emerald-700 rounded-md"
        >
          Cumple
        </span>
      );
    if (val === 2)
      return (
        <span
          className="text-[10px] uppercase font-black px-2 py-0.5 bg-rose-50 
          text-rose-700 rounded-md"
        >
          No Cumple
        </span>
      );
    return (
      <span
        className="text-[10px] uppercase font-black px-2 py-0.5 bg-slate-100 
        text-slate-500 rounded-md"
      >
        N/A
      </span>
    );
  };

  const getPhysicalBadge = (val: number) => {
    if (val === 1)
      return (
        <span
          className="text-[10px] uppercase font-black px-2 py-0.5 bg-amber-50 
          text-amber-700 rounded-md"
        >
          Detectado
        </span>
      );
    if (val === 2)
      return (
        <span
          className="text-[10px] uppercase font-black px-2 py-0.5 bg-emerald-50 
          text-emerald-700 rounded-md"
        >
          Limpio
        </span>
      );
    return (
      <span
        className="text-[10px] uppercase font-black px-2 py-0.5 bg-slate-100 
        text-slate-500 rounded-md"
      >
        N/A
      </span>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 
      backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl flex flex-col 
        max-h-[85vh] overflow-hidden animate-in zoom-in-95"
      >
        <div
          className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50 flex 
          justify-between items-center shrink-0"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 
                py-0.5 rounded-md"
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
                  <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
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

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-400 font-bold text-sm">
              <Loader2 className="animate-spin text-blue-600" size={32} />
              Estructurando datos del servidor...
            </div>
          ) : !data ? (
            <div className="text-center py-12 text-sm font-bold text-slate-400">
              No se pudo cargar la información.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
              <div
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 
                space-y-4"
              >
                <div
                  className="flex items-center gap-2 border-b border-slate-50 pb-2 
                  text-slate-800 font-black text-xs uppercase tracking-wider"
                >
                  <Calendar size={14} className="text-blue-500" /> Trazabilidad
                  de Planta
                </div>
                <div
                  className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-semibold 
                  text-slate-600"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Fecha Registro
                    </span>
                    {new Date(data.auditDate).toLocaleString()}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Turno
                    </span>
                    {data.shiftId === 1
                      ? "Día"
                      : data.shiftId === 2
                        ? "Tarde"
                        : "Noche"}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Líneas Auditadas
                    </span>
                    <span className="text-blue-600 font-bold">
                      {data.lineIds?.join(", ") || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Nómina Operador
                    </span>
                    {data.traceability?.operatorsPayroll} (Cat.{" "}
                    {data.traceability?.categoryId})
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Códigos de Máquina Asociados
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {data.traceability?.machineCodes?.map(
                        (code: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-slate-50 border border-slate-100 text-slate-700 
                            px-2 py-0.5 rounded font-bold text-[10px] uppercase"
                          >
                            {code}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  <div
                    className="col-span-2 bg-slate-50/50 p-2.5 rounded-xl border 
                    border-slate-100/60 grid grid-cols-2 gap-2 text-[11px]"
                  >
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block">
                        Shop Order
                      </span>
                      {data.traceability?.shopOrder || "—"}
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block">
                        Lote Tubería
                      </span>
                      {data.traceability?.batchPipe || "—"}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 
                space-y-3"
              >
                <div
                  className="flex items-center gap-2 border-b border-slate-50 pb-2 
                  text-slate-800 font-black text-xs uppercase tracking-wider"
                >
                  <Activity size={14} className="text-blue-500" /> Controles de
                  Evaluación
                </div>
                <div className="space-y-2 max-h-47.5 overflow-y-auto pr-1">
                  {[
                    {
                      l: "Validación Mtto. Autónomo",
                      v: data.controls?.mttoValidation,
                    },
                    {
                      l: "Liberación 1ra Pieza",
                      v: data.controls?.realese1stPiece,
                    },
                    { l: "SPC", v: data.controls?.spc },
                    {
                      l: "Material Identificado",
                      v: data.controls?.materialCorrectlyIdentified,
                    },
                    {
                      l: "Equipo Medición Identificado",
                      v: data.controls?.identifiedMeasuringEquipment,
                    },
                    {
                      l: "Equipo Medición Calibrado",
                      v: data.controls?.calibratedMeasuringEquipment,
                    },
                    { l: "IT del Proceso", v: data.controls?.itProcess },
                  ].map((ctrl, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-xs py-1 border-b border-slate-50 last:border-0 font-bold text-slate-600"
                    >
                      <span>{ctrl.l}</span>
                      {getEvalBadge(ctrl.v)}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-50 font-semibold text-slate-500">
                  <div>
                    Aceite:{" "}
                    <span className="text-slate-700 font-bold">
                      {data.controls?.typeOil || "—"}
                    </span>
                  </div>
                  <div>
                    Última Lib:{" "}
                    <span className="text-slate-700 font-bold">
                      {data.controls?.lastHourOfRelease || "—"}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-2xl border border-slate-100 shadow-sm 
                p-5 space-y-3"
              >
                <div
                  className="flex items-center gap-2 border-b border-slate-50 pb-2 
                  text-slate-800 font-black text-xs uppercase tracking-wider"
                >
                  <ShieldAlert size={14} className="text-blue-500" /> Defectos y
                  Condición Física
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-h-37.5 overflow-y-auto pr-1">
                  {[
                    { l: "Marcas", v: data.physicals?.brands },
                    { l: "Golpes", v: data.physicals?.blows },
                    { l: "Contaminación", v: data.physicals?.pollution },
                    { l: "Ovalamiento", v: data.physicals?.ovality },
                    { l: "Rebaba", v: data.physicals?.burr },
                    { l: "Pandeado", v: data.physicals?.warped },
                    { l: "Exceso de Aceite", v: data.physicals?.excessOil },
                  ].map((phys, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-xs py-1 border-b 
                      border-slate-50 font-bold text-slate-600"
                    >
                      <span>{phys.l}</span>
                      {getPhysicalBadge(phys.v)}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 
                space-y-3"
              >
                <div
                  className="flex items-center gap-2 border-b border-slate-50 pb-2 
                  text-slate-800 font-black text-xs uppercase tracking-wider"
                >
                  <BarChart3 size={14} className="text-blue-500" /> Liberación
                  Final de Producto
                </div>

                <div className="max-h-37.5 overflow-y-auto pr-1 text-xs">
                  {data.dimensionalSpecs && data.dimensionalSpecs.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr
                          className="text-[10px] uppercase text-slate-400 font-bold border-b 
                          border-slate-100"
                        >
                          <th className="pb-1.5">Especificación</th>
                          <th className="pb-1.5 text-center">Esp.</th>
                          <th className="pb-1.5 text-center">Real</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
                        {data.dimensionalSpecs.map((spec: any, i: number) => (
                          <tr key={i}>
                            <td className="py-2 text-slate-700">
                              {spec.specName}
                            </td>
                            <td className="py-2 text-center text-slate-400 font-medium">
                              {spec.expectedValue}
                            </td>
                            <td className="py-2 text-center text-blue-600">
                              {spec.realValue}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : data.visualChecklists &&
                    data.visualChecklists.length > 0 ? (
                    <div className="space-y-2">
                      {data.visualChecklists.map((vis: any, i: number) => (
                        <div
                          key={i}
                          className="flex justify-between items-center font-bold text-slate-600 
                          border-b border-slate-50 pb-1"
                        >
                          <span>{vis.checkpointName}</span>
                          {getEvalBadge(vis.resultValue)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-slate-400 py-6 font-semibold">
                      Sin especificaciones cargadas.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-black 
            text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all cursor-pointer"
          >
            Cerrar Detalles
          </button>
        </div>
      </div>
    </div>
  );
};
