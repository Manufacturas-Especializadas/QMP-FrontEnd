import { useState, useEffect } from "react";
import { useAuditsACD } from "../../hooks/useAuditsACD";

import { Database, Loader2 } from "lucide-react";
import { ACDSFilters } from "../../components/Layouts/AuditsACDSLayout/ACDSFilters";
import { ACDSGrid } from "../../components/Layouts/AuditsACDSLayout/ACDSGrid";
import { ACDSHeader } from "../../components/Layouts/AuditsACDSLayout/ACDSHeader";
import { ACDSWizardModal } from "../../components/Layouts/AuditsACDSLayout/ACDSWizardModal";
import { ACDSDetailsModal } from "../../components/Layouts/AuditsACDSLayout/ACDSDetailsModal";

export const AuditsACDS = () => {
  const { audits, loading, fetchAudits, deleteAudit } = useAuditsACD();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedAuditId, setSelectedAuditId] = useState<number | null>(null);
  const [editAuditId, setEditAuditId] = useState<number | null>(null);

  useEffect(() => {
    fetchAudits();
  }, [fetchAudits]);

  const filteredAudits = audits.filter((audit) => {
    const matchesSearch =
      audit.inspectorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.lineNames.some((l) =>
        l.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      audit.findings.some((f) =>
        f.partNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesShift =
      selectedShift === "" || audit.shiftName === selectedShift;

    return matchesSearch && matchesShift;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      <ACDSHeader
        totalAudits={audits.length}
        onNewAuditClick={() => setIsWizardOpen(true)}
      />

      <ACDSFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedShift={selectedShift}
        onShiftChange={setSelectedShift}
      />

      {loading && audits.length === 0 ? (
        <div
          className="py-32 flex flex-col items-center justify-center gap-3 text-slate-400 
          font-bold text-sm bg-white rounded-[2.5rem] border border-slate-100 shadow-sm"
        >
          <Loader2 className="animate-spin text-blue-600" size={36} />
          Cargando datos...
        </div>
      ) : filteredAudits.length === 0 ? (
        <div
          className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center 
          shadow-sm max-w-md mx-auto space-y-4 mt-8"
        >
          <div
            className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center 
            justify-center mx-auto border border-slate-100"
          >
            <Database size={26} />
          </div>
          <div className="space-y-1">
            <h3 className="font-black text-slate-700 uppercase text-sm">
              Sin registros ACD
            </h3>
            <p className="text-xs font-semibold text-slate-400">
              No se encontraron auditorías a producto terminado para los
              criterios ingresados.
            </p>
          </div>
        </div>
      ) : (
        <ACDSGrid
          data={filteredAudits}
          onViewDetails={(id) => setSelectedAuditId(id)}
          onEdit={(id) => setEditAuditId(id)}
          onDelete={deleteAudit}
        />
      )}

      <ACDSDetailsModal
        isOpen={selectedAuditId !== null}
        auditId={selectedAuditId}
        onClose={() => setSelectedAuditId(null)}
      />

      <ACDSWizardModal
        isOpen={isWizardOpen || editAuditId !== null}
        auditId={editAuditId}
        onSuccess={fetchAudits}
        onClose={() => {
          setIsWizardOpen(false);
          setEditAuditId(null);
        }}
      />
    </div>
  );
};
