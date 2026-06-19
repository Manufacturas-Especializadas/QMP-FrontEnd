import { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Search,
  SlidersHorizontal,
  FileText,
  Loader2,
  File,
} from "lucide-react";
import { useAuditsFcds } from "../../hooks/useAuditsFcds";
import { AuditFormContainer } from "../../components/Layouts/AuditsFCDSLayout/Form/AuditFormContainer";
import { AuditDetailsModal } from "../../components/Layouts/AuditsFCDSLayout/AuditDetailsModal/AuditDetailsModal";
import { RoleGuard } from "../../components/Auth/RoleGuard";
import { UserRole } from "../../types/types";

export const AuditsFCDS = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAuditId, setSelectedAuditId] = useState<number | null>(null);

  const [formMode, setFormMode] = useState<"create" | "edit" | "view">(
    "create",
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { audits, loading, fetchAudits, deleteAudit } = useAuditsFcds();

  useEffect(() => {
    fetchAudits();
  }, [fetchAudits]);

  const filteredAudits = audits.filter(
    (audit) =>
      audit.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.inspectorName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalAudits = audits.length;
  const totalConforming = audits.filter((a) => a.isProductConforming).length;
  const totalRejections = audits.filter((a) => !a.isProductConforming).length;

  const handleCreate = () => {
    setFormMode("create");
    setSelectedId(null);
    setShowForm(true);
  };

  const handleDetails = (id: number) => {
    setSelectedAuditId(id);
    setShowDetailsModal(true);
  };

  const handleEdit = (id: number) => {
    setFormMode("edit");
    setSelectedId(id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm(
        "¿Está seguro de que desea eliminar este registro de auditoría? Esta acción borrará en cascada todos sus detalles.",
      )
    ) {
      await deleteAudit(id);
    }
  };

  if (showForm) {
    return (
      <div className="p-4 sm:p-6 bg-slate-50 min-h-screen">
        <AuditFormContainer
          mode={formMode}
          auditId={selectedId}
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            fetchAudits();
            setShowForm(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
        gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600">
            <ClipboardCheck size={24} />
            <span className="text-xs uppercase font-black tracking-wider">
              Calidad
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
            Auditorías a Proceso FCD's
          </h1>
          <p className="text-slate-400 text-xs font-medium">
            Historial de auditorias
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <RoleGuard
            allowedRoles={[
              UserRole.Admin,
              UserRole.InspectorCalidad,
              UserRole.AnalistaCalidad,
            ]}
          >
            <button
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-black 
                text-sm uppercase tracking-wider px-6 py-4 rounded-2xl shadow-lg shadow-green-100 
                transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center 
                justify-center gap-2 shrink-0 hover:cursor-pointer"
            >
              <File size={18} /> Reportes
            </button>
          </RoleGuard>
          <RoleGuard allowedRoles={[UserRole.Admin, UserRole.InspectorCalidad]}>
            <button
              onClick={handleCreate}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black 
              text-sm uppercase tracking-wider px-6 py-4 rounded-2xl shadow-lg shadow-blue-100 
              transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center 
              justify-center gap-2 shrink-0 hover:cursor-pointer"
            >
              <Plus size={18} /> Nueva Auditoría
            </button>
          </RoleGuard>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex 
          items-center gap-4"
        >
          <div
            className="p-3 bg-blue-50 text-blue-600 rounded-xl font-black text-xs uppercase 
            tracking-wider"
          >
            Total
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">
              {loading ? "..." : totalAudits}
            </p>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-wide">
              Auditorías Totales
            </p>
          </div>
        </div>
        <div
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex 
          items-center gap-4"
        >
          <div
            className="p-3 bg-emerald-50 text-emerald-600 rounded-xl font-black text-xs 
            uppercase tracking-wider"
          >
            OK
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-600">
              {loading ? "..." : totalConforming}
            </p>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-wide">
              Conformes
            </p>
          </div>
        </div>
        <div
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex 
          items-center gap-4"
        >
          <div
            className="p-3 bg-rose-50 text-rose-600 rounded-xl font-black text-xs 
            uppercase tracking-wider"
          >
            RDM
          </div>
          <div>
            <p className="text-2xl font-black text-rose-600">
              {loading ? "..." : totalRejections}
            </p>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-wide">
              No Conformes
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar por número de parte o inspector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 
            outline-none text-sm font-medium focus:bg-white focus:border-blue-500 
            transition-colors"
          />
        </div>
        <button
          className="p-3 border border-slate-100 bg-slate-50 text-slate-600 rounded-xl 
          transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      <div className="bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden">
        {loading ? (
          <div
            className="p-12 flex flex-col justify-center items-center gap-3 text-slate-400 
            font-bold text-sm"
          >
            <Loader2 className="animate-spin text-blue-600" size={32} />
            Consultando registros en planta...
          </div>
        ) : filteredAudits.length === 0 ? (
          <div
            className="p-12 text-center text-slate-400 font-bold text-sm uppercase 
            tracking-wider"
          >
            No se encontraron auditorías registradas
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="bg-slate-50/70 border-b border-slate-100 text-[10px] uppercase 
                    font-black text-slate-400 tracking-wider"
                  >
                    <th className="p-4 pl-6">Fecha / Hora</th>
                    <th className="p-4">Proceso</th>
                    <th className="p-4">No. de Parte</th>
                    <th className="p-4">Líneas Auditadas</th>
                    <th className="p-4">Inspector</th>
                    <th className="p-4 text-center">Estatus</th>
                    <th className="p-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-600">
                  {filteredAudits.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/40 transition-colors"
                    >
                      <td className="p-4 pl-6 font-bold text-slate-700">
                        {new Date(row.auditDate).toLocaleDateString()}
                        <span className="text-[11px] text-slate-400 block font-normal">
                          {new Date(row.auditDate).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 
                          rounded-lg font-black uppercase"
                        >
                          {row.processName}
                        </span>
                      </td>
                      <td className="p-4 font-black text-slate-700">
                        {row.partNumber}
                      </td>
                      <td className="p-4 text-xs text-slate-500">
                        {row.linesSummary}
                      </td>
                      <td className="p-4 text-xs text-slate-500">
                        {row.inspectorName}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col items-center gap-1">
                          {row.isProductConforming ? (
                            <span
                              className="inline-flex items-center gap-1 bg-emerald-50 
                              text-emerald-700 text-[11px] font-black uppercase px-2.5 py-1 
                              rounded-full"
                            >
                              <CheckCircle2 size={12} /> Conforme
                            </span>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1 bg-rose-50 
                              text-rose-700 text-[11px] font-black uppercase px-2.5 py-1 
                              rounded-full"
                            >
                              <XCircle size={12} /> No Conforme
                            </span>
                          )}
                          {row.folioRDM && (
                            <span
                              className="inline-flex items-center gap-1 text-[10px] 
                              font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md 
                              border border-amber-100"
                            >
                              <FileText size={10} /> RDM Folio: {row.folioRDM}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleDetails(row.id)}
                            className="p-2 text-slate-400 hover:text-blue-600 
                            hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye size={18} />
                          </button>
                          <RoleGuard
                            allowedRoles={[UserRole.Admin, UserRole.Ingeniero]}
                          >
                            <button
                              onClick={() => handleEdit(row.id)}
                              className="p-2 text-slate-400 hover:text-amber-600 
                              hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Pencil size={18} />
                            </button>
                          </RoleGuard>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 
                            rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="block md:hidden divide-y divide-slate-100">
              {filteredAudits.map((row) => (
                <div
                  key={row.id}
                  className="p-5 space-y-4 hover:bg-slate-50/30 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span
                        className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 
                        rounded font-black uppercase"
                      >
                        {row.processName}
                      </span>
                      <h3 className="font-black text-slate-800 text-base">
                        {row.partNumber}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {new Date(row.auditDate).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {row.isProductConforming ? (
                        <span
                          className="bg-emerald-50 text-emerald-700 text-[10px] 
                          font-black uppercase px-2 py-0.5 rounded-full"
                        >
                          OK
                        </span>
                      ) : (
                        <span
                          className="bg-rose-50 text-rose-700 text-[10px] font-black 
                          uppercase px-2 py-0.5 rounded-full"
                        >
                          RDM
                        </span>
                      )}
                      {row.folioRDM && (
                        <span
                          className="text-[9px] font-black text-amber-700 bg-amber-50 
                          px-1.5 py-0.5 rounded border border-amber-100"
                        >
                          #{row.folioRDM}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-2 gap-2 text-xs bg-slate-50/60 p-3 rounded-xl 
                    border border-slate-100 font-medium text-slate-500"
                  >
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">
                        Líneas
                      </span>
                      {row.linesSummary}
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">
                        Inspector
                      </span>
                      {row.inspectorName}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleDetails(row.id)}
                      className="flex-1 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs 
                        font-bold flex items-center justify-center gap-2 border border-slate-100"
                    >
                      <Eye size={14} /> Detalles
                    </button>
                    <button
                      onClick={() => handleEdit(row.id)}
                      className="p-2.5 bg-amber-50 text-amber-700 rounded-xl border 
                      border-amber-100"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="p-2.5 bg-rose-50 text-rose-700 rounded-xl border 
                      border-rose-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <AuditDetailsModal
        isOpen={showDetailsModal}
        auditId={selectedAuditId}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedAuditId(null);
        }}
      />
    </div>
  );
};
