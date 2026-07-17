import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
  CheckCircle2,
  Clock,
  FileText,
  Layers,
  Plus,
  TrendingUp,
  User,
} from "lucide-react";

import { useScrap } from "../../hooks/useScrap";
import { useLines } from "../../hooks/useLines";
import { ScrapDetailModal } from "../../components/ScrapDetailModal/ScrapDetailModal";
import { RoleGuard } from "../../components/Auth/RoleGuard";
import { UserRole } from "../../types/types";
import { ACDSFilters } from "../../components/Layouts/AuditsACDSLayout/ACDSFilters";
import { formatDateTime } from "../../utils/dateFormatter";

const ITEMS_PER_PAGE = 10;

export const ScrapIndex = () => {
  const navigate = useNavigate();
  const { scrap, refresh } = useScrap();
  const { lines } = useLines({ isPaged: false }); 

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [activeLineTab, setActiveLineTab] = useState<string>("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedScrapId, setSelectedScrapId] = useState<number | null>(null);
  const [isSingleModalOpen, setIsSingleModalOpen] = useState(false);

  // REFERENCIA PARA EL SCROLL DE LOS TABS
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedShift, activeLineTab]);

  const lineTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    lines.forEach(l => { totals[l.name] = 0; });

    scrap.forEach((item) => {
      const lineName = item.lineName;
      if (!lineName) return;
      
      const weight = item.isVerified || item.verifiedWeight > 0 ? item.verifiedWeight : item.weight;
      totals[lineName] = (totals[lineName] || 0) + weight;
    });
    return totals;
  }, [scrap, lines]);

  const filteredRecords = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();
    
    return scrap.filter((item) => {
      const itemLineName = item.lineName ?? "";
      const itemShiftName = item.shiftName ?? "";
      const itemPayroll = item.payRollNumber?.toString() ?? "";
      const itemTypeScrapName = item.typeScrapName ?? "";

      const matchesSearch =
        !cleanSearch ||
        itemLineName.toLowerCase().includes(cleanSearch) ||
        itemTypeScrapName.toLowerCase().includes(cleanSearch) ||
        itemPayroll.includes(cleanSearch);

      const matchesShift = !selectedShift || itemShiftName === selectedShift;
      const matchesLineTab = activeLineTab === "Todas" ? true : itemLineName === activeLineTab;

      return matchesSearch && matchesShift && matchesLineTab;
    });
  }, [scrap, searchTerm, selectedShift, activeLineTab]);

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

  // FUNCIÓN PARA MOVER EL SCROLL HORIZONTALMENTE
  const scrollTabs = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Píxeles a desplazar por cada clic
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <TrendingUp size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Panel de Scrap</h1>
            <p className="text-sm text-gray-500 font-medium">Visualiza y gestiona los desperdicios consolidados.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RoleGuard allowedRoles={[UserRole.Admin, UserRole.CalidadProveedores, UserRole.AnalistaCalidad]}>
            <button onClick={() => navigate("/scrap/reportes")} className="flex items-center justify-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-2xl font-bold border border-green-100 hover:bg-green-100 transition-all cursor-pointer">
              <FileText size={20} /> Reportes
            </button>
          </RoleGuard>
          <RoleGuard allowedRoles={[UserRole.Admin, UserRole.CalidadProveedores, UserRole.InspectorScrap, UserRole.Produccion]}>
            <button onClick={() => navigate("/scrap/registro")} className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
              <Plus size={20} strokeWidth={3} /> Nuevo Scrap
            </button>
          </RoleGuard>
        </div>
      </div>

      {/* FILTROS GENERALES */}
      <ACDSFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedShift={selectedShift}
        onShiftChange={setSelectedShift}
      />

      {/* TABS DE LÍNEAS DE PRODUCCIÓN */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Layers size={16} /> Estaciones de Producción
          </h2>
        </div>
        
        {/* ENVOLTORIO RELATIVO PARA POSICIONAR LAS FLECHAS */}
        <div className="relative group flex items-center">
          
          {/* BOTÓN IZQUIERDO (Solo visible en desktop) */}
          <button 
            onClick={() => scrollTabs("left")} 
            className="absolute -left-4 z-10 hidden md:flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-white transition-all cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={22} />
          </button>

          {/* CONTENEDOR CON SCROLL HORIZONTAL */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-3 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] w-full px-1"
          >
            <button
              onClick={() => setActiveLineTab("Todas")}
              className={`flex flex-col items-start px-5 py-3 rounded-2xl min-w-35 transition-all cursor-pointer border shrink-0 ${
                activeLineTab === "Todas" 
                  ? "bg-slate-800 text-white border-slate-800 shadow-md shadow-slate-200" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="font-black uppercase text-sm">Vista General</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 mt-2 rounded-md ${activeLineTab === "Todas" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                {filteredRecords.length} Registros
              </span>
            </button>

            {lines.map((line) => (
              <button
                key={line.id}
                onClick={() => setActiveLineTab(line.name)}
                className={`flex flex-col items-start px-5 py-3 rounded-2xl min-w-35 transition-all cursor-pointer border shrink-0 ${
                  activeLineTab === line.name 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200" 
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <span className="font-black uppercase text-sm">{line.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 mt-2 rounded-md ${activeLineTab === line.name ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {lineTotals[line.name] || 0} kg totales
                </span>
              </button>
            ))}
          </div>

          {/* BOTÓN DERECHO (Solo visible en desktop) */}
          <button 
            onClick={() => scrollTabs("right")} 
            className="absolute -right-4 z-10 hidden md:flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-white transition-all cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </div>

      {/* CONTENEDOR DE REGISTROS INDIVIDUALES */}
      <div className="bg-slate-50 border border-slate-100 p-6 rounded-">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
            Desglose de Scrap
            {activeLineTab !== "Todas" && <span className="text-blue-600">• {activeLineTab}</span>}
          </h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full">
            {filteredRecords.length} Resultados
          </span>
        </div>

        {paginatedRecords.length === 0 ? (
          <div className="text-center py-10 bg-white border border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-400 font-bold">No se encontraron registros de scrap para esta selección.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedRecords.map((reg) => (
              <div
                key={reg.id}
                onClick={() => openSingleDetail(reg.id)}
                className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6 hover:cursor-pointer animate-in fade-in"
              >
                <div className="flex flex-col items-center justify-center bg-gray-50 group-hover:bg-blue-50 px-6 py-3 rounded-xl border border-transparent group-hover:border-blue-100 transition-colors min-w-25">
                  <span className="text-[10px] font-black text-gray-400 group-hover:text-blue-600 uppercase">
                    Línea
                  </span>
                  <span className="text-2xl font-black text-gray-600 group-hover:text-blue-700">
                    {reg.lineName}
                  </span>
                </div>

                <div className="flex-1 space-y-1 text-center md:text-left">
                  <h3 className="text-lg font-bold text-gray-800">
                    {reg.typeScrapName}
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 text-[11px] text-gray-500 font-bold uppercase mt-2">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" /> {formatDateTime(reg.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers size={12} className="text-slate-400" /> {reg.shiftName}
                    </span>
                    <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      <User size={12} /> Nómina: {reg.payRollNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pr-4 mt-4 md:mt-0">
                  <div className="text-right">
                    <span className="block text-2xl font-black text-gray-800">
                      {reg.isVerified || reg.verifiedWeight > 0 ? reg.verifiedWeight : reg.weight}{" "}
                      <small className="text-sm text-gray-400">kg</small>
                    </span>
                    {reg.isVerified || reg.verifiedWeight > 0 ? (
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md uppercase flex items-center gap-1 justify-end">
                        <CheckCircle2 size={10} /> Verificado
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md uppercase flex justify-end">
                        Por Verificar
                      </span>
                    )}
                  </div>
                  <div className="p-2 rounded-full bg-gray-50 text-gray-300 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors hidden md:block">
                    <ChevronRightIcon size={20} />
                  </div>
                </div>

                <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-2xl transition-opacity ${reg.isVerified || reg.verifiedWeight > 0 ? "bg-green-500 opacity-100" : "bg-blue-600 opacity-0 group-hover:opacity-100"}`}></div>
              </div>
            ))}
          </div>
        )}

        {/* CONTROLES DE PAGINACIÓN */}
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

      <RoleGuard allowedRoles={[UserRole.Admin, UserRole.CalidadProveedores, UserRole.InspectorScrap]}>
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