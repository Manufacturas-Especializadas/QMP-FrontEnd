import {
  AlertTriangle,
  CalendarDays,
  FileSpreadsheet,
  Mail,
  Plus,
  Loader2,
  Search,
  X,
  MessageCircle,
} from "lucide-react";
import { formatDateTime } from "../../utils/dateFormatter";
import { useMemo, useState } from "react";
import { RejectionFormModal } from "../../components/RejectionFormModal/RejectionFormModal";
import { useRejections } from "../../hooks/useRejections";
import { RejectionDetailsModal } from "../../components/RejectionDetailsModal/RejectionDetailsModal";
import type { RejectionResponse } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useRejectionActions } from "../../hooks/useRejectionActions";
import { RoleGuard } from "../../components/Auth/RoleGuard";

export const RejectionsIndex = () => {
  const { rejection = [], loading, refresh } = useRejections();
  const { sendToWhatsApp, sendToOutlook } = useRejectionActions();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [rejectionToEdit, setRejectionToEdit] =
    useState<RejectionResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRejection, setSelectedRejection] =
    useState<RejectionResponse | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleShowDetails = (rej: RejectionResponse) => {
    setSelectedRejection(rej);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (rej: RejectionResponse) => {
    setRejectionToEdit(rej);
    setIsRegisterModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsRegisterModalOpen(false);
    setRejectionToEdit(null);
    refresh();
  };

  const filteredRejections = useMemo(() => {
    if (!rejection) return [];
    if (!searchTerm.trim()) return rejection;

    const term = searchTerm.toLowerCase().trim();

    return rejection.filter((rej) => {
      if (!isNaN(Number(term))) {
        return rej.folio.toString() === term;
      }

      return rej.partNumber?.toLowerCase().includes(term);
    });
  }, [rejection, searchTerm]);

  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 animate-in fade-in duration-500">
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 
        rounded-3xl border border-gray-100 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-2xl text-red-600 border border-red-100">
            <AlertTriangle size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-700 tracking-tight uppercase">
              Control de Rechazos
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Gestión de No conformidades y Evidencias Visuales
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/rechazos/reportes")}
            className="flex items-center justify-center gap-2 bg-gray-50 text-gray-600 px-5 py-3 
            rounded-2xl font-bold border border-gray-100 hover:bg-gray-100 transition-all 
            hover:cursor-pointer"
          >
            <FileSpreadsheet size={20} className="text-green-600" />
            Exportar Excel
          </button>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-amber-600 
            text-white px-5 py-3 rounded-2xl font-black shadow-lg shadow-red-100 hover:scale-[1.02] 
            active:scale-[0.98] transition-all hover:cursor-pointer uppercase tracking-tight"
          >
            <Plus size={20} strokeWidth={3} /> Registrar Rechazo
          </button>
        </div>
      </div>

      <div className=" relative w-full max-w-xs group">
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 
          group-focus-within:text-red-500 transition-colors"
        >
          <Search size={18} />
        </div>

        <input
          type="text"
          placeholder="Bucar folio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl 
          focus:bg-white focus:ring-4 focus:ring-red-50 focus:border-red-200 
          outline-none transition-all font-bold text-gray-600 text-sm shadow-inner"
        />

        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full 
            text-gray-400"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="font-bold uppercase tracking-widest text-xs">
            Cargando registros...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRejections.map((rej) => {
            const firstImage = rej.image?.split(";")[0];

            return (
              <div
                key={rej.id}
                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm 
                hover:shadow-2xl hover:shadow-gray-100 transition-all flex flex-col"
              >
                <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt={rej.defectName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                      <FileSpreadsheet size={48} strokeWidth={1} />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Sin evidencia
                      </span>
                    </div>
                  )}
                  <div
                    className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 
                    rounded-full text-[10px] font-black uppercase tracking-tighter"
                  >
                    Folio: {rej.folio}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 text-xs font-bold text-gray-400 
                        uppercase tracking-wider"
                      >
                        <CalendarDays size={14} />
                        {formatDateTime(rej.createdAt)}
                      </div>
                      <span
                        className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold 
                        rounded-md uppercase"
                      >
                        {rej.lineName}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-extrabold text-gray-800 leading-snug group-hover:text-red-700 
                      transition-colors"
                    >
                      {rej.defectName} - {rej.partNumber}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {rej.description || "Sin descripción detallada."}
                    </p>
                    <div className="text-[11px] font-bold text-gray-400 italic">
                      Acción: {rej.containmentActionName}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowDetails(rej as RejectionResponse);
                        }}
                        className="px-4 py-2 bg-gray-900 text-white text-[10px] font-black 
                        uppercase rounded-xl hover:bg-blue-600 transition-all hover:cursor-pointer"
                      >
                        Detalles
                      </button>
                      <RoleGuard allowedRoles={["Admin"]}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(rej as RejectionResponse);
                          }}
                          className="px-4 py-2 border border-gray-200 text-gray-500 text-[10px] font-black
                          uppercase rounded-xl hover:bg-gray-50 transition-all hover:cursor-pointer"
                        >
                          Editar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(rej as RejectionResponse);
                          }}
                          className="px-4 py-2 border border-red-200 text-red-500 text-[10px] font-black
                          uppercase rounded-xl hover:bg-red-50 transition-all hover:cursor-pointer"
                        >
                          Elimniar
                        </button>
                      </RoleGuard>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-gray-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      ID: {rej.id} • Insp: {rej.inspector}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          rej && sendToWhatsApp(rej as RejectionResponse)
                        }
                        className="p-2 rounded-xl bg-green-50 text-green-600 border border-green-100 
                          hover:bg-green-100 transition-colors hover:cursor-pointer"
                      >
                        <MessageCircle size={16} />
                      </button>
                      <button
                        onClick={() =>
                          rej && sendToOutlook(rej as RejectionResponse)
                        }
                        className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 
                        hover:bg-blue-100 transition-colors hover:cursor-pointer"
                      >
                        <Mail size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 w-full h-1 bg-red-600 opacity-0 group-hover:opacity-100 
                  transition-opacity rounded-b-3xl"
                ></div>
              </div>
            );
          })}
        </div>
      )}

      {isRegisterModalOpen && (
        <RejectionFormModal
          isOpen={isRegisterModalOpen}
          onClose={handleCloseModal}
          rejectionToEdit={rejectionToEdit}
        />
      )}

      <RejectionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        rejection={selectedRejection}
      />
    </div>
  );
};
