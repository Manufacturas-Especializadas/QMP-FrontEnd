import { useCallback, useEffect, useState } from "react";
import type { ContainmentActions } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

interface ContainmentActionsOptions {
  isPaged?: boolean;
  pageSize?: number;
}

export const useContainmentActions = (
  options: ContainmentActionsOptions = {},
) => {
  const { isPaged = false, pageSize = 10 } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allContainmentActions, setAllContainmentActions] = useState<
    ContainmentActions[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);

  const getContainmentAction = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogsService.getContainmentActions();
      setAllContainmentActions(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar las acciones");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getContainmentAction();
  }, []);

  const totalPages = Math.ceil(allContainmentActions.length / pageSize) || 1;

  const pagedContainmentActions = isPaged
    ? allContainmentActions.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      )
    : allContainmentActions;

  return {
    actions: pagedContainmentActions,
    loading,
    error,
    currentPage,
    totalPages,
    refresh: getContainmentAction,
    goToPage: (page: number) => setCurrentPage(page),
  };
};
