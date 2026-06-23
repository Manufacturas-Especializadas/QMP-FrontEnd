import { useEffect, useState } from "react";
import type { AuditsPoints } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";
import toast from "react-hot-toast";

export const useAuditEndPoints = () => {
  const [endPoints, setEndPoints] = useState<AuditsPoints[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAuditsEndPoints = async () => {
    setLoading(true);

    try {
      const data = await catalogsService.getAuditsEndPoints();
      setEndPoints(data);
    } catch (error: any) {
      console.error("Error al obtener los datos", error);
      toast.error("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditsEndPoints();
  }, []);

  return {
    endPoints,
    loading,
  };
};
