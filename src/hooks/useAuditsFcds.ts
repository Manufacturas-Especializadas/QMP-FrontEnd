import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import type {
  AuditFcdsList,
  AvailableMonth,
  CreateAuditFcds,
  DetailedAuditFcds,
  PaginationInfo,
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
  const [availableMonths, setAvailableMonths] = useState<AvailableMonth[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    totalConforming: 0,
    totalNonConforming: 0,
  });

  const fetchAudits = useCallback(async (pageNumber = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await auditsFcdsService.getAuditsFcds(pageNumber, pageSize);
      setAudits(response.items || []); 
      setPaginationInfo({
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 1,
        currentPage: response.currentPage || 1,
        pageSize: response.pageSize || 10,
        totalConforming: response.totalConforming || 0,
        totalNonConforming: response.totalNonConforming || 0,
      });
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

  const fetchAvailableMonths = useCallback(async () => {
    try {
      const response = await auditsFcdsService.availableMonths();
      setAvailableMonths(response);
    } catch (error: any) {
      console.error("No se pudieron cargar los meses con registros", error);
    }
  }, []);

  const exportAuditsToExcel = async (
    year: number,
    month: number,
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await auditsFcdsService.exportToExcel(year, month);

      toast.success("Reporte de Excel descargado con éxito");
      return true;
    } catch (error: any) {
      toast.error(
        "No existen registros de auditorías en el mes seleccionado o hubo un error en el servidor.",
      );
      return false;
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
    availableMonths,
    loading,
    isSaving,
    fetchAudits,
    fetchAuditById,
    fetchAvailableMonths,
    exportAuditsToExcel,
    createAudit,
    updateAudit,
    deleteAudit,
    paginationInfo,
  };
};
