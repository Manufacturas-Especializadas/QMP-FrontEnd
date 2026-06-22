import { FileSpreadsheet, Plus } from "lucide-react";

interface ScrapHeaderProps {
  totalAudits: number;
  onNewAuditClick: () => void;
}

export const ScrapHeader = ({
  totalAudits,
  onNewAuditClick,
}: ScrapHeaderProps) => {
  return (
    <div
      className="flex flex-col md:flex-row justify-between items-start 
      md:items-center gap-4 bg-white p-6 sm:p-8 rounded-[2.5rem] border 
      border-slate-100 shadow-sm relative overflow-hidden group"
    >
      <div
        className="absolute right-0 top-0 w-32 h-32 bg-blue-50/40 rounded-full 
        blur-3xl group-hover:bg-blue-100/40 transition-colors duration-500"
      />

      <div className="space-y-1.5 relative z-10">
        <div className="flex items-center gap-2">
          <span
            className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase 
            px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-blue-100/40"
          >
            <FileSpreadsheet size={12} /> Aseguramiento de Calidad
          </span>
        </div>
        <h1
          className="text-2xl sm:text-3xl font-black text-slate-800 uppercase 
          tracking-tight"
        >
          Auditorías de Scrap
        </h1>
        <p className="text-xs font-semibold text-slate-400 max-w-xl">
          Monitoreo e inspección visual de desperdicios en líneas de producción.
        </p>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto relative z-10 shrink-0">
        <div
          className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-2xl 
          hidden sm:block text-right"
        >
          <span
            className="text-[10px] uppercase font-black text-slate-400 block 
            tracking-wider"
          >
            Total Evaluadas
          </span>
          <span className="text-lg font-black text-slate-700">
            {totalAudits} Periodos
          </span>
        </div>

        <button
          onClick={onNewAuditClick}
          className="w-full md:w-auto px-6 py-4 bg-linear-to-r from-blue-600 
          to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white 
          font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg 
          shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all 
          active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus size={16} strokeWidth={3} /> Nueva Auditoría de Scrap
        </button>
      </div>
    </div>
  );
};
