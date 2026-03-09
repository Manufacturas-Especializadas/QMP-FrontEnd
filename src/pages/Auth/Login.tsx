import { LogIn } from "lucide-react";
import { Input } from "../../components/CustomInputs/Input";
import { useState, type SyntheticEvent } from "react";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const { loginUser, loading } = useLogin();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(employeeNumber);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 
        p-8 border border-slate-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center 
            shadow-lg shadow-blue-200 mb-4"
          >
            <LogIn className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">MESA QMP</h2>
          <p className="text-slate-500 text-sm">Ingresa tu número de nómina</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Número de nómina"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold 
            hover:bg-blue-700 transition-all transform active:scale-[0.98] shadow-md 
            shadow-blue-100 cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Validando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
