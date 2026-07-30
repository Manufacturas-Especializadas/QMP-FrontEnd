import { CheckCircle2, Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RoleGuard } from "../../Auth/RoleGuard";
import { UserRole } from "../../../types/types";

interface ACDSHeaderProps {
  totalAudits: number;
  onNewAuditClick: () => void;
}


export const ACDSHeader = ({
  totalAudits,
  onNewAuditClick,

}: ACDSHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm 
      flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative 
      overflow-hidden"
    >
      <div className="space-y-1.5 relative z-10">
        <span
          className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-2.5 
          py-0.5 rounded-md flex items-center gap-1 w-max border border-blue-100/40"
        >
          <CheckCircle2 size={11} />
          Calidad
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight">
          Auditorías ACD
        </h1>
        <p className="text-xs font-semibold text-slate-400 max-w-md">
          Inspección visual auditorias de producto terminado.
        </p>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto relative z-10 shrink-0">
        <div
          className="bg-slate-50/80 border border-slate-100 px-5 py-3 rounded-2xl 
          text-center hidden min-w-25 sm:block"
        >
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
            Total Auditorías
          </span>
          <span className="text-xl font-black text-slate-700">
            {totalAudits}
          </span>
        </div>

        <RoleGuard allowedRoles={[UserRole.Admin, UserRole.CalidadProveedores, UserRole.AnalistaCalidad]}>
          <button onClick={() => navigate("/auditorias-producto/reportes")} className="flex items-center justify-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-2xl font-bold border border-green-100 hover:bg-green-100 transition-all cursor-pointer">
            <FileText size={20} /> Generar Excel
          </button>
        </RoleGuard>

        <button
          onClick={onNewAuditClick}
          className="w-full sm:w-auto px-5 py-4 bg-blue-600 hover:bg-blue-700 
          text-white font-black text-xs uppercase tracking-wider rounded-2xl flex 
          items-center justify-center gap-2 transition-all cursor-pointer shadow-lg 
          shadow-blue-100 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={15} strokeWidth={3} /> Nueva Auditoría ACD
        </button>
      </div>
    </div>
  );
};
