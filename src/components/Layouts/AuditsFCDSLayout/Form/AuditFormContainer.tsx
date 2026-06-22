import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type {
  Controls,
  CreateAuditFcds,
  Physicals,
  Traceability,
} from "../../../../types/types";
import { auditsFcdsService } from "../../../../api/services/AuditsFcdsService";
import { Step1AuditData } from "./Step1AuditData";
import { Step2Traceability } from "./Step2Traceability";
import { Step3ProcessControls } from "./Step3ProcessControls";
import { Step4PhysicalCondition } from "./Step4PhysicalCondition";
import { Step5ProductRelease } from "./Step5ProductRelease";
import { RejectionFormModal } from "../../../RejectionFormModal/RejectionFormModal";
import { useAuditsFcds } from "../../../../hooks/useAuditsFcds";

interface AuditFormContainerProps {
  onClose: () => void;
  onSuccess: () => void;
  mode?: "create" | "edit" | "view";
  auditId?: number | null;
}

const INITIAL_STATE: CreateAuditFcds = {
  id: 0,
  shiftId: 0,
  rejectionId: 0,
  fcdsProcessId: 0,
  partNumber: "",
  lineIds: [],
  isProductConforming: true,
  traceability: {
    machineCodeIds: [],
    operatorsPayroll: "",
    categoryId: 0,
    typeMeasuringEquipmentId: null,
    shopOrder: "",
    batchPipe: "",
    pipeDiameterId: null,
    pipeWallId: null,
    equipmentSerials: ["", ""],
  },
  controls: {
    mttoValidation: 0,
    realese1stPiece: 0,
    spc: 0,
    materialCorrectlyIdentified: 0,
    identifiedMeasuringEquipment: 0,
    calibratedMeasuringEquipment: 0,
    itProcess: 0,
    typeOil: "",
    lastHourOfRelease: "",
  },
  physicals: {
    brands: 0,
    blows: 0,
    pollution: 0,
    ovality: 0,
    burr: 0,
    warped: 0,
    excessOil: 0,
  },
  dimensionalSpecs: [],
  visualChecklists: [],
};

export const AuditFormContainer = ({
  onClose,
  onSuccess,
  mode = "create",
  auditId,
}: AuditFormContainerProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CreateAuditFcds>(INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [showRdmModal, setShowRdmModal] = useState(false);
  const { fetchAuditById } = useAuditsFcds();

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && auditId) {
      fetchAuditById(auditId).then((data) => {
        if (data) setFormData(data);
      });
    }
  }, [mode, auditId]);

  const isReadOnly = mode === "view";

  const updateFields = (
    fields:
      | Partial<CreateAuditFcds>
      | ((prev: CreateAuditFcds) => CreateAuditFcds),
  ) => {
    if (typeof fields === "function") {
      setFormData(fields);
    } else {
      setFormData((prev) => ({ ...prev, ...fields }));
    }
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (isConformingOverride?: boolean) => {
    if (isConformingOverride === false) {
      updateFields({ isProductConforming: false });
      setShowRdmModal(true);
      return;
    }

    updateFields({ isProductConforming: true });
    executeFinalSave();
  };

  const executeFinalSave = async (generatedRejectionId?: number) => {
    setSaving(true);

    try {
      const finalData = { ...formData };
      if (generatedRejectionId) {
        finalData.rejectionId = generatedRejectionId;
      }

      if (mode === "edit" && auditId) {
        await auditsFcdsService.update(auditId, finalData);
      } else {
        await auditsFcdsService.create(finalData);
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Error al procesar la auditoría";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1AuditData
            data={formData}
            updateFields={updateFields}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2Traceability
            data={
              (formData.traceability ??
                INITIAL_STATE.traceability) as Traceability
            }
            updateFields={(fields) =>
              updateFields({
                traceability: {
                  ...(formData.traceability ?? INITIAL_STATE.traceability),
                  ...fields,
                } as Traceability,
              })
            }
            onNext={handleNext}
            onBack={handleBack}
            selectedLineIds={formData.lineIds ?? []}
          />
        );

      case 3:
        return (
          <Step3ProcessControls
            data={(formData.controls ?? INITIAL_STATE.controls) as Controls}
            updateFields={(fields) =>
              updateFields({
                controls: {
                  ...(formData.controls ?? INITIAL_STATE.controls),
                  ...fields,
                } as Controls,
              })
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        );

      case 4:
        return (
          <Step4PhysicalCondition
            data={(formData.physicals ?? INITIAL_STATE.physicals) as Physicals}
            updateFields={(fields) =>
              updateFields({
                physicals: {
                  ...(formData.physicals ?? INITIAL_STATE.physicals),
                  ...fields,
                } as Physicals,
              })
            }
            onNext={handleNext}
            onBack={handleBack}
            fullData={formData}
            updateFullFields={updateFields}
          />
        );
      case 5:
        return (
          <Step5ProductRelease
            data={formData}
            updateFields={updateFields}
            onSubmit={handleSubmit}
            onBack={handleBack}
            saving={saving}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="max-w-3xl mx-auto bg-white border border-slate-100 shadow-xl 
      shadow-slate-200/50 rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      <div
        className="bg-slate-50/80 p-6 border-b border-slate-100 flex flex-col 
        sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h2 className="text-lg font-black text-slate-800 uppercase">
            {isReadOnly
              ? "Visualización de Auditoría"
              : mode === "edit"
                ? "Editar Auditoría"
                : "Registro de Auditoría"}
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Hoja {currentStep} de 5 —{" "}
            {currentStep === 1
              ? "Datos de Auditoría"
              : currentStep === 2
                ? "Elementos de Trazabilidad"
                : currentStep === 3
                  ? "Controles del Proceso"
                  : currentStep === 4
                    ? "Condición Física"
                    : "Liberación Final"}
          </p>
        </div>

        <div
          className="flex items-center gap-1.5 bg-slate-200/60 p-1.5 rounded-xl w-full 
          sm:w-auto justify-center"
        >
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-lg transition-all duration-300 ${
                step === currentStep
                  ? "w-8 bg-blue-600"
                  : step < currentStep
                    ? "w-3 bg-emerald-500"
                    : "w-3 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
      {isReadOnly && (
        <div className="p-4 bg-slate-50 border-t flex justify-end pointer-events-auto">
          <button
            onClick={onClose}
            className="bg-slate-800 text-white font-bold px-6 py-3 rounded-xl"
          >
            Cerrar Detalles
          </button>
        </div>
      )}
      <div className="p-6 sm:p-8">{renderStep()}</div>

      {showRdmModal && (
        <RejectionFormModal
          isOpen={showRdmModal}
          onClose={() => setShowRdmModal(false)}
          preventClose={false}
          onSuccess={(newRejectionId) => {
            setShowRdmModal(false);
            executeFinalSave(newRejectionId);
          }}
        />
      )}
    </div>
  );
};
