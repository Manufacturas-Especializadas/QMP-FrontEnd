import { useCallback, useEffect, useState } from "react";
import type { Lines } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

interface UseLinesOptions {
  isPaged?: boolean;
  pageSize?: number;
}

export const useLines = (options: UseLinesOptions = {}) => {
  const { isPaged = false, pageSize = 10 } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allLines, setAllLines] = useState<Lines[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const getLines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await catalogsService.getLines();
      setAllLines(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar las líneas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLines();
  }, [getLines]);

  const totalPages = Math.ceil(allLines.length / pageSize) || 1;

  const pagedLines = isPaged
    ? allLines.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : allLines;

  return {
    lines: pagedLines,
    loading,
    error,
    currentPage,
    totalPages,
    refresh: getLines,
    goToPage: (page: number) => setCurrentPage(page),
  };
};
