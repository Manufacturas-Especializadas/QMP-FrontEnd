import { useCallback, useEffect, useState } from "react";
import type { RejectionRead } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useRejections = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rejection, setRejection] = useState<RejectionRead[]>([]);

  const getRejection = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await catalogsService.getRejections();
      setRejection(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar los datos";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRejection();
  }, []);

  return {
    rejection,
    loading,
    error,
    refresh: getRejection,
  };
};
