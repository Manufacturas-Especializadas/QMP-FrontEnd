import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { auditsACDService } from "../api/services/AuditsACDService";

export const useAcdReports = () => {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadReportByMonth = useCallback(
        async (month: number, year: number) => {
            setIsDownloading(true);
            const loadingToast = toast.loading(
                `Generando reporte de...`
            );

            try {
                await auditsACDService.exportToExcel(month, year);

                toast.dismiss(loadingToast);
                toast.success(`Reporte descargado`);
            } catch (error: any) {
                toast.dismiss(loadingToast);
                toast.error("Error al generar el reporte ACD");
                console.error(error);
            } finally {
                setIsDownloading(false);
            }
        },
        []
    );

    return {
        downloadReportByMonth,
        isDownloading,
    };
};