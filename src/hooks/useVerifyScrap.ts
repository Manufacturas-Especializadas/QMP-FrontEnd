import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { scrapService } from "../api/services/ScrapService";

export const useVerifyScrap = (onSuccess?: () => void) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const verify = useCallback(
    async (
      id: number,
      isVerified: boolean,
      verifiedWeight: number | null,
      comments: string,
    ) => {
      setIsVerifying(true);

      const loadingToast = toast.loading(
        "Actualizando verificación...",
      );

      try {
        await scrapService.verifyScrap({
          id,
          isVerified,

          // Si el peso es correcto, el backend utilizará TotalWeight.
          verifiedWeight: isVerified
            ? null
            : verifiedWeight,

          // Evitamos mandar "" a SQL.
          comments: comments.trim() || null,
        });

        toast.dismiss(loadingToast);

        toast.success(
          "Auditoría guardada correctamente",
        );

        if (onSuccess) {
          onSuccess();
        }
      } catch (err: any) {
        toast.dismiss(loadingToast);

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Error al verificar el registro";

        toast.error(message);
      } finally {
        setIsVerifying(false);
      }
    },
    [onSuccess],
  );

  return {
    verify,
    isVerifying,
  };
};