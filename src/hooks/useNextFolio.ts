import { useEffect, useState } from "react";
import { rejectionService } from "../api/services/RejectionService";

export const useNextFolio = (isOpen: boolean) => {
  const [folio, setFolio] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFolio = async () => {
    try {
      setIsLoading(true);
      const nextFolio = await rejectionService.getNextFolio();
      setFolio(nextFolio);
    } catch (error) {
      console.error("Error al obtener el folio: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchFolio();
    }
  }, [isOpen]);

  return {
    folio,
    isLoading,
    refreshFolio: fetchFolio,
  };
};
