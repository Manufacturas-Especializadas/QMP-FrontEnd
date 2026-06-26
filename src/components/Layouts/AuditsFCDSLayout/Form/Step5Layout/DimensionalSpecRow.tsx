interface DimensionalSpecRowProps {
  spec: any;
  idx: number;
  onSpecChange: (
    index: number,
    key: "expectedValue" | "realValue",
    value: string,
  ) => void;
}

export const DimensionalSpecRow = ({
  spec,
  idx,
  onSpecChange,
}: DimensionalSpecRowProps) => (
  <div
    className="grid grid-cols-3 gap-3 items-center bg-white p-3 rounded-xl border 
    border-slate-100 shadow-xs"
  >
    <span className="text-xs font-black text-slate-700 uppercase tracking-tight truncate">
      {spec.specName
        .replace("P1 - ", "")
        .replace("P2 - ", "")
        .replace("Ex1 - ", "")
        .replace("Ex2 - ", "")}
    </span>
    <input
      type="text"
      placeholder="Esp."
      value={spec.expectedValue}
      onChange={(e) => onSpecChange(idx, "expectedValue", e.target.value)}
      className="bg-slate-50/50 border border-slate-200 rounded-lg p-2 text-xs font-bold 
      text-center outline-none focus:bg-white focus:border-blue-500 transition-all"
    />
    <input
      type="text"
      placeholder="Real"
      value={spec.realValue}
      onChange={(e) => onSpecChange(idx, "realValue", e.target.value)}
      className="bg-slate-50/50 border border-slate-200 rounded-lg p-2 text-xs font-bold 
      text-center outline-none focus:bg-white focus:border-blue-500 transition-all"
    />
  </div>
);
