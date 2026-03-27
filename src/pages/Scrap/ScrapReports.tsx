import {
  ArrowLeft,
  Calendar,
  FileDown,
  FileSpreadsheet,
  Loader2,
  Clock,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrapReports } from "../../hooks/useScrapReports";
import { useMemo } from "react";

export const ScrapReports = () => {
  const navigate = useNavigate();
  const { downloadReportByMonth, isDownloading } = useScrapReports();

  const now = new Date();

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const currentMonthName = months[now.getMonth()];
  const currentYear = now.getFullYear();

  const history = useMemo(() => {
    const list = [];
    for (let i = 1; i <= 3; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      list.push({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        monthName: months[date.getMonth()],
      });
    }
    return list;
  }, []);

  return (
    <div
      className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in 
      slide-in-from-bottom-4 duration-500"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/scrap")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors 
          hover:cursor-pointer text-gray-400"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            Centro de Reportes
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Descarga el historial mensual de desperdicios.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="relative overflow-hidden bg-white border border-blue-100 
          rounded-3xl p-8 shadow-sm group hover:shadow-xl hover:shadow-blue-50 
          transition-all"
        >
          <div
            className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 
            transition-opacity"
          >
            <FileSpreadsheet size={120} className="text-secondary" />
          </div>

          <div className="relative z-10 space-y-6">
            <div
              className="flex items-center gap-3 text-secondary font-black 
              uppercase text-xs tracking-widest"
            >
              <Calendar size={16} />
              Mes en curso
            </div>

            <div>
              <h2 className="text-4xl font-black text-gray-800">
                {currentMonthName}
              </h2>
              <p className="text-gray-400 font-bold">{currentYear}</p>
            </div>

            <div className="pt-4">
              <button
                onClick={() =>
                  downloadReportByMonth(
                    now.getMonth() + 1,
                    currentYear,
                    currentMonthName,
                  )
                }
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-3 bg-secondary 
                text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-200 
                hover:scale-[1.02] active:scale-[0.98] transition-all hover:cursor-pointer 
                uppercase tracking-wider disabled:opacity-50"
              >
                {isDownloading ? (
                  <Loader2 className="animate-spin" size={22} />
                ) : (
                  <FileDown size={22} />
                )}
                {isDownloading ? "Generando..." : "Descargar Excel"}
              </button>
            </div>
          </div>
        </div>

        <div
          className="bg-linear-to-br from-gray-800 to-gray-900 rounded-3xl p-8 
          text-white flex flex-col justify-center space-y-4"
        >
          <h3 className="text-xl font-bold">Información del Reporte</h3>
          <ul className="space-y-3 text-sm text-gray-300 font-medium">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Incluye registros verificados y por verificar.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Formato compatible con Excel (.xlsx).
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Actualizado en tiempo real.
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8">
        <h2
          className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] 
          mb-4 ml-2 flex items-center gap-2"
        >
          <Clock size={14} />
          Historial Reciente
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex 
              flex-col justify-between gap-4 hover:border-blue-200 hover:shadow-lg 
              hover:shadow-blue-50/50 transition-all group"
            >
              <div>
                <p
                  className="text-[10px] font-black text-gray-400 uppercase 
                  tracking-tighter"
                >
                  {item.year}
                </p>
                <h3 className="text-lg font-black text-gray-700">
                  {item.monthName}
                </h3>
              </div>

              <button
                onClick={() =>
                  downloadReportByMonth(item.month, item.year, item.monthName)
                }
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 text-secondary 
                bg-blue-50 py-2 rounded-xl font-bold text-xs hover:bg-secondary 
                hover:text-white transition-all hover:cursor-pointer disabled:opacity-30"
              >
                <Download size={14} />
                Descargar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
