import { useCallback, useState, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { rejectionService } from "../api/services/RejectionService";
import type { RejectionResponse } from "../types/types";

interface RejectionFormState {
  inspector: string;
  partNumber: string;
  numberOfPieces: number;
  numberOfInspectedPieces: number;
  idDefect: number;
  idCondition: number;
  description: string;
  idLine: number;
  idClient: number;
  operatorPayRoll: string;
  idContainmentAction: number;
  folio: number;
  photos: File[];
  signature: File | null;
}

const initialFormData: RejectionFormState = {
  inspector: "",
  partNumber: "",
  numberOfPieces: 0,
  numberOfInspectedPieces: 0,
  idDefect: 0,
  idCondition: 0,
  description: "",
  idLine: 0,
  idClient: 0,
  operatorPayRoll: "",
  idContainmentAction: 0,
  folio: 0,
  photos: [],
  signature: null,
};

export const useRejectionForm = (
  onSuccess?: (rejectionId?: number) => void,
) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RejectionFormState>(initialFormData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [rejectionId, setRejectionId] = useState<number | null>(null);

  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
  const [existingSignature, setExistingSignature] = useState<string | null>(
    null,
  );

  const handleChange = useCallback(
    (field: keyof RejectionFormState, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (!formData.partNumber) errors.push("Número de parte es requerido");
    if (formData.numberOfPieces <= 0)
      errors.push("La cantidad debe ser mayor a 0");
    if (formData.idDefect === 0) errors.push("Seleccione un defecto");
    if (formData.idLine === 0) errors.push("Seleccione una línea");
    if (!formData.signature && !existingSignature) {
      errors.push("La firma es obligatoria");
    }

    if (errors.length > 0) {
      toast.error(errors[0]);
      return false;
    }
    return true;
  };

  const setEditData = useCallback((rejection: RejectionResponse) => {
    setIsEditMode(true);
    setRejectionId(rejection.id);

    const urls = rejection.image?.split(";").filter((img) => img) || [];
    setExistingPhotos(urls);
    setExistingSignature(rejection.informedSignature);

    setFormData({
      inspector: rejection.inspector,
      partNumber: rejection.partNumber,
      numberOfPieces: rejection.numberOfPieces,
      numberOfInspectedPieces: rejection.numberOfInspectedPieces,
      idDefect: rejection.idDefect,
      idCondition: rejection.idCondition,
      description: rejection.description || "",
      idLine: rejection.idLine,
      idClient: rejection.idClient,
      operatorPayRoll: rejection.operatorPayroll?.toString() || "",
      idContainmentAction: rejection.idContainmentAction,
      folio: rejection.folio,
      photos: [],
      signature: null,
    });
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const loadingToast = toast.loading(
      isEditMode ? "Actualizando..." : "Guardando...",
    );

    try {
      const data = new FormData();
      const photoKey = isEditMode ? "NewPhotos" : "Photos";

      data.append("Inspector", formData.inspector);
      data.append("PartNumber", formData.partNumber);
      data.append("numberOfInspectedPieces", formData.numberOfInspectedPieces.toString());
      data.append("NumberOfPieces", formData.numberOfPieces.toString());
      data.append("IdDefect", formData.idDefect.toString());
      data.append("IdCondition", formData.idCondition.toString());
      data.append("Description", formData.description || "");
      data.append("IdLine", formData.idLine.toString());
      data.append("IdClient", formData.idClient.toString());
      data.append("OperatorPayroll", formData.operatorPayRoll);
      data.append(
        "IdContainmentAction",
        formData.idContainmentAction.toString(),
      );
      data.append("Folio", formData.folio.toString());

      if (isEditMode && rejectionId) {
        data.append("Id", rejectionId.toString());
        if (existingPhotos.length > 0) {
          data.append("ExistingImageUrls", existingPhotos.join(";"));
        }
      }

      formData.photos.forEach((file) => {
        data.append(photoKey, file);
      });

      if (formData.signature) {
        const signatureFile = new File([formData.signature], "signature.png", {
          type: "image/png",
        });
        data.append(photoKey, signatureFile);
      }

      let serverResponse: any;
      if (isEditMode && rejectionId) {
        serverResponse = await rejectionService.updateRejection(
          rejectionId,
          data,
        );
      } else {
        serverResponse = await rejectionService.createRejection(data);
      }

      const realRdmId =
        serverResponse?.data?.id ??
        serverResponse?.id ??
        serverResponse?.data?.rejectionId ??
        serverResponse?.rejectionId ??
        rejectionId;

      toast.dismiss(loadingToast);
      toast.success(
        isEditMode ? "Actualizado correctamente" : "Registrado exitosamente",
      );

      if (onSuccess) onSuccess(realRdmId);
      resetForm();
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(
        err?.response?.data?.message || "Error al guardar el rechazo",
      );
    }
    {
      setLoading(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setExistingPhotos([]);
    setExistingSignature(null);
    setIsEditMode(false);
  }, []);

  return {
    loading,
    formData,
    handleChange,
    handleSubmit,
    setFormData,
    setEditData,
    isEditMode,
    existingPhotos,
    existingSignature,
    resetForm,
  };
};
