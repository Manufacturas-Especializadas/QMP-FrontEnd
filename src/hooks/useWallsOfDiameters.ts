import { useEffect, useState } from "react";
import type { WallsOfDiameters } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";
import toast from "react-hot-toast";

export const useWallsOfDiameters = () => {
  const [wallsDiameters, setWallsDiameters] = useState<WallsOfDiameters[]>([]);
  const [loadingWallsDiameters, setLoadingWallsDiameters] =
    useState<boolean>(false);

  const loadWallsOfDiameters = async () => {
    setLoadingWallsDiameters(true);

    try {
      const data = await catalogsService.getWallsOfDiameters();
      setWallsDiameters(data);
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Error al cargar las categorias";
      toast.error(msg);
    } finally {
      setLoadingWallsDiameters(false);
    }
  };

  useEffect(() => {
    loadWallsOfDiameters();
  }, []);

  return {
    wallsDiameters,
    loadingWallsDiameters,
  };
};
