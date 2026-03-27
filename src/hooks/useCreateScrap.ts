import { useCallback, useState, type SyntheticEvent } from "react";
import type { Scrap } from "../types/types";
import toast from "react-hot-toast";
import { scrapService } from "../api/services/ScrapService";

interface useScrapFormReturn {
  loading: boolean;
  error: string | null;
  formData: ScrapFormState;
  handleChange: (
    field: keyof ScrapFormState,
    value: string | number | null,
  ) => void;
  handleLineClick: (id: number, name: string) => void;
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
}

interface ScrapFormState extends Scrap {
  lineId: number;
  processId: number;
  typeScrapId: number;
  lineName: string;
}

const initalFormData: ScrapFormState = {
  payRollNumber: 0,
  alloy: "",
  diameter: "",
  wall: "",
  rdm: "",
  shiftId: 0,
  processId: 0,
  lineId: 0,
  materialId: 0,
  typeScrapId: 0,
  machineCodeId: 0,
  defectId: 0,
  weight: 0,
  lineName: "",
};

export const useScrapForm = (onSucess?: () => void): useScrapFormReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ScrapFormState>(initalFormData);

  const handleChange = useCallback(
    (field: keyof ScrapFormState, value: string | number | null) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      if (error) setError(null);
    },
    [error],
  );

  const handleLineClick = useCallback((id: number, name: string) => {
    setFormData((prev) => ({
      ...prev,
      lineId: id,
      lineName: name,
      processId: 0,
      machineCodeId: 0,
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: string[] = [];

    if (formData.shiftId === 0) errors.push("El turno es requerido");
    if (formData.lineId === 0) errors.push("La línea es requerida");
    if (formData.processId === 0) errors.push("El proceso es requerido");
    // if (formData.machineCodeId === 0)
    //   errors.push("El código de máquina es requerido");
    if (formData.payRollNumber <= 0) errors.push("Número de nómina inválido");
    if (formData.materialId === 0) errors.push("El material es requerido");
    if (formData.typeScrapId === 0)
      errors.push("El tipo de scrap es requerido");
    if (formData.defectId === 0) errors.push("El defecto es requerido");
    if (formData.weight <= 0) errors.push("El peso debe ser mayor a 0");
    // if (!formData.rdm.trim()) errors.push("El RDM es requerido");

    if (errors.length > 0) {
      toast.error(errors[0]);
      return false;
    }

    return true;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initalFormData);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) return;

      setLoading(true);
      setError(null);

      const loadingToast = toast.loading("Guardando registro de scrap...");

      try {
        const payload: Scrap = {
          payRollNumber: Number(formData.payRollNumber),
          alloy: formData.alloy || "",
          diameter: formData.diameter || "",
          wall: formData.wall || "",
          rdm: formData.rdm,
          shiftId: formData.shiftId,
          processId: formData.processId,
          lineId: formData.lineId,
          materialId: formData.materialId,
          typeScrapId: formData.typeScrapId,
          machineCodeId:
            formData.machineCodeId === 0 ? null : formData.machineCodeId,
          defectId: formData.defectId,
          weight: Number(formData.weight),
        };

        await scrapService.createScrap(payload);

        toast.dismiss(loadingToast);
        toast.success("Scrap registrado exitosamente");

        if (onSucess) onSucess();

        resetForm();
      } catch (err: any) {
        toast.dismiss(loadingToast);
        const message =
          err?.response?.data?.message || "Error al guardar el scrap";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [formData, validateForm, onSucess, resetForm],
  );

  return {
    loading,
    error,
    formData,
    handleChange,
    handleLineClick,
    handleSubmit,
    resetForm,
  };
};
