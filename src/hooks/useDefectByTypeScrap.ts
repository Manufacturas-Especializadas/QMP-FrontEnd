import { useEffect, useState } from "react";
import type { Defects } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useDefectByTypeScrap = (typeScrapId: number | null) => {
  const [defects, setDefects] = useState<Defects[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDefects = async () => {
      if (!typeScrapId) {
        setDefects([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await catalogsService.getDefectByTypeScrap(typeScrapId);
        setDefects(data);
      } catch (error) {
        console.error("Error al cargar procesos:", error);
        setDefects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDefects();
  }, [typeScrapId]);

  return { defects, isLoading };
};
