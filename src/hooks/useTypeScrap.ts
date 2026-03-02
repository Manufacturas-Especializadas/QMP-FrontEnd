import { useState, useCallback, useEffect } from "react";
import { catalogsService } from "../api/services/CatalogsService";
import type { TypeScrap } from "../types/types";

export const useTypeScrap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typeScrap, setTypeScrap] = useState<TypeScrap[]>([]);

  const getShifts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await catalogsService.getTypeScrap();
      setTypeScrap(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar las lineas";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getShifts();
  }, []);

  return {
    typeScrap,
    loading,
    error,
    refresh: getShifts,
  };
};
