import { AlertCircle, LogIn } from "lucide-react";
import { Input } from "../../components/CustomInputs/Input";
import { useEffect, useState, type SyntheticEvent } from "react";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const { loginUser, loading } = useLogin();

  useEffect(() => {
    setErrorBanner(null);
  }, [employeeNumber]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorBanner(null);

    if (!employeeNumber.trim()) return;

    try {
      await loginUser(employeeNumber);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Credenciales incorrectas";
      setErrorBanner(msg);
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
            className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center 
            shadow-lg shadow-blue-200 mb-4"
          >
            <LogIn className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">MESA QMP</h2>
          <p className="text-slate-500 text-sm">Ingresa tu número de nómina</p>
        </div>

        {errorBanner && (
          <div
            className="flex items-start gap-3 bg-amber-50 border border-amber-200 p-4 
            rounded-2xl text-amber-800 animate-in fade-in zoom-in-95 duration-200"
          >
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs font-bold leading-relaxed">
              {errorBanner}
            </div>
          </div>
        )}

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
