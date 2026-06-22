import { Calendar, User, Layers, Eye, Trash2, Pencil } from "lucide-react";
import type { AuditScrapList } from "../../../types/types";

interface ScrapGridProps {
  data: AuditScrapList[];
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => Promise<boolean>;
}

export const ScrapGrid = ({
  data,
  onViewDetails,
  onEdit,
  onDelete,
}: ScrapGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((audit) => (
        <div
          key={audit.id}
          className="group bg-white rounded-[2.2rem] border border-slate-100 
          hover:border-blue-200 p-5 shadow-sm hover:shadow-md transition-all 
          duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span
                className="text-[10px] font-black bg-slate-50 border 
                border-slate-100 text-slate-400 px-2.5 py-0.5 rounded-md uppercase"
              >
                ID: {audit.id}
              </span>
              <span
                className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md 
                    tracking-wider ${
                      audit.shiftName === "Día"
                        ? "bg-amber-50 text-amber-700 border border-amber-100/50"
                        : audit.shiftName === "Tarde"
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-100/50"
                          : "bg-purple-900 text-purple-100"
                    }`}
              >
                Turno {audit.shiftName}
              </span>
            </div>

            <div className="space-y-2">
              <div
                className="flex items-center gap-1.5 text-slate-400 font-semibold 
                text-[11px]"
              >
                <Calendar size={13} className="text-blue-500" />
                {new Date(audit.auditDate).toLocaleDateString()} —{" "}
                {new Date(audit.auditDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div
                className="flex items-center gap-1.5 text-slate-700 font-black 
                text-sm uppercase tracking-tight group-hover:text-blue-700 
                transition-colors"
              >
                <Layers size={14} className="text-slate-400" />
                {audit.lineNames.join(", ") || "Sin Línea"}
              </div>
            </div>

            <div
              className="pt-2 border-t border-slate-50/80 flex items-center 
              justify-between text-[11px] font-bold text-slate-500"
            >
              <div className="flex items-center gap-1">
                <User size={12} className="text-slate-400" />
                <span>
                  Insp:{" "}
                  <span className="text-slate-700 font-extrabold">
                    {audit.inspectorName}
                  </span>
                </span>
              </div>
              <div
                className="bg-blue-50/60 border border-blue-100/40 px-2 py-0.5 
                rounded-md text-blue-700 font-black text-[10px]"
              >
                {audit.findingsCount} Hallazgos
              </div>
            </div>
          </div>

          <div
            className="mt-6 pt-3 border-t border-slate-50 flex items-center 
            justify-between gap-2"
          >
            <button
              onClick={() => onViewDetails(audit.id)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-blue-600 text-white 
              font-black text-[10px] uppercase tracking-wider rounded-xl flex items-center 
              gap-1.5 transition-all cursor-pointer shadow-sm shadow-slate-100 
              hover:shadow-blue-100"
            >
              <Eye size={12} /> Ver Detalles
            </button>

            <button
              onClick={() => onEdit(audit.id)}
              className="px-3 py-2.5 bg-white border border-slate-200 text-slate-600 
                hover:text-blue-600 hover:border-blue-200 font-black text-[10px] uppercase 
                tracking-wider rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow-sm"
            >
              <Pencil size={11} /> Editar
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "¿Seguro que deseas eliminar esta auditoría de scrap de la base de datos y Azure Storage?",
                  )
                ) {
                  onDelete(audit.id);
                }
              }}
              className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50/60 
              rounded-xl transition-colors cursor-pointer"
              title="Eliminar Registro"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
