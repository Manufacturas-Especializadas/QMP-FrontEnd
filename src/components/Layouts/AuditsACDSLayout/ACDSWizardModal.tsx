import { useEffect, useState } from "react";
import { useAuditsACD } from "../../../hooks/useAuditsACD";
import { Step1ACDSData } from "./Form/Step1ACDSData";
import { Step2ACDSFindings } from "./Form/Step2ACDSFindings";
import { RejectionFormModal } from "../../RejectionFormModal/RejectionFormModal";
import { X, ArrowRight, ClipboardCheck } from "lucide-react";
import type { CreateAuditACDPayload } from "../../../types/types";

interface ACDSWizardModalProps {
  isOpen: boolean;
  auditId?: number | null;
  onClose: () => void;
}

export const ACDSWizardModal = ({
  isOpen,
  auditId,
  onClose,
}: ACDSWizardModalProps) => {
  const { createAudit, updateAudit, fetchAuditById, isSaving } = useAuditsACD();
  const [step, setStep] = useState(1);
  const [showRdmModal, setShowRdmModal] = useState(false);

  const [formData, setFormData] = useState<CreateAuditACDPayload>({
    shiftId: 0,
    rejectionId: null,
    lineIds: [],
    findings: [],
  });

  useEffect(() => {
    if (isOpen && auditId) {
      fetchAuditById(auditId).then((res) => {
        if (res) {
          setFormData({
            shiftId: res.shiftId,
            rejectionId: res.rejectionId,
            lineIds: res.lineIds ?? [],
            findings: res.findings.map((f) => ({
              id: f.id,
              startPointId: f.startPointId,
              endPointId: f.endPointId,
              partNumber: f.partNumber,
              numberOfPieces: f.numberOfPieces,
              sampleSize: f.sampleSize,
              packerPayroll: f.packerPayroll,
              containerIdMatch: f.containerIdMatch,
              frontView: f.frontView,
              sideView: f.sideView,
              topView: f.topView,
              isometricView: f.isometricView,
              completeProcess: f.completeProcess,
              isProductConforming: f.isProductConforming,
            })),
          });
        }
      });
    } else if (isOpen && !auditId) {
      setFormData({ shiftId: 0, rejectionId: null, lineIds: [], findings: [] });
      setStep(1);
      setShowRdmModal(false);
    }
  }, [auditId, isOpen]);

  if (!isOpen) return null;

  const updateFields = (fields: Partial<CreateAuditACDPayload>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (formData.findings.length === 0) {
      alert(
        "Debes agregar al menos un lote / contenedor de producto terminado antes de finalizar.",
      );
      return;
    }

    const hasRejectedItems = formData.findings.some(
      (f) => !f.isProductConforming,
    );

    if (hasRejectedItems && !formData.rejectionId) {
      setShowRdmModal(true);
      return;
    }

    executeFinalSave();
  };

  const executeFinalSave = async (generatedRejectionId?: any) => {
    let success = false;

    let rdmId: number | null = null;

    if (typeof generatedRejectionId === "number") {
      rdmId = generatedRejectionId;
    } else if (
      generatedRejectionId &&
      typeof generatedRejectionId === "object"
    ) {
      rdmId =
        generatedRejectionId.id ??
        generatedRejectionId.rejectionId ??
        generatedRejectionId.data?.id ??
        generatedRejectionId.data?.rejectionId ??
        null;
    }

    const finalPayload = {
      ...formData,
      rejectionId: rdmId ?? formData.rejectionId,
    };

    if (auditId) {
      success = await updateAudit(auditId, finalPayload as any);
    } else {
      success = await createAudit(finalPayload);
    }

    if (success) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 
      backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl flex flex-col 
        max-h-[90vh] overflow-hidden animate-in zoom-in-95"
      >
        <div
          className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between 
          items-center shrink-0"
        >
          <div className="space-y-1">
            <span
              className="bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 
              py-0.5 rounded-md flex items-center gap-1 w-max"
            >
              <ClipboardCheck size={10} /> Formulario de Inspección
            </span>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              {auditId
                ? `Modificar Auditoría ACD #${auditId}`
                : "Levantamiento de Auditoría ACD"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="px-8 py-3 bg-slate-50/30 border-b border-slate-100 flex items-center 
          gap-6 text-xs font-bold text-slate-400"
        >
          <span
            className={
              step === 1 ? "text-blue-600 font-black" : "text-emerald-600"
            }
          >
            1. Carátula e Identificación de Líneas {step > 1 && "✓"}
          </span>
          <ArrowRight size={12} />
          <span className={step === 2 ? "text-blue-600 font-black" : ""}>
            2. Checklist Visual y Puntos Terminales
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {step === 1 ? (
            <Step1ACDSData
              data={formData}
              updateFields={updateFields}
              onNext={handleNext}
            />
          ) : (
            <Step2ACDSFindings
              data={formData}
              updateFields={updateFields}
              onBack={handleBack}
              onSubmit={handleSubmit}
              isSaving={isSaving}
            />
          )}
        </div>
      </div>

      {showRdmModal && (
        <RejectionFormModal
          isOpen={showRdmModal}
          onClose={() => setShowRdmModal(false)}
          preventClose={true}
          onSuccess={(newRejectionId) => {
            setShowRdmModal(false);
            executeFinalSave(newRejectionId);
          }}
        />
      )}
    </div>
  );
};
