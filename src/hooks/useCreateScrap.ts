import { useCallback, useState } from "react";
import type { Scrap } from "../types/types";
import toast from "react-hot-toast";
import { scrapService } from "../api/services/ScrapService";

export interface ScrapFormState extends Scrap {
  lineId: number;
  processId: number;
  typeScrapId: number;
  lineName: string;
  processName?: string;
  defectName?: string;
}

interface useScrapFormReturn {
  loading: boolean;
  error: string | null;
  formData: ScrapFormState;
  setFormData: React.Dispatch<React.SetStateAction<ScrapFormState>>;
  handleChange: (
    field: keyof ScrapFormState,
    value: string | number | null,
  ) => void;
  handleLineClick: (id: number, name: string) => void;
  handleSubmit: (reports: ScrapFormState[]) => Promise<void>;
  resetForm: () => void;
  resetPartial: () => void;
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
  
  const resetForm = useCallback(() => {
    setFormData(initalFormData);
    setError(null);
  }, []);

  const resetPartial = useCallback(() => {
    setFormData((prev) => ({
      ...initalFormData,
      shiftId: prev.shiftId,
      lineId: prev.lineId,
      lineName: prev.lineName,
    }));
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (reports: ScrapFormState[]) => {
      if (reports.length === 0) return;

      setLoading(true);
      setError(null);

      const loadingToast = toast.loading("Guardando registros de scrap...");

      try {
        await Promise.all(
          reports.map((report) => {
            const payload: Scrap = {
              payRollNumber: Number(report.payRollNumber),
              alloy: report.alloy || "",
              diameter: report.diameter || "",
              wall: report.wall || "",
              rdm: report.rdm,
              shiftId: report.shiftId,
              processId: report.processId,
              lineId: report.lineId,
              materialId: report.materialId,
              typeScrapId: report.typeScrapId,
              machineCodeId: report.machineCodeId === 0 ? null : report.machineCodeId,
              defectId: report.defectId,
              weight: Number(report.weight),
            };
            return scrapService.createScrap(payload);
          })
        );

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
    [onSucess, resetForm],
  );

  return {
    loading,
    error,
    formData,
    setFormData,
    handleChange,
    handleLineClick,
    handleSubmit,
    resetForm,
    resetPartial,
  };
};
