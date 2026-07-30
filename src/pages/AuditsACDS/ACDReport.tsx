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
import { useMemo } from "react";
import { useAcdReports } from "../../hooks/useAcdReports.ts";

export const ACDReport = () => {
    const navigate = useNavigate();
    const { downloadReportByMonth, isDownloading } = useAcdReports();

    const now = new Date();

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
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
                    onClick={() => navigate("/auditorias-producto")}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors 
          hover:cursor-pointer text-slate-400"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                        Centro de Reportes ACD
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">
                        Descarga el historial mensual de inspección visual de producto terminado.
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
                        <FileSpreadsheet size={120} className="text-blue-600" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div
                            className="flex items-center gap-3 text-blue-600 font-black 
              uppercase text-xs tracking-widest"
                        >
                            <Calendar size={16} />
                            Mes en curso
                        </div>

                        <div>
                            <h2 className="text-4xl font-black text-slate-800">
                                {currentMonthName}
                            </h2>
                            <p className="text-slate-400 font-bold">{currentYear}</p>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={() =>
                                    downloadReportByMonth(
                                        now.getMonth() + 1,
                                        currentYear
                                    )
                                }
                                disabled={isDownloading}
                                className="w-full flex items-center justify-center gap-3 bg-blue-600 
                text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-200 
                hover:scale-[1.02] active:scale-[0.98] transition-all hover:cursor-pointer 
                uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                    className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-8 
          text-white flex flex-col justify-center space-y-4 shadow-lg"
                >
                    <h3 className="text-xl font-bold">Información del Reporte</h3>
                    <ul className="space-y-3 text-sm text-slate-300 font-medium">
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            Incluye hallazgos conformes y no conformes.
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            Detalle de vistas, PP BOM y defectos de soldadura.
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            Formato compatible con Excel (.xlsx).
                        </li>
                    </ul>
                </div>
            </div>

            <div className="pt-8">
                <h2
                    className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] 
          mb-4 ml-2 flex items-center gap-2"
                >
                    <Clock size={14} />
                    Historial Reciente
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {history.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-100 rounded-2xl p-5 flex 
              flex-col justify-between gap-4 hover:border-blue-200 hover:shadow-lg 
              hover:shadow-blue-50/50 transition-all group"
                        >
                            <div>
                                <p
                                    className="text-[10px] font-black text-slate-400 uppercase 
                  tracking-tighter"
                                >
                                    {item.year}
                                </p>
                                <h3 className="text-lg font-black text-slate-700">
                                    {item.monthName}
                                </h3>
                            </div>

                            <button
                                onClick={() =>
                                    downloadReportByMonth(item.month, item.year)
                                }
                                disabled={isDownloading}
                                className="flex items-center justify-center gap-2 text-blue-600 
                bg-blue-50 py-2 rounded-xl font-bold text-xs hover:bg-blue-600 
                hover:text-white transition-all hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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