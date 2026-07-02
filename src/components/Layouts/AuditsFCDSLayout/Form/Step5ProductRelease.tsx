import { useEffect, useState } from "react";
import { Save, AlertTriangle } from "lucide-react";
import type { CreateAuditFcds } from "../../../../types/types";
import { ProcessSpecsContainer } from "./Step5Layout/ProcessSpecsContainer";
import { PROCESS_CONFIGS } from "./processConfigs";

interface Step5Props {
  data: CreateAuditFcds;
  updateFields: (
    fields:
      | Partial<CreateAuditFcds>
      | ((prev: CreateAuditFcds) => CreateAuditFcds),
  ) => void;
  onSubmit: (isConformingOverride?: boolean) => void;
  onBack: () => void;
  saving: boolean;
}

export const Step5ProductRelease = ({
  data,
  updateFields,
  onSubmit,
  onBack,
  saving,
}: Step5Props) => {
  const [selectedSubProcessIds, setSelectedSubProcessIds] = useState<number[]>(
    [],
  );

  useEffect(() => {
    const hasExistingData = data.dimensionalSpecs?.some(
      (s) => s.expectedValue !== "" || s.realValue !== "",
    );
    if (hasExistingData) return;

    const currentConfig = PROCESS_CONFIGS[data.fcdsProcessId ?? 0];
    if (currentConfig) {
      updateFields({
        dimensionalSpecs: currentConfig.dimensionalSpecs,
        visualChecklists: currentConfig.visualChecklists,
      });
    }
  }, [data.fcdsProcessId]);

  const handleSubProcessChange = (subId: number) => {
    const coreIntegradoraVisuals = PROCESS_CONFIGS[10].visualChecklists;
    const subConfig = PROCESS_CONFIGS[subId];

    updateFields({
      dimensionalSpecs: subConfig?.dimensionalSpecs
        ? JSON.parse(JSON.stringify(subConfig.dimensionalSpecs))
        : [],
      visualChecklists: [
        ...JSON.parse(JSON.stringify(coreIntegradoraVisuals)),
        ...(subConfig?.visualChecklists
          ? JSON.parse(JSON.stringify(subConfig.visualChecklists))
          : []),
      ],
    });
    setSelectedSubProcessId(subId);
  };

  const handleSpecChange = (
    index: number,
    key: "expectedValue" | "realValue",
    value: string,
  ) => {
    updateFields((prev) => {
      const specs = [...(prev.dimensionalSpecs || [])];
      specs[index] = { ...specs[index], [key]: value };
      return { ...prev, dimensionalSpecs: specs };
    });
  };

  const handleChecklistChange = (index: number, value: number) => {
    updateFields((prev) => {
      const checks = [...(prev.visualChecklists || [])];
      checks[index] = { ...checks[index], resultValue: value };
      return { ...prev, visualChecklists: checks };
    });
  };

  const areSpecsFilled =
    data.dimensionalSpecs?.every(
      (s) =>
        s.isOptional ||
        (s.expectedValue.trim() !== "" && s.realValue.trim() !== ""),
    ) ?? true;

  const areVisualsFilled =
    data.visualChecklists?.every((v) => v.resultValue !== 0) ?? true;

  const invalidSpecs = data.dimensionalSpecs?.filter(
    (s) =>
      !s.isOptional &&
      (s.expectedValue.trim() === "" || s.realValue.trim() === ""),
  );

  console.table(invalidSpecs);

  const isSubProcessValid =
    data.fcdsProcessId === 10 ? selectedSubProcessId !== null : true;

  const isFormFilled =
    (data.partNumber ?? "").trim() !== "" &&
    isSubProcessValid &&
    areSpecsFilled &&
    areVisualsFilled;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div
        className="space-y-1.5 bg-blue-50/40 p-4 rounded-2xl border 
        border-blue-100/40"
      >
        <label className="text-xs uppercase font-black text-blue-800 tracking-wider">
          Número de Parte en Producción
        </label>
        <input
          type="text"
          value={data.partNumber}
          onChange={(e) => updateFields({ partNumber: e.target.value })}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 
          text-sm font-bold outline-none focus:border-blue-600 shadow-sm"
        />
      </div>

      <div className="max-h-104 overflow-y-auto pr-1 custom-scrollbar">
        <ProcessSpecsContainer
          processId={data.fcdsProcessId ?? 0}
          specs={data.dimensionalSpecs ?? []}
          visuals={data.visualChecklists ?? []}
          onSpecChange={handleSpecChange}
          onChecklistChange={handleChecklistChange}
          selectedSubProcessId={selectedSubProcessId}
          onSubProcessChange={handleSubProcessChange}
        />
      </div>

      <div
        className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex 
        flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <span className="text-xs font-black text-slate-800 uppercase block">
          ¿Producto conforme?
        </span>
        <div className="flex gap-2">
          {[
            {
              v: true,
              l: "Si",
              c: "bg-emerald-600 shadow-md shadow-emerald-100",
            },
            { v: false, l: "No", c: "bg-rose-600 shadow-md shadow-rose-100" },
          ].map((btn) => (
            <button
              key={btn.l}
              type="button"
              onClick={() => updateFields({ isProductConforming: btn.v })}
              className={`px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider 
                transition-all cursor-pointer ${
                  data.isProductConforming === btn.v
                    ? `${btn.c} text-white`
                    : "bg-white border border-slate-200 text-slate-400"
                }`}
            >
              {btn.l}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={saving}
          className="w-full sm:w-auto order-3 sm:order-1 border border-slate-200 
          text-slate-500 font-bold text-xs uppercase px-5 py-3.5 rounded-xl cursor-pointer"
        >
          Atrás
        </button>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 order-1 sm:order-2">
          {!data.isProductConforming ? (
            <button
              type="button"
              disabled={!isFormFilled || saving}
              onClick={() => onSubmit(false)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-black 
              text-xs uppercase px-5 py-3.5 rounded-xl shadow-lg shadow-amber-100 
              transition-all flex items-center justify-center gap-2 cursor-pointer 
              disabled:opacity-40"
            >
              <AlertTriangle size={14} /> Registrar RDM y Guardar
            </button>
          ) : (
            <button
              type="button"
              disabled={!isFormFilled || saving}
              onClick={() => onSubmit()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs 
              uppercase px-6 py-4 rounded-xl shadow-lg shadow-blue-100 transition-all flex 
              items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <Save size={14} />{" "}
              {saving ? "Procesando..." : "Finalizar Auditoría"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
