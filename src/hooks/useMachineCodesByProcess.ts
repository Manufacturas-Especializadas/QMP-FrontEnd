import { useEffect, useState } from "react";
import type { MachineCodes } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useMachineCodesByProcess = (processId: number | null) => {
  const [machineCodes, setMachineCodes] = useState<MachineCodes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCodes = async () => {
      if (!processId) {
        setMachineCodes([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await catalogsService.getMachineCodesByProcess(processId);
        setMachineCodes(data);
      } catch (error: any) {
        if (error.message?.includes("404") || error.response?.status === 404) {
          setMachineCodes([]);
        } else {
          console.error("Error al cargar códigos de máquina:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCodes();
  }, [processId]);

  return { machineCodes, isLoading };
};
