import { useState } from "react";
import type { LineRead } from "../types/types";
import { linesService } from "../api/services/LinesService";

export const useLineById = () => {
  const [lineById, setLineById] = useState<LineRead | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getById = async (id: number) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await linesService.getLineById(id);
      setLineById(data);
      return data;
    } catch (err: any) {
      const message =
        err.message || "No se pudo obtener la información de la línea";
      setError(message);
      setLineById(null);
    } finally {
      setLoading(false);
    }
  };

  const clearLine = () => setLineById(null);

  return {
    lineById,
    getById,
    loading,
    error,
    clearLine,
  };
};
