import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import type {
  AuditFcdsList,
  CreateAuditFcds,
  DetailedAuditFcds,
} from "../types/types";
import { auditsFcdsService } from "../api/services/AuditsFcdsService";

export interface AuditFcdsListDto {
  id: number;
  auditDate: string;
  inspectorName: string;
  processName: string;
  partNumber: string;
  linesSummary: string;
  isProductConforming: boolean;
  folioRDM: number | null;
}

export const useAuditsFcds = () => {
  const [audits, setAudits] = useState<AuditFcdsList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const fetchAudits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await auditsFcdsService.getAuditsFcds();
      setAudits(response);
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "No se pudo cargar el historial de auditorías.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuditById = async (
    id: number,
  ): Promise<DetailedAuditFcds | null> => {
    setLoading(true);
    try {
      const response = await auditsFcdsService.getById(id);
      return response;
    } catch (error: any) {
      toast.error("No se pudo recuperar la información de la auditoría");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createAudit = async (data: CreateAuditFcds): Promise<boolean> => {
    setIsSaving(true);
    try {
      await auditsFcdsService.create(data);
      toast.success("¡Auditoría FCD registrada con éxito!");
      await fetchAudits();
      return true;
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Error al guardar la auditoría.";
      toast.error(msg, { duration: 5000 });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateAudit = async (
    id: number,
    data: Partial<CreateAuditFcds>,
  ): Promise<boolean> => {
    setIsSaving(true);
    try {
      await auditsFcdsService.update(id, data);
      toast.success("Auditoría actualizada correctamente (Mock)");
      await fetchAudits();
      return true;
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Error al actualizar la auditoría.";
      toast.error(msg);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteAudit = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      await auditsFcdsService.delete(id);
      toast.success("Registro de auditoría eliminado (Mock)");
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
