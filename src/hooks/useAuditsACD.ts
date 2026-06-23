import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { auditsACDService } from "../api/services/AuditsACDService";
import type {
  AuditACDRead,
  CreateAuditACDPayload,
  UpdateAuditACDPayload,
} from "../types/types";

export const useAuditsACD = () => {
  const [audits, setAudits] = useState<AuditACDRead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const fetchAudits = useCallback(async () => {
    setLoading(true);
    try {
      const data = await auditsACDService.getAll();
      setAudits(data);
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Error al sincronizar el historial de producto terminado.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuditById = async (id: number): Promise<AuditACDRead | null> => {
    setLoading(true);
    try {
      return await auditsACDService.getById(id);
    } catch (error: any) {
      toast.error("No se pudo recuperar la información de la auditoría ACD.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createAudit = async (
    payload: CreateAuditACDPayload,
  ): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await auditsACDService.create(payload);
      toast.success(res.message || "¡Auditoría ACD guardada exitosamente!");
      await fetchAudits();
      return true;
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Error al procesar el alta ACD.";
      toast.error(msg);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateAudit = async (
    id: number,
    payload: UpdateAuditACDPayload,
  ): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await auditsACDService.update(id, payload);
      toast.success(res.message || "Auditoría ACD modificada y sincronizada.");
      await fetchAudits();
      return true;
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Error al aplicar cambios a la auditoría.";
      toast.error(msg);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteAudit = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      await auditsACDService.delete(id);
      toast.success("Registro de producto terminado eliminado correctamente.");
      await fetchAudits();
      return true;
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Error al eliminar la auditoría.";
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    audits,
    loading,
    isSaving,
    fetchAudits,
    fetchAuditById,
    createAudit,
    updateAudit,
    deleteAudit,
  };
};
