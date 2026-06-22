import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { auditsScrapService } from "../api/services/AuditsScrapService";
import type {
  AuditScrapList,
  DetailedAuditScrap,
  CreateAuditScrapPayload,
  UpdateAuditScrapPayload,
  AvailableMonth,
} from "../types/types";

export const useAuditsScrap = () => {
  const [audits, setAudits] = useState<AuditScrapList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [availableMonths, setAvailableMonths] = useState<AvailableMonth[]>([]);

  const fetchAudits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await auditsScrapService.getAuditsScrap();
      setAudits(response);
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "No se pudo cargar el historial de auditorías de Scrap.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuditById = async (
    id: number,
  ): Promise<DetailedAuditScrap | null> => {
    setLoading(true);
    try {
      const response = await auditsScrapService.getById(id);
      return response;
    } catch (error: any) {
      toast.error(
        "No se pudo recuperar la información detallada de la auditoría.",
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableMonths = useCallback(async () => {
    try {
      const res = await auditsScrapService.getAvaliableMonth();
      setAvailableMonths(res);
    } catch (error) {
      console.error("Error cargando cierres mensuales de scrap", error);
    }
  }, []);

  const exportAuditsToExcel = async (
    year: number,
    month: number,
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await auditsScrapService.exportToExcel(year, month);
      toast.success("Reporte de Excel descargado con éxito");
      return true;
    } catch (error) {
      toast.error("Hubo un error al generar el archivo consolidado.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createAudit = async (
    data: CreateAuditScrapPayload,
  ): Promise<boolean> => {
    setIsSaving(true);
    try {
      await auditsScrapService.create(data);
      toast.success("¡Auditoría de Scrap registrada con éxito en la nube!");
      await fetchAudits();
      return true;
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Error al guardar el registro de scrap.";
      toast.error(msg);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateAudit = async (
    id: number,
    data: UpdateAuditScrapPayload,
  ): Promise<boolean> => {
    setIsSaving(true);
    try {
      await auditsScrapService.update(id, data);
      toast.success("Auditoría de scrap actualizada y sincronizada.");
      await fetchAudits();
      return true;
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Error al actualizar los hallazgos de la auditoría.";
      toast.error(msg);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteAudit = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      await auditsScrapService.delete(id);
      toast.success("Registro y evidencias purgadas correctamente de Azure.");
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
    fetchAvailableMonths,
    exportAuditsToExcel,
    availableMonths,
    createAudit,
    updateAudit,
    deleteAudit,
  };
};
