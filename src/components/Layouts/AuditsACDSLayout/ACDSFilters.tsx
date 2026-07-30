import { Eraser, Search, SlidersHorizontal } from "lucide-react";
import type { Lines, Shifts } from "../../../types/types";

interface ACDSFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedShift: string;
  onShiftChange: (val: string) => void;
  shifts?: Shifts[];
  selectedLine?: string;
  onLineChange?: (val: string) => void;
  lines?: Lines[];
  startDate?: string;
  onStartDateChange?: (val: string) => void;
  endDate?: string;
  onEndDateChange?: (val: string) => void;
}

export const ACDSFilters = ({
  searchTerm,
  onSearchChange,
  selectedShift,
  onShiftChange,
  shifts = [],
  selectedLine,
  onLineChange,
  lines = [],
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: ACDSFiltersProps) => {
  return (
    <div className="bg-white p-4 rounded-[1.8rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-3 items-center">
      <div className="relative w-full flex-1">
        <Search className="absolute left-4 top-3.5 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Buscar por inspector, tipo de scrap o número de parte..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-50/50 border border-slate-150 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold outline-none focus:border-blue-500 transition-all shadow-inner"
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5 shadow-sm w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange?.(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
            />
            <span className="text-xs text-slate-400 font-bold">-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange?.(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
            />
          </div>
          {(startDate || endDate) && (
            <button
              onClick={() => {
                onStartDateChange?.("");
                onEndDateChange?.("");
              }}
              className="text-[10px] font-black text-red-500 hover:text-red-700 ml-1 px-1.5 py-0.5 rounded-md bg-red-50"
              title="Limpiar fechas"
            >
              <Eraser></Eraser>

            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
        <SlidersHorizontal size={14} className="text-slate-400 hidden sm:block" />
        <select
          value={selectedLine}
          onChange={(e) => onLineChange?.(e.target.value)}
          className="w-full md:w-48 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-700 outline-none focus:border-blue-500 cursor-pointer shadow-sm"
        >
          <option value="">Todas las lineas</option>
          {lines.map((line) => (
            <option key={line.id} value={line.name}>
              {line.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
        <SlidersHorizontal size={14} className="text-slate-400 hidden sm:block" />
        <select
          value={selectedShift}
          onChange={(e) => onShiftChange(e.target.value)}
          className="w-full md:w-48 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-700 outline-none focus:border-blue-500 cursor-pointer shadow-sm"
        >
          <option value="">Todos los turnos</option>
          {shifts.map((shift) => (
            <option key={shift.id} value={shift.name}>
              {shift.name}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};