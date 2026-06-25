import { useEffect } from "react";
import { ArrowLeft, Save, AlertTriangle } from "lucide-react";
import type { CreateAuditFcds } from "../../../../types/types";

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
  useEffect(() => {
    const hasExistingData = data.dimensionalSpecs?.some(
      (spec) => spec.expectedValue !== "" || spec.realValue !== "",
    );

    if (hasExistingData) return;

    if (data.fcdsProcessId === 1) {
      updateFields({
        dimensionalSpecs: [
          { specName: "Desarrollo", expectedValue: "", realValue: "" },
          { specName: "Diámetro", expectedValue: "", realValue: "" },
          { specName: "Pared", expectedValue: "", realValue: "" },
        ],
        visualChecklists: [],
      });
    } else if (data.fcdsProcessId === 2) {
      updateFields({
        dimensionalSpecs: [
          { specName: "P1 - ID/OD", expectedValue: "", realValue: "" },
          { specName: "P1 - Profundidad", expectedValue: "", realValue: "" },
          {
            specName: "P1 - Altura de flare",
            expectedValue: "",
            realValue: "",
          },
          {
            specName: "P1 - Ancho de beading o chaflán",
            expectedValue: "",
            realValue: "",
          },
          { specName: "P2 - ID/OD", expectedValue: "", realValue: "" },
          { specName: "P2 - Profundidad", expectedValue: "", realValue: "" },
          {
            specName: "P2 - Altura de flare",
            expectedValue: "",
            realValue: "",
          },
          {
            specName: "P2 - Ancho de beading o chaflán",
            expectedValue: "",
            realValue: "",
          },
        ],
        visualChecklists: [],
      });
    } else if (data.fcdsProcessId === 3) {
      updateFields({
        dimensionalSpecs: [
          {
            specName: "Diámetro de perforación",
            expectedValue: "",
            realValue: "",
          },
          {
            specName: "Cantidad de perforaciones",
            expectedValue: "",
            realValue: "",
          },
          {
            specName: "Distancia de perforación 1",
            expectedValue: "",
            realValue: "",
          },
        ],
        visualChecklists: [],
      });
    } else if (data.fcdsProcessId === 8) {
      updateFields({
        dimensionalSpecs: [],
        visualChecklists: [
          { checkpointName: "Vista frontal correcta", resultValue: 0 },
          { checkpointName: "Vista lateral correcta", resultValue: 0 },
          { checkpointName: "Vista superior correcta", resultValue: 0 },
          { checkpointName: "Defectos de soldadura", resultValue: 0 },
        ],
      });
    }
  }, [data.fcdsProcessId]);

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

  const isDimensional = data.fcdsProcessId !== 8;
  const isFormFilled = (data.partNumber ?? "").trim() !== "";

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="space-y-1.5 bg-blue-50/40 p-4 rounded-2xl border border-blue-100/60">
        <label className="text-xs uppercase font-black text-blue-800 tracking-wider">
          Número de Parte en Producción
        </label>
        <input
          type="text"
          value={data.partNumber}
          onChange={(e) => updateFields({ partNumber: e.target.value })}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm 
          font-bold outline-none focus:border-blue-600 shadow-sm"
        />
      </div>

      <div className="max-h-60 overflow-y-auto pr-1 space-y-3">
        {isDimensional
          ? data.dimensionalSpecs?.map((spec, idx) => (
              <div
                key={spec.specName}
                className="grid grid-cols-3 gap-2 items-center bg-slate-50 p-3 rounded-xl 
                border border-slate-100"
              >
                <span className="text-xs font-black text-slate-700 uppercase tracking-tight">
                  {spec.specName}
                </span>
                <input
                  type="text"
                  placeholder="Esp."
                  value={spec.expectedValue}
                  onChange={(e) =>
                    handleSpecChange(idx, "expectedValue", e.target.value)
                  }
                  className="bg-white border border-slate-200 rounded-lg p-2 text-xs 
                  font-semibold outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Real"
                  value={spec.realValue}
                  onChange={(e) =>
                    handleSpecChange(idx, "realValue", e.target.value)
                  }
                  className="bg-white border border-slate-200 rounded-lg p-2 text-xs 
                  font-semibold outline-none focus:border-blue-500"
                />
              </div>
            ))
          : data.visualChecklists?.map((check, idx) => (
              <div
                key={check.checkpointName}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border 
                border-slate-100"
              >
                <span className="text-xs font-black text-slate-700 uppercase tracking-tight">
                  {check.checkpointName}
                </span>
                <div
                  className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200 
                  shrink-0"
                >
                  {[
                    { v: 1, l: "Sí" },
                    { v: 2, l: "No" },
                    { v: 3, l: "N/A" },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => handleChecklistChange(idx, opt.v)}
                      className={`px-2.5 py-1 rounded text-[9px] uppercase font-black transition-all cursor-pointer ${
                        check.resultValue === opt.v
                          ? "bg-blue-600 text-white"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>
            ))}
      </div>

      <div
        className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col 
        sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <span className="text-xs font-black text-slate-800 uppercase block">
            ¿Producto conforme?
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => updateFields({ isProductConforming: true })}
            className={`px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all cursor-pointer ${
              data.isProductConforming
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                : "bg-white border border-slate-200 text-slate-400"
            }`}
          >
            Si
          </button>
          <button
            type="button"
            onClick={() => updateFields({ isProductConforming: false })}
            className={`px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider 
              transition-all cursor-pointer ${
                !data.isProductConforming
                  ? "bg-rose-600 text-white shadow-md shadow-rose-100"
                  : "bg-white border border-slate-200 text-slate-400"
              }`}
          >
            No
          </button>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={saving}
          className="w-full sm:w-auto order-3 sm:order-1 border border-slate-200 
          hover:bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider px-5 
          py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Atrás
        </button>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 order-1 sm:order-2">
          {!data.isProductConforming && (
            <button
              type="button"
              disabled={!isFormFilled || saving}
              onClick={() => onSubmit(false)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs 
              uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-lg shadow-amber-100 
              transition-all flex items-center justify-center gap-2 cursor-pointer 
              disabled:opacity-40"
            >
              <AlertTriangle size={14} /> Registrar RDM y Guardar
            </button>
          )}

          {data.isProductConforming && (
            <button
              type="button"
              disabled={!isFormFilled || saving}
              onClick={() => onSubmit()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs 
              uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg shadow-blue-100 
              transition-all flex items-center justify-center gap-2 cursor-pointer 
              disabled:opacity-40"
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
