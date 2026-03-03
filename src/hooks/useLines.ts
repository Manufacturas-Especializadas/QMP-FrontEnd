import { useCallback, useEffect, useState } from "react";
import type { Lines } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useLines = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<Lines[]>([]);

  const getLines = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await catalogsService.getLines();
      setLines(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar las lineas";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLines();
  }, []);

  return {
    lines,
    loading,
    error,
    refresh: getLines,
  };
};
