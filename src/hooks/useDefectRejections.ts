import { useState, useCallback, useEffect } from "react";
import { catalogsService } from "../api/services/CatalogsService";
import type { DefectsRejections } from "../types/types";

interface UseDefectRejectionsOptions {
  isPaged?: boolean;
  pageSize?: number;
}

export const useDefectRejections = (
  options: UseDefectRejectionsOptions = {},
) => {
  const { isPaged = false, pageSize = 10 } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allDefectRejections, setAllDefectRejections] = useState<
    DefectsRejections[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);

  const getDefectRejections = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogsService.getDefetcsRejections();
      setAllDefectRejections(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar las líneas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDefectRejections();
  }, [getDefectRejections]);

  const totalPages = Math.ceil(allDefectRejections.length / pageSize) || 1;

  const pagedDefectRejections = isPaged
    ? allDefectRejections.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      )
    : allDefectRejections;

  return {
    defects: pagedDefectRejections,
    loading,
    error,
    currentPage,
    totalPages,
    refresh: getDefectRejections,
    goToPage: (page: number) => setCurrentPage(page),
  };
};
