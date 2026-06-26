import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { processesService } from "../api/services/ProcessesService";
import type { ProcessData, ProcessCreate, ProcessUpdate } from "../types/types";

export const useProcesses = () => {
  const [processes, setProcesses] = useState<ProcessData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (err: any, defaultMsg: string) => {
    return err.customMessage || err.message || defaultMsg;
  };

  const fetchProcesses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await processesService.getAll();
      setProcesses(data);
    } catch (err: any) {
      const msg = getErrorMessage(err, "Error al cargar los procesos");
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProcess = async (data: ProcessCreate) => {
    setLoading(true);
    setError(null);
    try {
      await processesService.create(data);
      toast.success("Proceso creado con éxito");
      await fetchProcesses();
    } catch (err: any) {
      const msg = getErrorMessage(err, "Error al crear el proceso");
      setError(msg);
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProcess = async (id: number, data: ProcessUpdate) => {
    setLoading(true);
    setError(null);
    try {
      await processesService.update(id, data);
      toast.success("Proceso actualizado con éxito");
      await fetchProcesses();
    } catch (err: any) {
      const msg = getErrorMessage(err, "Error al actualizar el proceso");
      setError(msg);
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProcess = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await processesService.delete(id);
      toast.success("Proceso eliminado con éxito");
      await fetchProcesses();
    } catch (err: any) {
      const msg = getErrorMessage(err, "Error al eliminar el proceso");
      setError(msg);
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    processes,
    loading,
    error,
    fetchProcesses,
    createProcess,
    updateProcess,
    deleteProcess,
  };
};
