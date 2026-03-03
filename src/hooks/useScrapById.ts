import { useState, useCallback } from "react";
import type { ScrapRead } from "../types/types";
import { scrapService } from "../api/services/ScrapService";
import toast from "react-hot-toast";

export const useScrapById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrapData, setScrapData] = useState<ScrapRead | null>(null);

  const fetchScrap = useCallback(async (id: number) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await scrapService.getScrapById(id);
      setScrapData(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar el detalle del scrap";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearScrap = useCallback(() => {
    setScrapData(null);
  }, []);

  return {
    scrapData,
    loading,
    error,
    fetchScrap,
    clearScrap,
  };
};
