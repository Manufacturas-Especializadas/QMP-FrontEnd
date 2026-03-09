import { useState } from "react";
import type { UserRegister } from "../types/types";
import toast from "react-hot-toast";
import { usersService } from "../api/services/UsersService";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (data: UserRegister) => {
    if (!data.employeeNumber.trim()) {
      const msg = "El número de nómina es obligatorio";
      setError(msg);
      toast.error(msg);
      return false;
    }

    if (!/^\d+$/.test(data.employeeNumber)) {
      const msg = "La nómina debe contener solo números";
      setError(msg);
      toast.error(msg);
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await usersService.register(data);
      toast.success("Usuario registrado");

      return true;
    } catch (err: any) {
      const errorMessage =
        err.response?.data || err.message || "Error al registrar usuario";
      setError(errorMessage);
      toast.error(errorMessage);

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    error,
  };
};
