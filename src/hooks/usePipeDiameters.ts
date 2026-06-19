import { useEffect, useState } from "react";
import type { PipeDiameters } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";
import toast from "react-hot-toast";

export const usePipeDiameters = () => {
  const [pipeDiameter, setPipeDiameter] = useState<PipeDiameters[]>([]);
  const [loadingPipeDiameter, setLoadingPipeDiameter] =
    useState<boolean>(false);

  const loadPipeDiameter = async () => {
    setLoadingPipeDiameter(true);

    try {
      const data = await catalogsService.getPipeDiameters();
      setPipeDiameter(data);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Error al obtener la lista.";
      toast.error(msg);
      return false;
    } finally {
      setLoadingPipeDiameter(false);
    }
  };

  useEffect(() => {
    loadPipeDiameter();
  }, []);

  return {
    pipeDiameter,
    loadingPipeDiameter,
  };
};
