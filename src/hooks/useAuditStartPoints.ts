import { useEffect, useState } from "react";
import type { AuditsPoints } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";
import toast from "react-hot-toast";

export const useAuditStartPoints = () => {
  const [startPoints, setStartPoints] = useState<AuditsPoints[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAuditsStartPoints = async () => {
    setLoading(true);

    try {
      const data = await catalogsService.getAuditsStartPoints();
      setStartPoints(data);
    } catch (error: any) {
      console.error("Error al obtener los datos", error);
      toast.error("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditsStartPoints();
  }, []);

  return {
    startPoints,
    loading,
  };
};
