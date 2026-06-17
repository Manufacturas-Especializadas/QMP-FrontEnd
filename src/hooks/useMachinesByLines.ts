import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { catalogsService } from "../api/services/CatalogsService";

export interface MachinesByLines {
  id: number;
  name: string;
  lineId: number;
}

export const useMachinesByLines = (lineIds: number[]) => {
  const [machines, setMachines] = useState<MachinesByLines[]>([]);
  const [loadingMachines, setLoadingMachines] = useState<boolean>(false);

  useEffect(() => {
    if (!lineIds || lineIds.length === 0) {
      setMachines([]);
      return;
    }

    const loadMachines = async () => {
      setLoadingMachines(true);
      try {
        const data = await catalogsService.getMachinesByLines(lineIds);
        setMachines(data);
      } catch (error: any) {
        const msg =
          error.response?.data?.message ||
          "Error al cargar las máquinas de las líneas seleccionadas.";
        toast.error(msg);
      } finally {
        setLoadingMachines(false);
      }
    };

    loadMachines();
  }, [lineIds]);
  return { machines, loadingMachines };
};
