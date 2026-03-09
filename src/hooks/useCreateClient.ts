import { useState } from "react";
import type { ClientCreate } from "../types/types";
import { clientsService } from "../api/services/ClientsService";

export const useCreateClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createClient = async (data: ClientCreate) => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await clientsService.create(data);
      setIsSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.message || "Error al crear el cliente");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createClient, loading, error, isSuccess };
};
