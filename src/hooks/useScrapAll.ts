import { useState, useCallback, useEffect } from "react";
import type { ScrapList } from "../types/types";
import { scrapService } from "../api/services/ScrapService";

interface UseScrapOptions {
  isPaged?: boolean;
  pageSize?: number;
}

export const useScrapAll = (options: UseScrapOptions = {}) => {
  const { isPaged = false, pageSize = 10 } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allScrap, setAllScrap] = useState<ScrapList[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const getScrap = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await scrapService.getAllScrap();
      setAllScrap(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar las líneas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getScrap();
  }, [getScrap]);

  const totalPages = Math.ceil(allScrap.length / pageSize) || 1;

  const pagedClients = isPaged
    ? allScrap.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : allScrap;

  return {
    scrap: pagedClients,
    loading,
    error,
    currentPage,
    totalPages,
    refresh: getScrap,
    goToPage: (page: number) => setCurrentPage(page),
  };
};
