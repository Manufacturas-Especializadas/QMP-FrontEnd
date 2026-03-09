import { useState } from "react";
import type { ClientRead } from "../types/types";
import { clientsService } from "../api/services/ClientsService";

export const useClientById = () => {
  const [clientById, setClientById] = useState<ClientRead | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getById = async (id: number) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await clientsService.getClientById(id);
      setClientById(data);
      return data;
    } catch (err: any) {
      const message =
        err.message || "No se pudo obtener la información de la línea";
      setError(message);
      setClientById(null);
    } finally {
      setLoading(false);
    }
  };

  const clearLine = () => setClientById(null);

  return {
    clientById,
    getById,
    loading,
    error,
    clearLine,
  };
};
