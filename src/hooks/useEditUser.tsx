import { useState } from "react";
import type { EditUserPayload } from "../types/types";
import toast from "react-hot-toast";
import { usersService } from "../api/services/UsersService";

export const useEditUser = () => {
  const [loading, setLoading] = useState(false);

  const editUser = async (payload: EditUserPayload) => {
    setLoading(true);

    const loadingToast = toast.loading("Actualizando usuario...");

    try {
      await usersService.update(payload);

      toast.dismiss(loadingToast);
      toast.success("Usuario actualizado correctamente");

      return true;
    } catch (error: any) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message ||
        "Error inesperado al actualizar usuario";

      toast.error(errorMessage, {
        duration: 5000,
      });

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { editUser, loading };
};
