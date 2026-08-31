import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FloatingSelect } from "../CustomInputs/FloatingSelect";
import { Input } from "../CustomInputs/Input";
import Textarea from "../CustomInputs/Textarea";
import { ImageUploader } from "../ImageUploader/ImageUploader";
import { SignaturePad } from "../SignaturePad/SignaturePad";
import { useNextFolio } from "../../hooks/useNextFolio";
import { useAuth } from "../../context/AuthContext";
import { useLines } from "../../hooks/useLines";
import { useClients } from "../../hooks/useClients";
import { useContainmentActions } from "../../hooks/useContainmentActions";
import { useDefectRejections } from "../../hooks/useDefectRejections";
import { useRejectionForm } from "../../hooks/useRejectionForm";
import { useConditionByDefect } from "../../hooks/useConditionByDefect";
import type { RejectionResponse } from "../../types/types";

export const RejectionFormModal = ({
  isOpen,
  onClose,
  rejectionToEdit = null,
  onSuccess,
  preventClose = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  rejectionToEdit?: RejectionResponse | null;
  onSuccess?: (rejectionId?: number) => void;
  preventClose?: boolean;
}) => {
  const [step, setStep] = useState(1);
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    setEditData,
    isEditMode,
    existingPhotos,
    existingSignature,
  } = useRejectionForm((newRejectionId?: number) => {
    if (onSuccess) {
      onSuccess(newRejectionId);
    } else {
      onClose();
    }
    setStep(1);
  });
  const { user } = useAuth();
  const { lines } = useLines();
  const { clients } = useClients();
  const { defects } = useDefectRejections();
  const { actions } = useContainmentActions();
  const { folio, isLoading } = useNextFolio(isOpen);
  const { conditions } = useConditionByDefect(formData.idDefect);

  const linesOptions = useMemo(
    () => lines.map((l) => ({ label: l.name, value: l.id })),
    [lines],
  );

  const clientsOptions = useMemo(
    () => clients.map((c) => ({ label: c.name, value: c.id })),
    [clients],
  );

  const defectRejections = useMemo(
    () => defects.map((d) => ({ label: d.name, value: d.id })),
    [defects],
  );

  const containmentActionsOptions = useMemo(
    () => actions.map((a) => ({ label: a.name, value: a.id })),
    [actions],
  );

  const conditionOptions = useMemo(
    () => conditions.map((c) => ({ label: c.name, value: c.id })),
    [conditions],
  );

  const modalTitle = isEditMode ? "Editar Rechazo" : "Registrar Rechazo";

  useEffect(() => {
    if (isOpen && rejectionToEdit) {
      setEditData(rejectionToEdit);
    }
  }, [isOpen, rejectionToEdit, setEditData]);

  useEffect(() => {
    if (!isOpen) setStep(1);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (folio !== null) {
        handleChange("folio", folio);
      }
      if (user?.unique_name) {
        handleChange("inspector", user.unique_name);
      }
    }
  }, [isOpen, folio, user, handleChange]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
    bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
    >
      <div
        className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl 
      overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95"
      >
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
              {modalTitle}
            </h2>
            <div className="flex gap-2 mt-2">
              <div
                className={`h-1.5 w-8 rounded-full transition-all ${step >= 1 ? "bg-blue-600" : "bg-gray-100"}`}
              />
              <div
                className={`h-1.5 w-8 rounded-full transition-all ${step >= 2 ? "bg-blue-600" : "bg-gray-100"}`}
              />
              <div
                className={`h-1.5 w-8 rounded-full transition-all ${step >= 3 ? "bg-blue-600" : "bg-gray-100"}`}
              />
            </div>
          </div>

          {!preventClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors 
              text-gray-400 hover:cursor-pointer"
            >
              <X size={24} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Fecha"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  readOnly
                />
                <Input
                  label="Folio"
                  type="number"
                  value={formData.folio || ""}
                  readOnly
                  disabled={isLoading}
                />
              </div>
              <Input
                label="Inspector"
                value={formData.inspector || ""}
                readOnly
                disabled={isLoading}
              />
              <Input
                label="Número de Parte"
                value={formData.partNumber}
                onChange={(e) => handleChange("partNumber", e.target.value)}
              />

              <Input
                label="Cantidad de piezas inspeccionadas"
                type="number"
                value={formData.numberOfInspectedPieces || ""}
                onChange={(e) =>
                  handleChange("numberOfInspectedPieces", Number(e.target.value))
                }
              />

              <Input
                label="Cantidad de piezas rechazadas"
                type="number"
                value={formData.numberOfPieces || ""}
                onChange={(e) =>
                  handleChange("numberOfPieces", Number(e.target.value))}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <FloatingSelect
                label="Defecto"
                options={defectRejections}
                value={formData.idDefect}
                onChange={(val) => handleChange("idDefect", Number(val))}
              />
              <FloatingSelect
                label="Condición"
                options={conditionOptions}
                value={formData.idCondition}
                onChange={(val) => handleChange("idCondition", val)}
              />
              <FloatingSelect
                label="Línea"
                options={linesOptions}
                value={formData.idLine}
                onChange={(val) => handleChange("idLine", val)}
              />
              <FloatingSelect
                label="Cliente"
                options={clientsOptions}
                value={formData.idClient}
                onChange={(val) => handleChange("idClient", val)}
              />
              <Input
                label="Nómina del operador"
                type="number"
                value={formData.operatorPayRoll}
                onChange={(e) =>
                  handleChange("operatorPayRoll", e.target.value)
                }
              />
              <FloatingSelect
                label="Acción de contención"
                options={containmentActionsOptions}
                value={formData.idContainmentAction}
                onChange={(val) => handleChange("idContainmentAction", val)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <Textarea
                label="Descripción detallada del rechazo"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              <ImageUploader
                onImagesChange={(files) => handleChange("photos", files)}
                existingImages={existingPhotos}
              />
              <SignaturePad
                onSave={(file) => handleChange("signature", file)}
                existingSignature={existingSignature}
              />
            </div>
          )}
        </div>

        <div className="p-8 bg-gray-50 flex justify-between gap-4">
          <button
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 px-6 py-3 font-bold text-gray-400 
            hover:text-gray-600 disabled:opacity-0 transition-all hover:cursor-pointer"
          >
            <ChevronLeft size={20} /> Anterior
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white 
              rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg 
              shadow-gray-200 hover:cursor-pointer"
            >
              Siguiente <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-10 py-3 bg-blue-600 
              text-white rounded-2xl font-black hover:bg-blue-700 transition-all 
              shadow-lg shadow-blue-200 uppercase tracking-widest hover:cursor-pointer"
            >
              {loading ? "Guardando..." : "Finalizar Registro"}{" "}
              <Save size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
