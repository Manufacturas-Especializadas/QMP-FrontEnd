import { useCallback, useEffect, useState } from "react";
import type { Shifts } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useShifts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shifts, setShifts] = useState<Shifts[]>([]);

  const getShifts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await catalogsService.getShifts();
      setShifts(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar los turnos";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getShifts();
  }, [getShifts]);

  return {
    shifts,
    loading,
    error,
    refresh: getShifts,
  };
};
