import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { machinesCodesService } from "../api/services/MachinesCodesService";
import type { MachineCode, MachineCodeUpdate } from "../types/types";

export const useMachineCodes = () => {
  const [machineCodes, setMachineCodes] = useState<MachineCode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getErrorMessage = (err: any, defaultMsg: string) => {
    return err.customMessage || err.message || defaultMsg;
  };

  const fetchMachineCodes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await machinesCodesService.getAll();
      setMachineCodes(data);
    } catch (err: any) {
      toast.error(
        getErrorMessage(err, "Error al cargar los códigos de máquina"),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createMachineCodes = async (processId: number, codes: string[]) => {
    setLoading(true);
    try {
      await Promise.all(
        codes.map((code) =>
          machinesCodesService.create({ processId, machineCodeName: code }),
        ),
      );
      toast.success(
        codes.length > 1
          ? `${codes.length} códigos creados con éxito`
          : "Código creado con éxito",
      );
      await fetchMachineCodes();
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Error al crear los códigos"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateMachineCode = async (id: number, data: MachineCodeUpdate) => {
    setLoading(true);
    try {
      await machinesCodesService.update(id, data);
      toast.success("Código actualizado con éxito");
      await fetchMachineCodes();
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Error al actualizar el código"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteMachineCode = async (id: number) => {
    setLoading(true);
    try {
      await machinesCodesService.delete(id);
      toast.success("Código eliminado con éxito");
      await fetchMachineCodes();
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Error al eliminar el código"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    machineCodes,
    loading,
    fetchMachineCodes,
    createMachineCodes,
    updateMachineCode,
    deleteMachineCode,
  };
};
