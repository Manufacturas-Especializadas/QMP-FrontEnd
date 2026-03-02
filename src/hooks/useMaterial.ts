import { useCallback, useEffect, useState } from "react";
import type { Material } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useMaterial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [material, setMaterial] = useState<Material[]>([]);

  const getMaterial = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await catalogsService.getMaterial();
      setMaterial(data);
    } catch (err: any) {
      const message = err.message || "Error al cargar las lineas";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMaterial();
  }, []);

  return {
    material,
    loading,
    error,
    refresh: getMaterial,
  };
};
