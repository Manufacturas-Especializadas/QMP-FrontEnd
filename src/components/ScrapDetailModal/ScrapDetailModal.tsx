import { useState, useEffect, useMemo } from "react";
import { useScrapById } from "../../hooks/useScrapById";
import { useVerifyScrap } from "../../hooks/useVerifyScrap";
import { X, Loader2, CheckCircle2, AlertCircle, Lock, Layers } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types/types";

export const ScrapDetailModal = ({
  isOpen,
  scrapId,
  onClose,
  onRefresh,
}: any) => {
  const { user } = useAuth();

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

  const canVerify = useMemo(() => {
    if (!scrapData) return false;
    const isAudited = scrapData.isVerified || scrapData.verifiedWeight !== null;

    if (!isAudited) {
      return true;
    }

    return user?.role === UserRole.Admin;
  }, [scrapData, user?.role]);

  const handleClose = () => {
    clearScrap();
    setIsVerified(null);
    setNewWeight("");
    onClose();
  };

  if (!isOpen) return null;
  console.log("ScrapData", scrapData);

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
                    Linea
                  </p>
                  <p className="font-bold text-gray-700">
                    {scrapData?.lineName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[10px] mb-1">
                    Peso verificado
                  </p>
                  <p className="font-black text-secondary text-lg">
                    {scrapData?.verifiedWeight || "(Sin verificar)"} kg
                  </p>
                </div>
              </div>

              {scrapData?.scrapDetails && scrapData.scrapDetails.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Layers size={14} /> Registros del Reporte
                  </h3>

                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1 
                    [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-50 
                    [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                    {scrapData.scrapDetails.map((detail: any, index: number) => (
                      <div
                        key={detail.id || index}
                        className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-700 text-sm">
                            Tipo: {detail.typeScrapName || "Sin tipo especificado"}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400">
                            Defecto: {detail.defectName || "N/A"}
                          </span>
                        </div>
                        <div className="bg-blue-50 px-3 py-1 rounded-lg">
                          <span className="font-black text-blue-600">
                            {detail.weight} <span className="text-[10px] text-blue-400">kg</span>
                          </span>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              )}

              {canVerify ? (
                <div className="space-y-4 pt-2 border-t border-gray-100 mt-2">
                  <label className="block text-sm font-bold text-gray-600 text-center">
                    {scrapData?.isVerified || scrapData?.verifiedWeight !== null
                      ? "¿El peso es correcto?"
                      : "¿El peso registrado es correcto?"}
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsVerified(true)}
                      className={`flex-1 py-4 rounded-2xl border-2 font-bold 
                      flex flex-col items-center gap-1 transition-all hover:cursor-pointer ${isVerified === true
                          ? "border-green-500 bg-green-50 text-green-600 shadow-inner"
                          : "border-gray-100 text-gray-400 hover:bg-gray-50"
                        }`}
                    >
                      <CheckCircle2 size={24} /> SÍ
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsVerified(false)}
                      className={`flex-1 py-4 rounded-2xl border-2 font-bold flex 
                      flex-col items-center gap-1 transition-all hover:cursor-pointer ${isVerified === false
                          ? "border-amber-500 bg-amber-50 text-amber-600 shadow-inner"
                          : "border-gray-100 text-gray-400 hover:bg-gray-50"
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
                    active:scale-[0.99] hover:cursor-pointer uppercase tracking-wider mt-4"
                  >
                    {isVerifying ? "Guardando..." : "Confirmar Verificación"}
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-white rounded-full shadow-sm text-gray-400">
                    <Lock size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700">
                      Registro Auditado
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Este registro de scrap ya fue verificado. Solo un
                      Administrador puede modificar estos datos.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};