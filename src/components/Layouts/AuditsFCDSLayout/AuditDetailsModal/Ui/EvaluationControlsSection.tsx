import { Activity } from "lucide-react";
import { EvalBadge } from "./Badges";

export const EvaluationControlsSection = ({ controls }: { controls: any }) => {
  const controlItems = [
    { l: "Validación Mtto. Autónomo", v: controls?.mttoValidation },
    { l: "Liberación 1ra Pieza", v: controls?.realese1stPiece },
    { l: "SPC", v: controls?.spc },
    { l: "Material Identificado", v: controls?.materialCorrectlyIdentified },
    {
      isGroup: true,
      l: "Equipo de Medición",
      subItems: [
        {
          l: "Identificado Correctamente",
          v: controls?.identifiedMeasuringEquipment,
        },
        {
          l: "Calibrado o Verificado",
          v: controls?.calibratedMeasuringEquipment,
        },
        {
          l: "Adecuado para la medición",
          v: controls?.measuringEquipmentAdequate,
        },
        {
          l: "Corresponde al operador",
          v: controls?.measuringEquipmentOperatorMatch,
        },
      ],
    },
    { l: "IT del Proceso", v: controls?.itProcess },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
      <div
        className="flex items-center gap-2 border-b border-slate-50 pb-2 
        text-slate-800 font-black text-xs uppercase tracking-wider"
      >
        <Activity size={14} className="text-blue-500" /> Validación de controles
      </div>

      <div className="space-y-2 max-h-47.5 overflow-y-auto pr-1 custom-scrollbar">
        {controlItems.map((ctrl, i) => {
          if (ctrl.isGroup) {
            return (
              <div
                key={i}
                className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 
                space-y-2 my-2"
              >
                <span className="text-xs font-black text-slate-700 uppercase">
                  {ctrl.l}
                </span>
                <div className="space-y-1.5 pl-2">
                  {ctrl.subItems?.map((sub, j) => (
                    <div
                      key={j}
                      className="flex justify-between items-center text-[11px] py-1 border-b 
                      border-slate-100/50 last:border-0 font-bold text-slate-600"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        {sub.l}
                      </span>
                      <EvalBadge val={sub.v} />
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div
              key={i}
              className="flex justify-between items-center text-xs py-1 border-b 
              border-slate-50 last:border-0 font-bold text-slate-600"
            >
              <span>{ctrl.l}</span>
              <EvalBadge val={ctrl.v} />
            </div>
          );
        })}
      </div>

      <div
        className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-50 
        font-semibold text-slate-500"
      >
        <div>
          Aceite:{" "}
          <span className="text-slate-700 font-bold">
            {controls?.typeOil || "—"}
          </span>
        </div>
        <div>
          Última Lib:{" "}
          <span className="text-slate-700 font-bold">
            {controls?.lastHourOfRelease || "—"}
          </span>
        </div>
      </div>
    </div>
  );
};
