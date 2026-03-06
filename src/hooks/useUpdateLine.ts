import { useState } from "react";
import type { LinesCreate } from "../types/types";
import { linesService } from "../api/services/LinesService";

export const useUpdateLine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateLine = async (data: LinesCreate, id: number) => {
    setLoading(true);
    setError(null);
    try {
      await linesService.update(data, id);
      return true;
    } catch (err: any) {
      setError(err.message || "Error al actualizar la línea");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateLine, loading, error };
};
