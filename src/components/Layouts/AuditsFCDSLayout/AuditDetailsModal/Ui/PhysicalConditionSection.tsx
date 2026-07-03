import { ShieldAlert } from "lucide-react";
import { PhysicalBadge } from "./Badges";

export const PhysicalConditionSection = ({ physicals }: { physicals: any }) => {
  const items = [
    { l: "Marcas", v: physicals?.brands },
    { l: "Golpes", v: physicals?.blows },
    { l: "Contaminación", v: physicals?.pollution },
    { l: "Ovalamiento", v: physicals?.ovality },
    { l: "Rebaba", v: physicals?.burr },
    { l: "Pandeado", v: physicals?.warped },
    { l: "Exceso de Aceite", v: physicals?.excessOil },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
      <div
        className="flex items-center gap-2 border-b border-slate-50 pb-2 
        text-slate-800 font-black text-xs uppercase tracking-wider"
      >
        <ShieldAlert size={14} className="text-blue-500" /> Estética y condición
        físicas Física
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-h-37.5 
        overflow-y-auto pr-1 custom-scrollbar"
      >
        {items.map((phys, i) => (
          <div
            key={i}
            className="flex justify-between items-center text-xs py-1 border-b 
            border-slate-50 font-bold text-slate-600"
          >
            <span>{phys.l}</span>
            <PhysicalBadge val={phys.v} />
          </div>
        ))}
      </div>
    </div>
  );
};
