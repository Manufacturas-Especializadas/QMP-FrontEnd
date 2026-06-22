import { useState } from "react";
import { scrapService } from "../api/services/ScrapService";
import toast from "react-hot-toast";

export const useDeleteScrap = () => {
  const [loading, setLoading] = useState(false);

  const deleteScrap = async (id: number) => {
    setLoading(true);
    try {
      await scrapService.deleteScrap(id);
      return true;
    } catch (error) {
      toast.error("Error al eliminar");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteScrap, loading };
};
