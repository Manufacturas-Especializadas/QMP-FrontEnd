import { useCallback, useEffect, useState } from "react";
import type { ScrapList } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useScrap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrap, setScrap] = useState<ScrapList[]>([]);

  const getScrap = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await catalogsService.getScrap();
      setScrap(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar las lineas";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getScrap();
  }, []);

  return {
    scrap,
    loading,
    error,
    refresh: getScrap,
  };
};
