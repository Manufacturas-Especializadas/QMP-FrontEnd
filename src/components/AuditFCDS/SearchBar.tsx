import { Search, SlidersHorizontal } from "lucide-react";

export interface AuditSearchProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export const AuditSearch = ({ searchTerm, onSearchChange }: AuditSearchProps) => (
  <div className="flex gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
    <div className="relative flex-1">
      <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
      <input
        type="text"
        placeholder="Buscar por número de parte o inspector..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 outline-none text-sm font-medium focus:bg-white focus:border-blue-500 transition-colors"
      />
    </div>
    <button className="p-3 border border-slate-100 bg-slate-50 text-slate-600 rounded-xl transition-colors cursor-pointer">
      <SlidersHorizontal size={18} />
    </button>
  </div>
);