import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { scrapService } from "../api/services/ScrapService";

export const useScrapReports = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadReportByMonth = useCallback(
    async (month: number, year: number, monthName: string) => {
      setIsDownloading(true);
      const loadingToast = toast.loading(
        `Generando reporte de ${monthName}...`,
      );

      try {
        await scrapService.getReports(month, year);
        toast.dismiss(loadingToast);
        toast.success(`Reporte de ${monthName} descargado`);
      } catch (error: any) {
        toast.dismiss(loadingToast);
        toast.error("Error al generar el reporte histórico");
      } finally {
        setIsDownloading(false);
      }
    },
    [],
  );

  return {
    downloadReportByMonth,
    isDownloading,
  };
};
