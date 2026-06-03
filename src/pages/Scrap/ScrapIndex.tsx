import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Layers,
  Plus,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrap } from "../../hooks/useScrap";
import { formatDateTime } from "../../utils/dateFormatter";
import { useMemo, useState } from "react";
import { ScrapDetailModal } from "../../components/ScrapDetailModal/ScrapDetailModal";
import { RoleGuard } from "../../components/Auth/RoleGuard";
import { UserRole } from "../../types/types";

const ITEMS_PER_PAGE = 4;

export const ScrapIndex = () => {
  const navigate = useNavigate();

  const { scrap, refresh } = useScrap();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedScrapId, setSelectedScrapId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentItems, totalPages } = useMemo(() => {
    const total = Math.ceil(scrap.length / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return {
      currentItems: scrap.slice(start, end),
      totalPages: total === 0 ? 1 : total,
    };
  }, [scrap, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDetail = (id: number) => {
    setSelectedScrapId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div
        className="flex flex-col md:flex-row md:items-center justify-between 
        gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl text-secondary">
            <TrendingUp size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
              Panel de Scrap
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Visualiza y gestiona los desperdicios de hoy.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RoleGuard
            allowedRoles={[
              UserRole.Admin,
              UserRole.CalidadProveedores,
              UserRole.AnalistaCalidad,
            ]}
          >
            <button
              onClick={() => navigate("/scrap/reportes")}
              className="flex items-center justify-center gap-2 bg-green-50 text-green-600 px-4 py-2 
              rounded-2xl font-bold border border-green-100 hover:bg-green-100 transition-all 
              hover:cursor-pointer"
            >
              <FileText size={20} />
              Reportes
            </button>
          </RoleGuard>

          <RoleGuard
            allowedRoles={[
              UserRole.Admin,
              UserRole.CalidadProveedores,
              UserRole.InspectorScrap,
              UserRole.Produccion,
            ]}
          >
            <button
              onClick={() => navigate("/scrap/registro")}
              className="flex items-center justify-center gap-2 bg-linear-to-r 
              from-secondary to-primary text-white px-4 py-2 rounded-2xl 
              font-bold shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] 
              transition-all hover:cursor-pointer"
            >
              <Plus size={20} strokeWidth={3} /> Nuevo Scrap
            </button>
          </RoleGuard>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2
            className="text-sm font-bold text-gray-400 uppercase tracking-widest 
            flex items-center gap-2"
          >
            <Clock size={16} /> Historial del Turno
          </h2>
          <span
            className="text-xs font-bold text-secondary bg-blue-50 px-3 
            py-1 rounded-full"
          >
            {scrap.length} Registros
          </span>
        </div>

        {currentItems.map((reg) => (
          <div
            key={reg.id}
            onClick={() => openDetail(reg.id)}
            className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6 hover:cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center bg-gray-50 group-hover:bg-blue-50 px-6 py-3 rounded-xl border border-transparent group-hover:border-blue-100 transition-colors min-w-25">
              <span className="text-[10px] font-black text-gray-400 group-hover:text-secondary uppercase">
                Línea
              </span>
              <span className="text-2xl font-black text-gray-600 group-hover:text-secondary">
                {reg.lineName}
              </span>
            </div>

            <div className="flex-1 space-y-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-800">
                {reg.typeScrapName}
              </h3>
              <div
                className="flex flex-wrap justify-center md:justify-start 
                gap-3 text-xs text-gray-400 font-bold uppercase"
              >
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {formatDateTime(reg.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Layers size={12} /> {reg.shiftName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 pr-4">
              <div className="text-right">
                <span className="block text-2xl font-black text-gray-800">
                  {reg.isVerified || reg.verifiedWeight > 0
                    ? reg.verifiedWeight
                    : reg.weight}{" "}
                  <small className="text-sm text-gray-400">kg</small>
                </span>
                {reg.isVerified || reg.verifiedWeight > 0 ? (
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md uppercase flex items-center gap-1 justify-end">
                    <CheckCircle2 size={10} /> Verificado
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md uppercase">
                    Por Verificar
                  </span>
                )}
              </div>
              <div className="p-2 rounded-full bg-gray-50 text-gray-300 group-hover:text-secondary group-hover:bg-blue-50 transition-colors">
                <ChevronRight size={20} />
              </div>
            </div>

            <div
              className={`absolute top-0 left-0 w-1.5 h-full rounded-l-2xl transition-opacity 
              ${
                reg.isVerified || reg.verifiedWeight > 0
                  ? "bg-green-500 opacity-100"
                  : "bg-secondary opacity-0 group-hover:opacity-100"
              }`}
            ></div>
          </div>
        ))}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white border border-gray-200 
              text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed 
              hover:bg-gray-50 transition-colors shadow-sm hover:cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    currentPage === i + 1
                      ? "bg-secondary text-white shadow-md shadow-blue-100 scale-110"
                      : "bg-white text-gray-400 border border-gray-100 hover:border-blue-200"
                  } hover:cursor-pointer`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white border border-gray-200 
              text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed 
              hover:bg-gray-50 transition-colors shadow-sm hover:cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <RoleGuard
        allowedRoles={[
          UserRole.Admin,
          UserRole.CalidadProveedores,
          UserRole.InspectorScrap,
        ]}
      >
        <ScrapDetailModal
          isOpen={isModalOpen}
          scrapId={selectedScrapId}
          onClose={() => setIsModalOpen(false)}
          onRefresh={refresh}
        />
      </RoleGuard>
    </div>
  );
};
