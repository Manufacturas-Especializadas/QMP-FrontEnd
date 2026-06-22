import {
  ArrowLeft,
  Calendar,
  Download,
  FileSpreadsheet,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRejectionReports } from "../../hooks/useRejectionReports";
import { useState } from "react";

export const RejectionReports = () => {
  const { months, isDownloading, isLoading, downloadReport } =
    useRejectionReports();
  const [filter, setFilter] = useState("");

  const filteredMonths = months.filter((m) =>
    m.toLowerCase().includes(filter.toLowerCase()),
  );

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white rounded-full shadow-sm 
              transition-all text-gray-400 hover:text-blue-600
              hover:cursor-pointer"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
                Gestion de reportes
              </h1>
              <p className="text-slate-500 font-medium">
                Descargar el historial de rechazos mensual
              </p>
            </div>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por año o mes..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2
              focus:ring-blue-500 outline-none w-full md:w-64 transition-all shadow-sm"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-40 bg-white rounded-[2.5rem] border border-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : filteredMonths.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMonths.map((month) => (
              <div
                key={month}
                className="group bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm 
                hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden"
              >
                <div
                  className="absolute -top-4 -right-4 p-8 opacity-[0.03] group-hover:opacity-[0.07] 
                  transition-opacity rotate-12"
                >
                  <FileSpreadsheet size={120} className="text-blue-900" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="p-4 bg-blue-50 text-blue-600 rounded-[1.25rem] group-hover:scale-110 
                      transition-transform duration-500"
                    >
                      <Calendar size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-xl leading-none uppercase tracking-tight">
                        {month.split(" ")[0]}
                      </h3>
                      <p className="text-blue-600 font-bold text-sm tracking-[0.2em] mt-1">
                        {month.split(" ")[1]}
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={isDownloading === month}
                    onClick={() => downloadReport(month)}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-[1.25rem] 
                        font-black text-[10px] uppercase tracking-[0.15em] transition-all active:scale-95 
                        shadow-lg shadow-emerald-100 hover:cursor-pointer 
                      ${
                        isDownloading === month
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-[#009640] text-white hover:bg-[#007a33] hover:-translate-y-0.5 hover:shadow-emerald-200"
                      }`}
                  >
                    {isDownloading === month ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Download size={18} />
                        Descargar Reporte
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-24 bg-white 
            rounded-[3rem] border border-dashed border-slate-200 text-center px-6"
          >
            <div
              className="w-20 h-20 bg-slate-50 rounded-full flex items-center 
              justify-center text-slate-300 mb-6"
            >
              <Search size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              Sin resultados
            </h3>
            <p className="text-slate-400 mt-2 max-w-xs">
              No encontramos periodos que coincidan con tu busqueda actual
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
