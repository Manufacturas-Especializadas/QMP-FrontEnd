import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { scrapService } from "../api/services/ScrapService";

export const useScrapReports = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadMonthlyReport = useCallback(async () => {
    setIsDownloading(true);

    const loadingToast = toast.loading("Generando reporte...");

    try {
      await scrapService.getReports();

      toast.dismiss(loadingToast);
      toast.success("Reporte descargado correctamente");
    } catch (err: any) {
      toast.dismiss(loadingToast);
      const message = err.message || "No se pudo generar el reporte";
      toast.error(message);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    downloadMonthlyReport,
    isDownloading,
  };
};
