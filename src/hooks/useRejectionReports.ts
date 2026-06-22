import { useCallback, useEffect, useState } from "react";
import { rejectionService } from "../api/services/RejectionService";
import toast from "react-hot-toast";

export const useRejectionReports = () => {
  const [months, setMonths] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const fetchMonth = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await rejectionService.getAvailableMonth();
      setMonths(data);
    } catch (error: any) {
      toast.error("Error al obtener los periodos disponibles");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const downloadReport = async (monthYear: string) => {
    setIsDownloading(monthYear);
    const toastId = toast.loading(`Preparando reporte de ${monthYear}...`);

    try {
      await rejectionService.exportByMonth(monthYear);
      toast.success(`Reporte de ${monthYear} descargado`, { id: toastId });
    } catch (err: any) {
      toast.error("Error al generar el archivo Excel", { id: toastId });
    } finally {
      setIsDownloading(null);
    }
  };

  useEffect(() => {
    fetchMonth();
  }, [fetchMonth]);

  return {
    months,
    isLoading,
    isDownloading,
    downloadReport,
    refreshMonths: fetchMonth,
  };
};
