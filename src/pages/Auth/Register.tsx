import { UserPlus } from "lucide-react";
import { Input } from "../../components/CustomInputs/Input";
import { useMemo, useState, type SyntheticEvent } from "react";
import { useRegister } from "../../hooks/useRegister";
import { FloatingSelect } from "../../components/CustomInputs/FloatingSelect";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../../hooks/useRoles";

export const Register = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [roleId, setRoleId] = useState<string | number>(1);

  const { registerUser, loading } = useRegister();
  const { roles, loading: loadingRoles } = useRoles();
  const navigate = useNavigate();

  const rolesOptions = useMemo(
    () => roles.map((r) => ({ label: r.roleName, value: r.id })),
    [roles],
  );

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await registerUser({
      employeeNumber,
      roleId: Number(roleId),
    });

    if (success) {
      setEmployeeNumber("");
      setRoleId(2);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 
        p-8 border border-slate-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center 
            shadow-lg shadow-emerald-100 mb-4"
          >
            <UserPlus className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            Alta de Personal
          </h2>
          <p className="text-slate-500 text-sm">
            Registrar nuevo empleado en MESA
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Número de Nómina"
            placeholder="Ingrese nómina"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
          />

          <FloatingSelect
            label={loadingRoles ? "Cargando roles..." : "Roles"}
            options={rolesOptions}
            value={roleId}
            onChange={(val) => setRoleId(val)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold 
            hover:bg-slate-900 transition-all transform active:scale-[0.98] shadow-lg 
            shadow-slate-200 cursor-pointer mt-4"
          >
            {loading ? "Procesando..." : "Registrar usuario"}
          </button>

          <button
            onClick={() => navigate("/usuarios")}
            className="w-full bg-gray-500 text-white py-3 rounded-xl font-bold 
            hover:bg-gray-400 transition-all transform active:scale-[0.98] shadow-lg 
            shadow-slate-200 cursor-pointer"
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};
