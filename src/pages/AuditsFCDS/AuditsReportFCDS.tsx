import { useEffect } from "react";
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Database,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useAuditsFcds } from "../../hooks/useAuditsFcds";
import { useNavigate } from "react-router-dom";

export const AuditsReportFCDS = () => {
  const {
    availableMonths,
    fetchAvailableMonths,
    exportAuditsToExcel,
    loading,
  } = useAuditsFcds();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableMonths();
  }, [fetchAvailableMonths]);

  const handleDownload = async (year: number, month: number) => {
    await exportAuditsToExcel(year, month);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 animate-in fade-in duration-300">
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 
        bg-white p-6 rounded-4xl border border-slate-100 shadow-sm"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase 
              px-2.5 py-0.5 rounded-md flex items-center gap-1"
            >
              <FileSpreadsheet size={12} /> Reportes Ejecutivos
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
            Historial de Auditorías FCDS
          </h1>
          <p className="text-xs font-semibold text-slate-400">
            Descarga los consolidados mensuales optimizados para análisis de
            calidad
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-4xl border border-slate-100 h-40 animate-pulse 
                flex flex-col justify-between"
            >
              <div className="w-2/3 h-5 bg-slate-100 rounded-md" />
              <div className="w-1/2 h-4 bg-slate-50 rounded-md" />
              <div className="w-full h-10 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      ) : availableMonths.length === 0 ? (
        <div
          className="bg-white rounded-[2.5rem] border border-slate-100 p-12 text-center 
          shadow-sm max-w-md mx-auto space-y-4"
        >
          <div
            className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center 
            justify-center mx-auto border border-slate-100"
          >
            <Database size={28} />
          </div>
          <div className="space-y-1">
            <h3 className="font-black text-slate-700 uppercase text-sm">
              Sin historial disponible
            </h3>
            <p className="text-xs font-medium text-slate-400">
              No se han encontrado registros de auditorías guardados en la base
              de datos para generar cierres mensuales.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableMonths.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-4xl border border-slate-100 
              hover:border-blue-200 p-5 shadow-sm hover:shadow-md transition-all duration-300 
              flex flex-col justify-between relative overflow-hidden"
            >
              <div
                className="absolute -right-4 -top-4 text-slate-50/60 pointer-events-none 
                group-hover:text-blue-50/40 transition-colors duration-300"
              >
                <FileSpreadsheet size={100} />
              </div>

              <div className="space-y-2 relative z-10">
                <div
                  className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] 
                  uppercase tracking-wider"
                >
                  <Calendar size={12} className="text-blue-500" /> Periodo
                  Registrado
                </div>
                <div>
                  <h3
                    className="text-lg font-black text-slate-700 group-hover:text-blue-700 
                    transition-colors uppercase"
                  >
                    {item.monthName}
                  </h3>
                  <span
                    className="text-xs font-black px-2 py-0.5 bg-slate-150 text-slate-500 
                    rounded-md"
                  >
                    Año {item.year}
                  </span>
                </div>
              </div>

              <div className="mt-6 relative z-10">
                <button
                  onClick={() => handleDownload(item.year, item.month)}
                  disabled={loading}
                  className="w-full py-3 bg-slate-50 hover:bg-blue-600 text-slate-600 
                  hover:text-white font-black text-xs uppercase tracking-wider rounded-xl border 
                  border-slate-200/60 hover:border-blue-600 flex items-center justify-center 
                  gap-2 shadow-sm transition-all duration-300 cursor-pointer disabled:opacity-50 
                  disabled:pointer-events-none"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      Descargar Reporte
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
