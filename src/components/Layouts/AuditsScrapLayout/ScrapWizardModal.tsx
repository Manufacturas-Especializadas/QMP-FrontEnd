import { useState } from "react";
import { useAuditsScrap } from "../../../hooks/useAuditsScrap";
import { Step1AuditData } from "./Form/Step1AuditData";
import { X, ArrowRight, FileSpreadsheet } from "lucide-react";
import type { CreateAuditScrapPayload } from "../../../types/types";
import { Step2Findings } from "./Form/Step2Findings";

interface ScrapWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScrapWizardModal = ({
  isOpen,
  onClose,
}: ScrapWizardModalProps) => {
  const { createAudit, isSaving } = useAuditsScrap();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<CreateAuditScrapPayload>({
    shiftId: 0,
    leaderPayroll: 0,
    lineIds: [],
    findings: [],
  });

  if (!isOpen) return null;

  const updateFields = (fields: Partial<CreateAuditScrapPayload>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleSubmit = async () => {
    if (formData.findings.length === 0) {
      alert("Debes agregar al menos un hallazgo de scrap antes de finalizar.");
      return;
    }

    const success = await createAudit(formData);
    if (success) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
      bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl 
        flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95"
      >
        <div
          className="p-6 border-b border-slate-100 bg-slate-50/50 flex 
          justify-between items-center shrink-0"
        >
          <div className="space-y-1">
            <span
              className="bg-blue-600 text-white text-[10px] font-black 
              uppercase px-2.5 py-0.5 rounded-md flex items-center gap-1 w-max"
            >
              <FileSpreadsheet size={10} /> Formulario de Inspección
            </span>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Levantamiento de Auditoría de Scrap
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 
            cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="px-8 py-3 bg-slate-50/30 border-b border-slate-100 flex 
          items-center gap-6 text-xs font-bold text-slate-400"
        >
          <span
            className={
              step === 1 ? "text-blue-600 font-black" : "text-emerald-600"
            }
          >
            1. Datos de Auditoría{step > 1 && "✓"}
          </span>
          <ArrowRight size={12} />
          <span className={step === 2 ? "text-blue-600 font-black" : ""}>
            2. Registro de Hallazgos y Evidencias
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {step === 1 ? (
            <Step1AuditData
              data={formData}
              updateFields={updateFields}
              onNext={() => setStep(2)}
            />
          ) : (
            <Step2Findings
              data={formData}
              updateFields={updateFields}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
              isSaving={isSaving}
            />
          )}
        </div>
      </div>
    </div>
  );
};
