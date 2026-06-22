import { useCallback, useEffect, useState } from "react";
import type { Roles } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

interface UseRolesOptions {
  isPaged?: boolean;
  pageSize?: number;
}

export const useRoles = (options: UseRolesOptions = {}) => {
  const { isPaged = false, pageSize = 10 } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allRoles, setAllRoles] = useState<Roles[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const getRoles = useCallback(async () => {
    setLoading(true);

    setError(null);

    try {
      const data = await catalogsService.getRoles();
      setAllRoles(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar los roles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const totalPages = Math.ceil(allRoles.length / pageSize) || 1;

  const pagedRoles = isPaged
    ? allRoles.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : allRoles;

  return {
    roles: pagedRoles,
    loading,
    error,
    currentPage,
    totalPages,
    refresh: getRoles,
    goToPage: (page: number) => setCurrentPage(page),
  };
};
