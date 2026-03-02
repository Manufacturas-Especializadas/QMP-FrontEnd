import { useEffect, useState } from "react";
import type { MachineCodes } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useMachineCodesByProcess = (processId: number | null) => {
  const [machineCodes, setMachineCodes] = useState<MachineCodes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProcesses = async () => {
      if (!processId) {
        setMachineCodes([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await catalogsService.getMachineCodesByProcess(processId);
        setMachineCodes(data);
      } catch (error) {
        console.error("Error al cargar procesos:", error);
        setMachineCodes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProcesses();
  }, [processId]);

  return { machineCodes, isLoading };
};
