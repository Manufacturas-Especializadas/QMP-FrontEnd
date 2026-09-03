import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Layers,
  Plus,
  TrendingUp,
  Calendar,
  Search,
  Edit,
  Trash2,
  User2Icon,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

import { useScrapAll } from "../../hooks/useScrapAll";
import { useLines } from "../../hooks/useLines";
import { useShifts } from "../../hooks/useShifts";
import { ScrapDetailModal } from "../../components/ScrapDetailModal/ScrapDetailModal";
import { RoleGuard } from "../../components/Auth/RoleGuard";
import { UserRole } from "../../types/types";
import { ACDSFilters } from "../../components/Layouts/AuditsACDSLayout/ACDSFilters";
import { formatDateTime } from "../../utils/dateFormatter";
import { scrapService } from "../../api/services/ScrapService";

const ITEMS_PER_PAGE = 10;

export const ScrapIndex = () => {
  const navigate = useNavigate();
  const { scrap, refresh } = useScrapAll();
  const { lines } = useLines({ isPaged: false });
  const { shifts } = useShifts();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedLine, setSelectedLine] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedScrapId, setSelectedScrapId] = useState<number | null>(null);
  const [isSingleModalOpen, setIsSingleModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedShift, selectedLine, startDate, endDate]);

  const getReportTotalWeight = (report: typeof scrap[0]) => {

    if (report.verifiedWeight !== null && report.verifiedWeight !== undefined) {
      return Number(report.verifiedWeight);
    }

    if (report.scrapDetails && report.scrapDetails.length > 0) {
      return report.scrapDetails.reduce(
        (sum, detail) => sum + (Number(detail.weight) || 0),
        0
      );
    }

    return Number((report as any).weight) || 0;
  };

  const getOriginalWeight = (report: typeof scrap[0]) => {
    if (report.scrapDetails && report.scrapDetails.length > 0) {
      return report.scrapDetails.reduce(
        (sum, detail) => sum + (Number(detail.weight) || 0),
        0
      );
    }
    return Number((report as any).weight) || 0;
  };

  const handleDeleteClick = (id: number) => {
    setRecordToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {

    if (!recordToDelete) return;

    try {
      await scrapService.deleteScrap(recordToDelete);
      refresh();
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
      alert("Ocurrió un error al intentar eliminar el reporte.");
    }
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  const filteredRecords = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();

    return scrap.filter((report) => {
      const itemLineName = report.lineName ?? "";
      const itemShiftName = report.shiftName ?? "";
      const itemPayroll = report.inspectorPayRollNumber?.toString() ?? "";

      const matchesSearch =
        !cleanSearch ||
        itemLineName.toLowerCase().includes(cleanSearch) ||
        itemPayroll.includes(cleanSearch) ||
        report.scrapDetails?.some(
          (d) =>
            d.typeScrapName?.toLowerCase().includes(cleanSearch) ||
            d.payRollNumber?.toString().includes(cleanSearch)
        );

      const matchesShift = !selectedShift || itemShiftName === selectedShift;
      const matchesLine = !selectedLine || itemLineName === selectedLine;

      let matchesDate = true;
      if (report.createdAt) {
        const reportDateStr = report.createdAt.toString().slice(0, 10);

        if (startDate && reportDateStr < startDate) matchesDate = false;
        if (endDate && reportDateStr > endDate) matchesDate = false;
      }


      return matchesSearch && matchesShift && matchesLine && matchesDate;
    });
  }, [scrap, searchTerm, selectedShift, selectedLine, startDate, endDate]);

  const { paginatedRecords, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return {
      paginatedRecords: filteredRecords.slice(start, end),
      totalPages: total === 0 ? 1 : total,
    };
  }, [filteredRecords, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openSingleDetail = (id: number) => {
    setSelectedScrapId(id);
    setIsSingleModalOpen(true);
  };



  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <TrendingUp size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Panel de Scrap</h1>
            <p className="text-sm text-gray-500 font-medium">Visualiza y gestiona los reportes consolidados.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RoleGuard allowedRoles={[UserRole.Admin, UserRole.CalidadProveedores, UserRole.AnalistaCalidad]}>
            <button onClick={() => navigate("/scrap/reportes")} className="flex items-center justify-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-2xl font-bold border border-green-100 hover:bg-green-100 transition-all cursor-pointer">
              <FileText size={20} /> Generar Excel
            </button>
          </RoleGuard>
          <RoleGuard allowedRoles={[UserRole.Admin, UserRole.CalidadProveedores, UserRole.InspectorScrap, UserRole.Produccion]}>
            <button onClick={() => navigate("/scrap/registro")} className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
              <Plus size={20} strokeWidth={3} /> Nuevo Reporte
            </button>
          </RoleGuard>
        </div>
      </div>


      <ACDSFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedShift={selectedShift}
        onShiftChange={setSelectedShift}
        shifts={shifts}
        selectedLine={selectedLine}
        onLineChange={setSelectedLine}
        lines={lines}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
      />



      <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
            Reportes de Scrap
          </h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full">
            {filteredRecords.length} Reportes
          </span>
        </div>

        {paginatedRecords.length === 0 ? (
          <div className="text-center py-10 bg-white border border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-400 font-bold">No se encontraron reportes para esta selección.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRecords.map((report) => {
              const totalWeight = getReportTotalWeight(report);
              const originalWeight = getOriginalWeight(report);
              const isAudited = report.isVerified || report.verifiedWeight !== null;
              const wasModified = report.isVerified === false && report.verifiedWeight !== null;
              const itemsCount = report.scrapDetails?.length || 0;

              return (
                <div
                  key={report.id}
                  className="group bg-white rounded-[2.2rem] border border-slate-100 
                  hover:border-blue-200 p-5 shadow-sm hover:shadow-md transition-all 
                  duration-300 flex flex-col justify-between animate-in fade-in"
                >
                  <div className="space-y-4">
                    {/* ENCABEZADO: ID y TURNO */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black bg-slate-50 border border-slate-100 text-slate-400 px-2.5 py-0.5 rounded-md uppercase">
                        ID: {report.id}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider ${report.shiftName === "Día" || report.shiftName === "1"
                          ? "bg-amber-50 text-amber-700 border border-amber-100/50"
                          : report.shiftName === "Tarde" || report.shiftName === "2"
                            ? "bg-indigo-50 text-indigo-700 border border-indigo-100/50"
                            : "bg-purple-900 text-purple-100"
                          }`}
                      >
                        Turno {report.shiftName}
                      </span>
                    </div>

                    {/* DATOS GENERALES: Línea, Fecha y Estatus */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-[11px]">
                        <Calendar size={13} className="text-blue-500" />
                        {formatDateTime(report.createdAt)}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-slate-700 font-black text-sm uppercase tracking-tight group-hover:text-blue-700 transition-colors">
                          <Layers size={14} className="text-slate-400" />
                          {report.lineName || "Sin Línea"}
                        </div>

                        {/* BADGE DE VERIFICACIÓN */}
                        {isAudited ? (
                          <span className="bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1 border border-green-200 font-bold">
                            <CheckCircle2 size={12} /> VERIFICADO
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1 border border-red-200 font-bold">
                            <AlertCircle size={12} /> NO VERIFICADO
                          </span>
                        )}
                      </div>
                    </div>

                    {/* BLOQUE DEL PESO CENTRADO (Adaptado para la tarjeta) */}
                    <div className="my-4 p-4 bg-slate-50/50 rounded-2xl flex flex-col items-center justify-center border border-slate-100">
                      <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isAudited ? "text-green-500" : "text-gray-400"
                        }`}>
                        {isAudited ? "Peso Verificado" : "Peso Registrado"}
                      </span>

                      <span className="text-3xl font-black text-slate-800">
                        {totalWeight} <span className="text-sm text-slate-400 font-bold">kg</span>
                      </span>

                      {wasModified && (
                        <div className="mt-2 bg-amber-50 border border-amber-200 text-amber-600 text-[10px] px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap">
                          Original: {originalWeight} kg
                        </div>
                      )}
                    </div>

                    {/* METADATOS INFERIORES: Inspector y Registros */}
                    <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-500">
                      <div className="flex items-center gap-1">
                        <User2Icon size={12} className="text-slate-400" />
                        <span>
                          Insp:{" "}
                          <span className="text-slate-700 font-extrabold">
                            {report.inspectorPayRollNumber}
                          </span>
                        </span>
                      </div>
                      <div className="bg-blue-50/60 border border-blue-100/40 px-2 py-0.5 rounded-md text-blue-700 font-black text-[10px]">
                        {itemsCount} {itemsCount === 1 ? 'Registro' : 'Registros'}
                      </div>
                    </div>
                  </div>

                  {/* ACCIONES (Botones con RoleGuard) */}
                  <div className="mt-6 pt-3 border-t border-slate-50 flex items-center justify-between gap-2">
                    <RoleGuard allowedRoles={[UserRole.Admin, UserRole.CalidadProveedores, UserRole.InspectorCalidad, UserRole.InspectorScrap]}>
                      <button
                        onClick={() => openSingleDetail(report.id)}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-blue-600 text-white font-black text-[10px] uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-slate-100 hover:shadow-blue-100"
                      >
                        <Search size={12} /> Verificar
                      </button>
                    </RoleGuard>

                    <RoleGuard allowedRoles={[UserRole.Admin, UserRole.CalidadProveedores]}>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => navigate("/scrap/registro", { state: { editReport: report } })}
                          className="px-3 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-amber-600 hover:border-amber-200 font-black text-[10px] uppercase tracking-wider rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                        >
                          <Edit size={11} /> Editar
                        </button>
                        <button
                          onClick={() => handleDeleteClick(report.id)}
                          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50/60 rounded-xl transition-colors cursor-pointer"
                          title="Eliminar Registro"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </RoleGuard>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                if (totalPages > 7 && (i < currentPage - 3 || i > currentPage + 1)) {
                  if (i === 0 || i === totalPages - 1) return <span key={i} className="px-1 text-gray-400">...</span>;
                  return null;
                }
                return (
                  <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-10 h-10 rounded-xl font-bold text-sm transition-all cursor-pointer ${currentPage === i + 1 ? "bg-blue-600 text-white shadow-md shadow-blue-100 scale-110" : "bg-white text-gray-400 border border-gray-100 hover:border-blue-200"}`}>
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">

          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-500 w-8 h-8" />
              </div>

              <h3 className="text-lg font-black text-slate-800 mb-2">
                ¿Eliminar registro?
              </h3>

              <p className="text-sm text-slate-500 font-medium mb-6">
                Este registro se eliminará de forma permanente y no podrá ser recuperada.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-500/30 transition-colors text-sm"
                >
                  Sí, eliminar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <RoleGuard allowedRoles={[UserRole.Admin, UserRole.CalidadProveedores, UserRole.InspectorScrap, UserRole.InspectorCalidad]}>
        <ScrapDetailModal
          isOpen={isSingleModalOpen}
          scrapId={selectedScrapId}
          onClose={() => setIsSingleModalOpen(false)}
          onRefresh={refresh}
        />
      </RoleGuard>
    </div>
  );
};