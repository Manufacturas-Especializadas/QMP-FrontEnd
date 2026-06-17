import { useEffect, useState } from "react";
import type { CategoryOperators } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";
import toast from "react-hot-toast";

export const useCategoryOperator = () => {
  const [category, setCategory] = useState<CategoryOperators[]>([]);
  const [loadingCategory, setLoadingCategory] = useState<boolean>(false);

  const loadCategorys = async () => {
    setLoadingCategory(true);

    try {
      const data = await catalogsService.getCategorysOperators();
      setCategory(data);
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Error al cargar las categorias";
      toast.error(msg);
    } finally {
      setLoadingCategory(false);
    }
  };

  useEffect(() => {
    loadCategorys();
  }, []);

  return {
    category,
    loadingCategory,
  };
};
