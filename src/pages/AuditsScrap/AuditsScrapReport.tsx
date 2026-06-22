import { useEffect } from "react";
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Database,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useAuditsScrap } from "../../hooks/useAuditsScrap";
import { useNavigate } from "react-router-dom";

export const AuditsScrapReport = () => {
  const {
    availableMonths,
    fetchAvailableMonths,
    exportAuditsToExcel,
    loading,
  } = useAuditsScrap();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableMonths();
  }, [fetchAvailableMonths]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 animate-in fade-in duration-300">
      <div
        className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm 
        flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div className="space-y-1">
          <span
            className="bg-emerald-50 text-emerald-700 text-[10px] font-black 
            uppercase px-2.5 py-0.5 rounded-md flex items-center gap-1 w-max border 
            border-emerald-100"
          >
            <FileSpreadsheet size={12} /> Descarga de Cierres
          </span>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
            Reportes Ejecutivos de Scrap
          </h1>
          <p className="text-xs font-semibold text-slate-400">
            Descarga los consolidados planos listos para análisis en formato de
            libro de Excel (.xlsx)
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="p-2 bg-white text-slate-500 hover:text-green-600 hover:bg-green-50
        rounded-full transition-colors shadow-sm cursor-pointer"
      >
        <ArrowLeft size={24} />
      </button>

      {loading && availableMonths.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-4xl border border-slate-100 h-36 
              animate-pulse space-y-3"
            >
              <div className="w-1/2 h-4 bg-slate-100 rounded-md" />
              <div className="w-full h-10 bg-slate-50 rounded-xl" />
            </div>
          ))}
        </div>
      ) : availableMonths.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-12 text-center shadow-sm max-w-md mx-auto space-y-4">
          <div
            className="w-14 h-16 bg-slate-50 text-slate-300 rounded-full flex 
            items-center justify-center mx-auto"
          >
            <Database size={24} />
          </div>
          <p className="text-xs font-semibold text-slate-400">
            No se han encontrado registros en ningún periodo mensual todavía.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableMonths.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-4xl border border-slate-100 
              hover:border-emerald-200 p-5 shadow-sm transition-all flex flex-col 
              justify-between relative overflow-hidden group"
            >
              <div className="space-y-1 relative z-10">
                <span
                  className="text-[10px] font-black text-slate-400 uppercase 
                  tracking-wider flex items-center gap-1"
                >
                  <Calendar size={11} className="text-emerald-500" /> Cierre
                  Registrado
                </span>
                <h3
                  className="text-lg font-black text-slate-700 
                  group-hover:text-emerald-700 transition-colors uppercase"
                >
                  {item.monthName}
                </h3>
                <span
                  className="text-[10px] font-black px-2 py-0.5 bg-slate-100 
                  text-slate-500 rounded-md"
                >
                  Año {item.year}
                </span>
              </div>
              <button
                onClick={() => exportAuditsToExcel(item.year, item.month)}
                disabled={loading}
                className="w-full mt-5 py-3 bg-slate-50 hover:bg-emerald-600 
                text-slate-600 hover:text-white font-black text-xs uppercase 
                tracking-wider rounded-xl border border-slate-200 
                hover:border-emerald-600 flex items-center justify-center gap-2 
                transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Download size={13} />
                )}{" "}
                Descargar Reporte
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
