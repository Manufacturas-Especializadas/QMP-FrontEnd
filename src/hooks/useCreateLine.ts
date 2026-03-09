import { useState } from "react";
import type { LinesCreate } from "../types/types";
import { linesService } from "../api/services/LinesService";

export const useCreateLine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createLine = async (data: LinesCreate) => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await linesService.create(data);
      setIsSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.message || "Error al crear la línea");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createLine, loading, error, isSuccess };
};
