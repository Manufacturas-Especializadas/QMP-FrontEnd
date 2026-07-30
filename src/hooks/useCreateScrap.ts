import { useCallback, useState } from "react";
import type { Scrap, CreateScrapPayload, ScrapDetailPayload } from "../types/types";
import toast from "react-hot-toast";
import { scrapService } from "../api/services/ScrapService";
import { useAuth } from "../context/AuthContext";

export interface ScrapFormState extends Scrap {
  lineId: number;
  processId: number;
  typeScrapId: number;
  lineName: string;
  processName?: string;
  defectName?: string;
  partNumber?: string; 
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
  const { user } = useAuth();

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
        const inspectorPayRollNumber = user?.unique_name ? Number(user.unique_name) : 0;

        if (!inspectorPayRollNumber) {
          throw new Error("No se pudo identificar al inspector (sesión inválida).");
        }

        const shiftId = reports[0].shiftId;
        const lineId = reports[0].lineId;

        const scrapDetails: ScrapDetailPayload[] = reports.map((report) => ({
          payRollNumber: Number(report.payRollNumber),
          processId: report.processId,
          machineCodeId: report.machineCodeId === 0 ? null : report.machineCodeId,
          alloy: report.alloy || "",
          diameter: report.diameter || "",
          wall: report.wall || "",
          rdm: report.rdm,
          weight: Number(report.weight),
          materialId: report.materialId,
          typeScrapId: report.typeScrapId,
          defectId: report.defectId,
        }));

        const payload: CreateScrapPayload = {
          inspectorPayRollNumber,
          shiftId,
          lineId,
          scrapDetails,
        };

        await scrapService.createScrap(payload);

        toast.dismiss(loadingToast);
        toast.success("Scrap registrado exitosamente");

        if (onSucess) onSucess();

        resetForm();
      } catch (err: any) {
        toast.dismiss(loadingToast);
        const message =
          err?.response?.data?.message || err.message || "Error al guardar el scrap";
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