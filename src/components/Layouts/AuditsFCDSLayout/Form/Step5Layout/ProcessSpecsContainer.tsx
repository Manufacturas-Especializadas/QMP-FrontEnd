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
}

export const ProcessSpecsContainer = ({
  processId,
  specs,
  visuals,
  onSpecChange,
  onChecklistChange,
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
