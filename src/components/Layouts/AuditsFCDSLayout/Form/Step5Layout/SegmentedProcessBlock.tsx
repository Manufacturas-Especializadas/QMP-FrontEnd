import { CheckCircle2, HelpCircle } from "lucide-react";
import { DimensionalSpecRow } from "./DimensionalSpecRow";

interface SegmentedProcessBlockProps {
  title1: string;
  title2: string;
  specs: any[];
  sliceIndex: number;
  onSpecChange: (
    index: number,
    key: "expectedValue" | "realValue",
    value: string,
  ) => void;
}

export const SegmentedProcessBlock = ({
  title1,
  title2,
  specs,
  sliceIndex,
  onSpecChange,
}: SegmentedProcessBlockProps) => (
  <div className="space-y-5">
    <div className="p-4 bg-white border-2 border-blue-50 rounded-3xl space-y-3 shadow-xs">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h4
          className="text-[11px] font-black text-blue-700 uppercase tracking-wider flex 
          items-center gap-1"
        >
          <CheckCircle2 size={13} /> {title1}
        </h4>
        <span
          className="text-[9px] font-black uppercase bg-blue-600 text-white px-2 
          py-0.5 rounded-md tracking-widest"
        >
          Obligatorio
        </span>
      </div>
      <div className="space-y-2">
        {specs?.slice(0, sliceIndex).map((spec, idx) => (
          <DimensionalSpecRow
            key={idx}
            spec={spec}
            idx={idx}
            onSpecChange={onSpecChange}
          />
        ))}
      </div>
    </div>

    <div className="p-4 bg-slate-50/70 border border-slate-200/60 rounded-3xl space-y-3">
      <div className="flex justify-between items-center border-b border-slate-200/40 pb-2">
        <h4
          className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex 
          items-center gap-1"
        >
          <HelpCircle size={13} /> {title2}
        </h4>
        <span
          className="text-[9px] font-black uppercase bg-slate-200 text-slate-500 px-2 
          py-0.5 rounded-md tracking-widest"
        >
          Opcional
        </span>
      </div>
      <div className="space-y-2">
        {specs?.slice(sliceIndex).map((spec, idx) => (
          <DimensionalSpecRow
            key={idx + sliceIndex}
            spec={spec}
            idx={idx + sliceIndex}
            onSpecChange={onSpecChange}
          />
        ))}
      </div>
    </div>
  </div>
);
