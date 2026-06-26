import { DimensionalSpecRow } from "./DimensionalSpecRow";
import { VisualChecklistRow } from "./VisualChecklistRow";
import { SegmentedProcessBlock } from "./SegmentedProcessBlock";

interface SpecsContainerProps {
  processId: number;
  specs: any[];
  visuals: any[];
  onSpecChange: (
    index: number,
    key: "expectedValue" | "realValue",
    value: string,
  ) => void;
  onChecklistChange: (index: number, value: number) => void;
  selectedSubProcessId: number | null;
  onSubProcessChange: (subId: number) => void;
}

export const ProcessSpecsContainer = ({
  processId,
  specs,
  visuals,
  onSpecChange,
  onChecklistChange,
  selectedSubProcessId,
  onSubProcessChange,
}: SpecsContainerProps) => {
  if (processId === 2) {
    return (
      <div className="space-y-5">
        <SegmentedProcessBlock
          title1="Proceso 1"
          title2="Proceso 2"
          specs={specs}
          sliceIndex={4}
          onSpecChange={onSpecChange}
        />
        {visuals.length > 0 && (
          <div className="space-y-2 border-t border-slate-100 pt-4">
            {visuals.map((check, idx) => (
              <VisualChecklistRow
                key={idx}
                check={check}
                idx={idx}
                onChecklistChange={onChecklistChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (processId === 5) {
    return (
      <div className="space-y-5">
        <SegmentedProcessBlock
          title1="Extrusión 1"
          title2="Extrusión 2"
          specs={specs}
          sliceIndex={5}
          onSpecChange={onSpecChange}
        />
        {visuals.length > 0 && (
          <div className="space-y-2 border-t border-slate-100 pt-4">
            {visuals.map((check, idx) => (
              <VisualChecklistRow
                key={idx}
                check={check}
                idx={idx}
                onChecklistChange={onChecklistChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (processId === 8) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          {visuals.slice(0, 5).map((check, idx) => (
            <VisualChecklistRow
              key={idx}
              check={check}
              idx={idx}
              onChecklistChange={onChecklistChange}
            />
          ))}
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-3xl space-y-3">
          <div className="border-b border-slate-200/40 pb-2">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
              La configuración de la pieza es correcta
            </h4>
          </div>
          <div className="space-y-2">
            {visuals.slice(5).map((check, idx) => (
              <VisualChecklistRow
                key={idx + 5}
                check={check}
                idx={idx + 5}
                onChecklistChange={onChecklistChange}
                showNA={true}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {specs.length > 0 && (
        <div className="space-y-2">
          {specs.map((spec, idx) => (
            <DimensionalSpecRow
              key={idx}
              spec={spec}
              idx={idx}
              onSpecChange={onSpecChange}
            />
          ))}
        </div>
      )}

      {visuals.length > 0 && (
        <div className="space-y-2 border-t border-slate-100 pt-3">
          {visuals.map((check, idx) => (
            <VisualChecklistRow
              key={idx}
              check={check}
              idx={idx}
              onChecklistChange={onChecklistChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};
