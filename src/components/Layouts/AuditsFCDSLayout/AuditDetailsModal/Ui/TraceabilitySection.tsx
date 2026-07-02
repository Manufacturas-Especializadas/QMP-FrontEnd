import { Calendar } from "lucide-react";

export const TraceabilitySection = ({ data }: { data: any }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
    <div
      className="flex items-center gap-2 border-b border-slate-50 pb-2 text-slate-800
      font-black text-xs uppercase tracking-wider"
    >
      <Calendar size={14} className="text-blue-500" /> Trazabilidad de Planta
    </div>
    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-semibold text-slate-600">
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
        {data.shiftId === 1 ? "Día" : data.shiftId === 2 ? "Tarde" : "Noche"}
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
          {data.traceability?.machineCodes?.map((code: string, idx: number) => (
            <span
              key={idx}
              className="bg-slate-50 border border-slate-100 text-slate-700 px-2 
              py-0.5 rounded font-bold text-[10px] uppercase"
            >
              {code}
            </span>
          ))}
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
);
