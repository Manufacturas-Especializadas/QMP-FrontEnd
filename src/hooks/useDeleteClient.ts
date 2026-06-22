import { useState } from "react";
import { clientsService } from "../api/services/ClientsService";
import toast from "react-hot-toast";

export const useDeleteClient = () => {
  const [loading, setLoading] = useState(false);

  const deleteClient = async (id: number) => {
    setLoading(true);
    try {
      await clientsService.delete(id);
      return true;
    } catch (error) {
      toast.error("Error al eliminar");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteClient, loading };
};
