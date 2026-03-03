import { useState, useEffect } from "react";
import { useScrapById } from "../../hooks/useScrapById";
import { useVerifyScrap } from "../../hooks/useVerifyScrap";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export const ScrapDetailModal = ({
  isOpen,
  scrapId,
  onClose,
  onRefresh,
}: any) => {
  const {
    scrapData,
    loading: loadingDetail,
    fetchScrap,
    clearScrap,
  } = useScrapById();
  const { verify, isVerifying } = useVerifyScrap(() => {
    onRefresh();
    handleClose();
  });

  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [newWeight, setNewWeight] = useState("");

  useEffect(() => {
    if (isOpen && scrapId) {
      fetchScrap(scrapId);
    }
  }, [isOpen, scrapId, fetchScrap]);

  const handleClose = () => {
    clearScrap();
    setIsVerified(null);
    setNewWeight("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center 
      justify-center p-4 bg-black/40 backdrop-blur-sm 
      animate-in fade-in duration-200"
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl 
        shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <div
          className="bg-secondary p-6 text-white flex 
          justify-between items-center"
        >
          <h2 className="font-bold text-lg uppercase tracking-tight text-white">
            Auditoría de Registro
          </h2>
          <button
            onClick={handleClose}
            className="hover:bg-white/20 p-1 rounded-full transition-colors 
            hover:cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {loadingDetail ? (
            <div className="py-10 flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-secondary" size={40} />
              <p className="text-gray-400 font-bold text-xs uppercase">
                Obteniendo detalles...
              </p>
            </div>
          ) : (
            <>
              <div
                className="grid grid-cols-2 gap-6 bg-gray-50 p-4 
                rounded-2xl border border-gray-100"
              >
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[10px] mb-1">
                    Proceso
                  </p>
                  <p className="font-bold text-gray-700">
                    {scrapData?.processName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[10px] mb-1">
                    Peso Registrado
                  </p>
                  <p className="font-black text-secondary text-lg">
                    {scrapData?.weight} kg
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-600 text-center">
                  ¿El peso registrado es correcto?
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsVerified(true)}
                    className={`flex-1 py-4 rounded-2xl border-2 font-bold 
                      flex flex-col items-center gap-1 transition-all hover:cursor-pointer ${
                        isVerified === true
                          ? "border-green-500 bg-green-50 text-green-600 shadow-inner"
                          : "border-gray-100 text-gray-400"
                      }`}
                  >
                    <CheckCircle2 size={24} /> SÍ
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsVerified(false)}
                    className={`flex-1 py-4 rounded-2xl border-2 font-bold flex 
                      flex-col items-center gap-1 transition-all hover:cursor-pointer ${
                        isVerified === false
                          ? "border-amber-500 bg-amber-50 text-amber-600 shadow-inner"
                          : "border-gray-100 text-gray-400"
                      }`}
                  >
                    <AlertCircle size={24} /> NO
                  </button>
                </div>

                {isVerified === false && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <label
                      className="block text-[10px] font-bold text-amber-600 
                      uppercase mb-2 ml-1"
                    >
                      Peso Real de Báscula (kg)
                    </label>
                    <input
                      type="number"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      placeholder="Ej: 22.5"
                      className="w-full bg-gray-50 border-b-2 border-amber-500 
                      p-4 outline-none font-black text-xl text-gray-700 focus:bg-amber-50/30 
                      transition-colors"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={() =>
                  verify(scrapData!.id, isVerified!, Number(newWeight))
                }
                disabled={
                  isVerifying ||
                  isVerified === null ||
                  (isVerified === false && !newWeight)
                }
                className="w-full bg-secondary text-white py-4 rounded-2xl font-black 
                shadow-lg shadow-blue-100 disabled:opacity-30 transition-all hover:scale-[1.01] 
                active:scale-[0.99] hover:cursor-pointer uppercase tracking-wider"
              >
                {isVerifying ? "Guardando..." : "Confirmar Verificación"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
