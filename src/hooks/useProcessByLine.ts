import { useEffect, useState } from "react";
import type { Process } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useProcessByLine = (lineId: number | null) => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProcesses = async () => {
      if (!lineId) {
        setProcesses([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await catalogsService.getProcessByLine(lineId);
        setProcesses(data);
      } catch (error) {
        console.error("Error al cargar procesos:", error);
        setProcesses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProcesses();
  }, [lineId]);

  return { processes, isLoading };
};
