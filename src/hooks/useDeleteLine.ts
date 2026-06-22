import { useState } from "react";
import toast from "react-hot-toast";
import { linesService } from "../api/services/LinesService";

export const useDeleteLine = () => {
  const [loading, setLoading] = useState(false);

  const deleteLine = async (id: number) => {
    setLoading(true);
    try {
      await linesService.delete(id);
      return true;
    } catch (error) {
      toast.error("Error al eliminar");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteLine, loading };
};
