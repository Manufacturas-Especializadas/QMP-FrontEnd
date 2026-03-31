import { useEffect, useState } from "react";
import type { Condition } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useConditionByDefect = (idDefect: number | null) => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchConditions = async () => {
      if (!idDefect) {
        setConditions([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await catalogsService.getConditionByDefect(idDefect);
        setConditions(data);
      } catch (error) {
        console.error("Error al cargar procesos:", error);
        setConditions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConditions();
  }, [idDefect]);

  return {
    conditions,
    isLoading,
  };
};
