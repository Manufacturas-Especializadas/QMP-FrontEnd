import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CreateAuditFcds, Physicals } from "../../../../types/types";

interface Step4Props {
  data: Physicals;
  updateFields: (fields: Partial<Physicals>) => void;
  fullData: CreateAuditFcds;
  updateFullFields: (fields: Partial<CreateAuditFcds>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ATTRIBUTES = [
  { key: "brands", label: "Marcas" },
  { key: "blows", label: "Golpes" },
  { key: "pollution", label: "Contaminación" },
  { key: "ovality", label: "Ovalamiento" },
  { key: "burr", label: "Rebaba" },
  { key: "warped", label: "Pandeado" },
  { key: "excessOil", label: "Exceso de Aceite" },
];

const PROCESS_BUTTONS = [
  { id: 1, name: "Corte" },
  { id: 2, name: "Expansión / Reducción" },
  { id: 3, name: "Perforación" },
  { id: 4, name: "Doblez" },
  { id: 5, name: "Perforación con Extrusion" },
  { id: 6, name: "Indentación" },
  { id: 7, name: "Sello" },
  { id: 8, name: "Soldadura" },
];

export const Step4PhysicalCondition = ({
  data,
  updateFields,
  fullData,
  updateFullFields,
  onNext,
  onBack,
}: Step4Props) => {
  const isValid =
    ATTRIBUTES.every((attr) => (data as any)[attr.key] > 0) &&
    (fullData.fcdsProcessId ?? 0) > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-3 max-h-65 overflow-y-auto pr-2 divide-y divide-slate-100">
        {ATTRIBUTES.map((attr) => {
          const val = (data as any)[attr.key];
          return (
            <div
              key={attr.key}
              className="flex items-center justify-between py-2.5 first:pt-0"
            >
              <span className="text-xs font-black text-slate-700 uppercase tracking-tight">
                {attr.label}
              </span>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
                {[
                  { v: 1, l: "Sí" },
                  { v: 2, l: "No" },
                  { v: 3, l: "N/A" },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => updateFields({ [attr.key]: opt.v })}
                    className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                      val === opt.v
                        ? opt.v === 1
                          ? "bg-amber-500 text-white shadow-sm"
                          : opt.v === 2
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-slate-400 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-100">
        <label
          className="text-xs uppercase font-black text-slate-500 tracking-wider block 
          text-center sm:text-left"
        >
          Seleccionar el Proceso a Auditar (Define la siguiente Hoja)
        </label>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {PROCESS_BUTTONS.map((proc) => (
            <button
              key={proc.id}
              type="button"
              onClick={() => updateFullFields({ fcdsProcessId: proc.id })}
              className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider border transition-all cursor-pointer ${
                fullData.fcdsProcessId === proc.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                  : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
              }`}
            >
              {proc.name}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 flex justify-between items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold 
          text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all flex 
          items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Atrás
        </button>
        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs 
          uppercase tracking-wider px-6 py-4 rounded-2xl shadow-lg shadow-blue-100 
          transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed 
          cursor-pointer"
        >
          Liberación de Producto <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
