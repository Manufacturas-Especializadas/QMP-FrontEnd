interface VisualChecklistRowProps {
  check: any;
  idx: number;
  onChecklistChange: (index: number, value: number) => void;
}

export const VisualChecklistRow = ({
  check,
  idx,
  onChecklistChange,
}: VisualChecklistRowProps) => (
  <div
    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border 
    border-slate-100"
  >
    <span className="text-xs font-black text-slate-700 uppercase tracking-tight">
      {check.checkpointName}
    </span>
    <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200 shrink-0">
      {[
        { v: 1, l: "Sí" },
        { v: 2, l: "No" },
        { v: 3, l: "N/A" },
      ].map((opt) => (
        <button
          key={opt.v}
          type="button"
          onClick={() => onChecklistChange(idx, opt.v)}
          className={`px-2.5 py-1 rounded text-[9px] uppercase font-black transition-all cursor-pointer ${
            check.resultValue === opt.v
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {opt.l}
        </button>
      ))}
    </div>
  </div>
);
