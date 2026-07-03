import { useShifts } from "../../../../hooks/useShifts";
import { useLines } from "../../../../hooks/useLines";
import { SlidersHorizontal, Layers, ArrowRight } from "lucide-react";
import type { CreateAuditACDPayload } from "../../../../types/types";

interface Step1Props {
  data: CreateAuditACDPayload;
  updateFields: (fields: Partial<CreateAuditACDPayload>) => void;
  onNext: () => void;
}

export const Step1ACDSData = ({ data, updateFields, onNext }: Step1Props) => {
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
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
      <div className="space-y-2">
        <label className="text-xs uppercase font-black text-slate-500 tracking-wider flex items-center gap-1.5">
          <SlidersHorizontal size={14} className="text-blue-500" /> Seleccionar
          Turno Laboral
        </label>
        <div className="grid grid-cols-3 gap-2">
          {shifts.map((shift) => (
            <button
              key={shift.id}
              type="button"
              onClick={() => updateFields({ shiftId: shift.id })}
              className={`p-4 rounded-2xl border font-bold text-xs uppercase tracking-wider 
                transition-all cursor-pointer ${
                  data.shiftId === shift.id
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                    : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                }`}
            >
              {shift.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label
          className="text-xs uppercase font-black text-slate-500 tracking-wider flex 
          items-center gap-1.5"
        >
          <Layers size={14} className="text-blue-500" /> Asociar Líneas a la
          Inspección (Selección Múltiple)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
          {lines.map((line) => {
            const isSelected = (data.lineIds ?? []).includes(line.id);
            return (
              <button
                key={line.id}
                type="button"
                onClick={() => toggleLine(line.id)}
                className={`p-3.5 rounded-xl text-left border font-bold text-xs 
                  transition-all cursor-pointer flex justify-between items-center ${
                    isSelected
                      ? "bg-blue-50/60 border-blue-500 text-blue-700"
                      : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {line.name}
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center text-[9px] ${
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
          className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-900 
          disabled:bg-slate-200 text-white disabled:text-slate-400 font-black text-xs 
          uppercase tracking-wider rounded-xl transition-all flex items-center justify-center 
          gap-2 cursor-pointer disabled:pointer-events-none"
        >
          Configurar Hallazgos <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
