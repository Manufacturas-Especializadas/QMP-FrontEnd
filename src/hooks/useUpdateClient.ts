import { useState } from "react";
import type { ClientCreate } from "../types/types";
import { clientsService } from "../api/services/ClientsService";

export const useUpdateClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateClient = async (data: ClientCreate, id: number) => {
    setLoading(true);
    setError(null);
    try {
      await clientsService.update(data, id);
      return true;
    } catch (err: any) {
      setError(err.message || "Error al actualizar la línea");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateClient, loading, error };
};
