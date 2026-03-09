import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usersService } from "../api/services/UsersService";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (employeeNumber: string) => {
    if (!employeeNumber.trim()) {
      toast.error("Por favor, ingresa tu número de nómina");

      return;
    }

    setLoading(true);

    try {
      const response: any = await usersService.login({
        employeeNumber,
        password: employeeNumber,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", response.username);

      toast.success(`Bienvenido, ${response.username}`);

      navigate("/");
    } catch (err: any) {
      const msg = err.response?.data || "Credenciales incorrectas";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading };
};
