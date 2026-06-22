import { useEffect, useState } from "react";
import type { TypeMeasuringEquipment } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";
import toast from "react-hot-toast";

export const useTypeMeasuringEquipment = () => {
  const [equipment, setEquipment] = useState<TypeMeasuringEquipment[]>([]);
  const [loadingEquipment, setLoadingEquipment] = useState<boolean>(false);

  const loadEquipment = async () => {
    setLoadingEquipment(true);

    try {
      const data = await catalogsService.getTypeMeasuringEquipment();
      setEquipment(data);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Error al cargar el equipo";
      toast.error(msg);
    } finally {
      setLoadingEquipment(false);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  return {
    equipment,
    loadingEquipment,
  };
};
