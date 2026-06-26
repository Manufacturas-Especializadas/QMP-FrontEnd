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

const INTEGRATION_BUTTONS = [
  { id: 2, name: "Expansión / Reducción" },
  { id: 3, name: "Perforación" },
  { id: 4, name: "Doblez" },
  { id: 7, name: "Sello" },
];

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

  if (processId === 10) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          {visuals.slice(0, 3).map((check, idx) => (
            <VisualChecklistRow
              key={idx}
              check={check}
              idx={idx}
              onChecklistChange={onChecklistChange}
            />
          ))}
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label
            className="text-[10px] font-black uppercase text-slate-400 block 
            tracking-wider"
          >
            Seleccionar Proceso a Integrar
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEGRATION_BUTTONS.map((proc) => (
              <button
                key={proc.id}
                type="button"
                onClick={() => onSubProcessChange(proc.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase 
                      tracking-wider border transition-all cursor-pointer ${
                        selectedSubProcessId === proc.id
                          ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-200"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
              >
                {proc.name}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          {selectedSubProcessId === 2 && (
            <SegmentedProcessBlock
              title1="Proceso 1"
              title2="Proceso 2"
              specs={specs}
              sliceIndex={4}
              onSpecChange={onSpecChange}
            />
          )}

          {selectedSubProcessId === 7 && (
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

          {[3, 4].includes(selectedSubProcessId ?? 0) && (
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
              {visuals.length > 3 && (
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  {visuals.slice(3).map((check, idx) => (
                    <VisualChecklistRow
                      key={idx + 3}
                      check={check}
                      idx={idx + 3}
                      onChecklistChange={onChecklistChange}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
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
