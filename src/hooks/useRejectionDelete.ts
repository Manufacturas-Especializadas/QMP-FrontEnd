import { useState } from "react";
import { rejectionService } from "../api/services/RejectionService";
import toast from "react-hot-toast";

export const useRejectionDelete = (onSuccessCallback?: () => void) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteRejection = async (id: number) => {
    try {
      setIsDeleting(true);

      await rejectionService.deleteRejection(id);

      toast.success("Rechazo y evidencias eliminados correctamente");

      if (onSuccessCallback) {
        onSuccessCallback();
      }

      return true;
    } catch (error: any) {
      console.error("Error eliminado rechazo: ", error);
      toast.error(
        error?.response?.data?.message ||
          "Ocurrió un error al eliminar el registro",
      );

      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteRejection, isDeleting };
};
