import { ArrowRight } from "lucide-react";
import type { CreateAuditFcds } from "../../../../types/types";
import { useShifts } from "../../../../hooks/useShifts";
import { useLines } from "../../../../hooks/useLines";

interface Step1Props {
  data: CreateAuditFcds;
  updateFields: (fields: Partial<CreateAuditFcds>) => void;
  onNext: () => void;
}

export const Step1AuditData = ({ data, updateFields, onNext }: Step1Props) => {
  const { shifts } = useShifts();
  const { lines } = useLines();

  const toggleLine = (lineId: number) => {
    const currentLines = [...(data.lineIds ?? [])];

    if (currentLines.includes(lineId)) {
      updateFields({ lineIds: currentLines.filter((id) => id !== lineId) });
    } else {
      updateFields({ lineIds: [...currentLines, lineId] });
    }
  };

  const isValid = (data.shiftId ?? 0) > 0 && (data.lineIds ?? []).length > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-3">
        <label className="text-xs uppercase font-black text-slate-400 tracking-wider">
          Seleccione el Turno
        </label>
        <div className="grid grid-cols-3 gap-3">
          {shifts.map((shift) => (
            <button
              key={shift.id}
              type="button"
              onClick={() => updateFields({ shiftId: shift.id })}
              className={`py-4 rounded-2xl font-bold uppercase text-sm tracking-wide 
                transition-all cursor-pointer border ${
                  data.shiftId === shift.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                    : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                }`}
            >
              {shift.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs uppercase font-black text-slate-400 tracking-wider">
          Selección de Líneas Asociadas (Selección Múltiple)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {lines.map((line) => {
            const isSelected = (data.lineIds ?? []).includes(line.id);
            return (
              <button
                key={line.id}
                type="button"
                onClick={() => toggleLine(line.id)}
                className={`p-4 rounded-2xl text-left border font-bold text-sm transition-all cursor-pointer flex justify-between items-center ${
                  isSelected
                    ? "bg-blue-50/60 border-blue-500 text-blue-700"
                    : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {line.name}
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center text-[10px] ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  {isSelected && "✓"}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black 
          text-xs uppercase tracking-wider px-6 py-4 rounded-2xl shadow-lg shadow-blue-100 
          transition-all flex items-center justify-center gap-2 disabled:opacity-40 
          disabled:cursor-not-allowed cursor-pointer"
        >
          Elementos de Trazabilidad <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
