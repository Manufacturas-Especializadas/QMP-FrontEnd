import { Search, SlidersHorizontal } from "lucide-react";

interface ACDSFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedShift: string;
  onShiftChange: (val: string) => void;
}

export const ACDSFilters = ({
  searchTerm,
  onSearchChange,
  selectedShift,
  onShiftChange,
}: ACDSFiltersProps) => {
  return (
    <div
      className="bg-white p-4 rounded-[1.8rem] border border-slate-100 shadow-sm flex 
      flex-col md:flex-row gap-3 items-center"
    >
      <div className="relative w-full flex-1">
        <Search className="absolute left-4 top-3.5 text-slate-400" size={16} />
        <input
          type="text"
          placeholder="Buscar por inspector de calidad, número de parte o líneas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-50/50 border border-slate-150 rounded-2xl pl-11 pr-4 py-3 
          text-xs font-bold outline-none focus:border-blue-500 transition-all shadow-inner"
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
        <SlidersHorizontal
          size={14}
          className="text-slate-400 hidden sm:block"
        />
        <select
          value={selectedShift}
          onChange={(e) => onShiftChange(e.target.value)}
          className="w-full md:w-48 bg-white border border-slate-200 rounded-2xl px-4 py-3 
          text-xs font-black uppercase tracking-wider text-slate-700 outline-none 
          focus:border-blue-500 cursor-pointer shadow-sm"
        >
          <option value="">Todos los Turnos</option>
          <option value="Día">Turno Día</option>
          <option value="Tarde">Turno Tarde</option>
          <option value="Noche">Turno Noche</option>
        </select>
      </div>
    </div>
  );
};
