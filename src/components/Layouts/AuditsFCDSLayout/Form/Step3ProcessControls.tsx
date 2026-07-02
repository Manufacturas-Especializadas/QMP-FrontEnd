import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Controls } from "../../../../types/types";

interface Step3Props {
  data: Controls;
  updateFields: (fields: Partial<Controls>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CHECKPOINTS = [
  { key: "mttoValidation", label: "Validación de Mtto. Autónomo" },
  { key: "realese1stPiece", label: "Liberación de 1ra. Pieza" },
  { key: "spc", label: "SPC" },
  {
    key: "materialCorrectlyIdentified",
    label: "Material identificado correctamente",
  },
  {
    key: "measuringEquipmentGroup",
    label: "Equipo de medición",
    isGroup: true,
    subChecks: [
      {
        key: "measuringEquipmentIdentified",
        label: "Identificado correctamente",
      },
      { key: "measuringEquipmentCalibrated", label: "Calibrado o verificado" },
      { key: "measuringEquipmentAdequate", label: "Adecuado para la medición" },
      {
        key: "measuringEquipmentOperatorMatch",
        label: "Corresponde al operador auditado",
      },
    ],
  },
  { key: "itProcess", label: "IT del proceso" },
];

export const Step3ProcessControls = ({
  data,
  updateFields,
  onNext,
  onBack,
}: Step3Props) => {
  const handleSelectOption = (key: string, value: number) => {
    updateFields({ [key]: value });
  };

  const allKeysToValidate = CHECKPOINTS.flatMap((cp) =>
    cp.isGroup ? cp.subChecks!.map((sub) => sub.key) : cp.key,
  );

  const isValid =
    allKeysToValidate.every((key) => (data as any)[key] > 0) &&
    data.typeOil.trim() !== "" &&
    data.lastHourOfRelease.trim() !== "";

  const renderButtonGroup = (key: string, currentValue: number) => (
    <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-center">
      {[
        {
          val: 1,
          label: "Cumple",
          activeClass: "bg-emerald-600 text-white shadow-sm",
        },
        {
          val: 2,
          label: "No Cumple",
          activeClass: "bg-rose-600 text-white shadow-sm",
        },
        {
          val: 3,
          label: "N/A",
          activeClass: "bg-slate-400 text-white shadow-sm",
        },
      ].map((btn) => (
        <button
          key={btn.val}
          type="button"
          onClick={() => handleSelectOption(key, btn.val)}
          className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider 
              transition-all cursor-pointer ${
                currentValue === btn.val
                  ? btn.activeClass
                  : "text-slate-400 hover:text-slate-600"
              }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="space-y-3 max-h-87.5 overflow-y-auto pr-2 custom-scrollbar">
        {CHECKPOINTS.map((cp) => {
          if (cp.isGroup) {
            return (
              <div
                key={cp.key}
                className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 
                space-y-3"
              >
                <span
                  className="text-sm font-black text-slate-800 uppercase 
                  tracking-tight block border-b border-slate-200/60 pb-2"
                >
                  {cp.label}
                </span>
                <div className="space-y-2 pl-2">
                  {cp.subChecks?.map((sub) => (
                    <div
                      key={sub.key}
                      className="flex flex-col sm:flex-row sm:items-center justify-between 
                      gap-2 py-1.5 border-b border-slate-100/50 last:border-0 last:pb-0"
                    >
                      <span
                        className="text-xs font-bold text-slate-600 uppercase 
                        tracking-tight flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        {sub.label}
                      </span>
                      {renderButtonGroup(sub.key, (data as any)[sub.key])}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          const currentValue = (data as any)[cp.key];
          return (
            <div
              key={cp.key}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 
              p-3 bg-white border border-slate-100 rounded-xl"
            >
              <span className="text-xs font-black text-slate-700 uppercase tracking-tight">
                {cp.label}
              </span>
              {renderButtonGroup(cp.key, currentValue)}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
        <div className="space-y-1.5">
          <label className="text-xs uppercase font-black text-slate-400 tracking-wider">
            Tipo de Aceite
          </label>
          <input
            type="text"
            placeholder="Ej: Quaker Mobil 15W40"
            value={data.typeOil}
            onChange={(e) => updateFields({ typeOil: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 
            text-sm font-bold outline-none focus:bg-white focus:border-blue-500 
            transition-all shadow-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs uppercase font-black text-slate-400 tracking-wider">
            Última Hora de Liberación
          </label>
          <input
            type="time"
            value={data.lastHourOfRelease}
            onChange={(e) =>
              updateFields({ lastHourOfRelease: e.target.value })
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 
            text-sm font-bold outline-none focus:bg-white focus:border-blue-500 
            transition-all shadow-sm cursor-pointer"
          />
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
          transition-all flex items-center gap-2 disabled:opacity-40 
          disabled:cursor-not-allowed cursor-pointer"
        >
          Condición Física <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
