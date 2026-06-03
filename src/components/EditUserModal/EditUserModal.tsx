import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import { useRoles } from "../../hooks/useRoles";
import { UserCog, X } from "lucide-react";
import { FloatingSelect } from "../CustomInputs/FloatingSelect";
import { Input } from "../CustomInputs/Input";
import { useEditUser } from "../../hooks/useEditUser";

interface UserData {
  id: number;
  employeeNumber: string;
  roleName: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit: UserData | null;
  onRefresh: () => void;
}

export const EditUserModal = ({
  isOpen,
  onClose,
  userToEdit,
  onRefresh,
}: EditUserModalProps) => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [roleId, setRoleId] = useState<string | number>("");

  const { roles, loading: loadingRoles } = useRoles();
  const { editUser, loading } = useEditUser();

  const rolesOptions = useMemo(
    () => roles.map((r) => ({ label: r.roleName, value: r.id })),
    [roles],
  );

  console.log("Roles:", roles);

  useEffect(() => {
    if (isOpen && userToEdit) {
      setEmployeeNumber(userToEdit.employeeNumber);

      const currentRole = roles.find((r) => r.roleName === userToEdit.roleName);
      if (currentRole) {
        setRoleId(currentRole.id);
      }
    }
  }, [isOpen, userToEdit, roles]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userToEdit || !employeeNumber.trim() || !roleId) return;

    const success = await editUser({
      id: userToEdit.id,
      newEmployeeNumber: employeeNumber.trim(),
      newRoleId: Number(roleId),
    });

    if (success) {
      onRefresh();
      handleClose();
    }
  };

  const handleClose = () => {
    setEmployeeNumber("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
      bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl animate-in zoom-in-95">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 bg-blue-100 rounded-xl flex items-center 
              justify-center"
            >
              <UserCog className="text-blue-600 w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                Editar Usuario
              </h2>
              <p className="text-xs font-bold text-slate-400">
                Modificar datos de acceso
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors 
            text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <Input
            label="Número de Nómina"
            placeholder="Ingrese nómina"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
          />

          <FloatingSelect
            label={loadingRoles ? "Cargando roles..." : "Rol de Usuario"}
            options={rolesOptions}
            value={roleId}
            onChange={(val) => setRoleId(val)}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-500 
              font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !employeeNumber.trim()}
              className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold 
              hover:bg-slate-900 transition-all transform active:scale-[0.98] shadow-lg 
              shadow-slate-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
