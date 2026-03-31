import { useCallback, useState, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { rejectionService } from "../api/services/RejectionService";

interface RejectionFormState {
  inspector: string;
  partNumber: string;
  numberOfPieces: number;
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

export const useRejectionForm = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RejectionFormState>(initialFormData);

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
    if (!formData.signature) errors.push("La firma es obligatoria");

    if (errors.length > 0) {
      toast.error(errors[0]);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const loadingToast = toast.loading("Guardando rechazo...");

    try {
      const data = new FormData();

      data.append("Inspector", formData.inspector);
      data.append("PartNumber", formData.partNumber);
      data.append("NumberOfPieces", formData.numberOfPieces.toString());
      data.append("IdDefect", formData.idDefect.toString());
      data.append("IdCondition", formData.idCondition.toString());
      data.append("Description", formData.description);
      data.append("IdLine", formData.idLine.toString());
      data.append("IdClient", formData.idClient.toString());
      data.append("OperatorPayroll", formData.operatorPayRoll);
      data.append(
        "IdContainmentAction",
        formData.idContainmentAction.toString(),
      );
      data.append("Folio", formData.folio.toString());

      formData.photos.forEach((file) => {
        data.append("Photos", file);
      });

      if (formData.signature) {
        const signatureFile = new File([formData.signature], "signature.png", {
          type: "image/png",
        });
        data.append("Photos", signatureFile);
      }

      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      console.log("IdDefect:", formData.idDefect, typeof formData.idDefect);

      await rejectionService.createRejection(data);

      toast.dismiss(loadingToast);
      toast.success("Rechazo registrado exitosamente");

      if (onSuccess) onSuccess();
      setFormData(initialFormData);
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(
        err?.response?.data?.message || "Error al guardar el rechazo",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formData,
    handleChange,
    handleSubmit,
    setFormData,
  };
};
