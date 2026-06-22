import { Search, SlidersHorizontal } from "lucide-react";

interface ScrapFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedShift: string;
  onShiftChange: (val: string) => void;
}

export const ScrapFilters = ({
  searchTerm,
  onSearchChange,
  selectedShift,
  onShiftChange,
}: ScrapFiltersProps) => {
  return (
    <div
      className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm 
      grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"
    >
      <div className="sm:col-span-2 relative flex items-center">
        <Search
          className="absolute left-4 text-slate-400 pointer-events-none"
          size={18}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por inspector de calidad o líneas auditadas..."
          className="w-full bg-slate-50/60 border border-slate-100/80 
          focus:border-blue-500 focus:bg-white rounded-2xl pl-12 pr-4 py-3 text-xs 
          font-bold text-slate-700 outline-none transition-all shadow-inner 
          placeholder:text-slate-400"
        />
      </div>

      <div className="relative flex items-center">
        <SlidersHorizontal
          className="absolute left-4 text-slate-400 pointer-events-none"
          size={14}
        />
        <select
          value={selectedShift}
          onChange={(e) => onShiftChange(e.target.value)}
          className="w-full bg-slate-50/60 border border-slate-100/80 
          focus:border-blue-500 focus:bg-white rounded-2xl pl-10 pr-4 py-3 text-xs 
          font-black text-slate-600 outline-none transition-all appearance-none 
          cursor-pointer tracking-wider uppercase"
        >
          <option value="">Todos los Turnos</option>
          <option value="Día">Turno: Día</option>
          <option value="Tarde">Turno: Tarde</option>
          <option value="Noche">Turno: Noche</option>
        </select>
        <div
          className="absolute right-4 pointer-events-none text-slate-400 font-bold 
          text-[9px]"
        >
          ▼
        </div>
      </div>
    </div>
  );
};
