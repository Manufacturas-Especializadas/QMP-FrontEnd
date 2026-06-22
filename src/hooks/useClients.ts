import { useCallback, useEffect, useState } from "react";
import type { Clients } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

interface UseClientsOptions {
  isPaged?: boolean;
  pageSize?: number;
}

export const useClients = (options: UseClientsOptions = {}) => {
  const { isPaged = false, pageSize = 10 } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allClients, setAllClients] = useState<Clients[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const getClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogsService.getClients();
      setAllClients(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar las líneas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getClients();
  }, [getClients]);

  const totalPages = Math.ceil(allClients.length / pageSize) || 1;

  const pagedClients = isPaged
    ? allClients.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : allClients;

  return {
    clients: pagedClients,
    loading,
    error,
    currentPage,
    totalPages,
    refresh: getClients,
    goToPage: (page: number) => setCurrentPage(page),
  };
};
