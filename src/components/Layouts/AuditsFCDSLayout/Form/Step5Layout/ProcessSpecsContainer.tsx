import { DimensionalSpecRow } from "./DimensionalSpecRow";
import { VisualChecklistRow } from "./VisualChecklistRow";
import { SegmentedProcessBlock } from "./SegmentedProcessBlock";
import { PROCESS_CONFIGS } from "../processConfigs";

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
  selectedSubProcessIds: number[];
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
  selectedSubProcessIds,
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
    const getLocalSpecs = (id: number) => {
      const configNames =
        PROCESS_CONFIGS[id]?.dimensionalSpecs?.map((s: any) => s.specName) ||
        [];
      return specs.filter((s) => configNames.includes(s.specName));
    };

    const getLocalVisuals = (id: number) => {
      const configNames =
        PROCESS_CONFIGS[id]?.visualChecklists?.map(
          (c: any) => c.checkpointName,
        ) || [];
      return visuals.filter((c) => configNames.includes(c.checkpointName));
    };

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          {visuals.slice(0, 3).map((check, idx) => (
            <VisualChecklistRow
              key={`base-${idx}`}
              check={check}
              idx={idx}
              onChecklistChange={onChecklistChange}
            />
          ))}
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
            Seleccionar Proceso a Integrar
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEGRATION_BUTTONS.map((proc) => {
              const isSelected = selectedSubProcessIds.includes(proc.id);
              return (
                <button
                  key={proc.id}
                  type="button"
                  onClick={() => onSubProcessChange(proc.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-200"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {proc.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 space-y-6">
          {selectedSubProcessIds.includes(2) && (
            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-black text-slate-700 uppercase mb-3">
                Expansión / Reducción
              </h4>
              <SegmentedProcessBlock
                title1="Proceso 1"
                title2="Proceso 2"
                specs={getLocalSpecs(2)}
                sliceIndex={4}
                onSpecChange={(localIdx, key, val) => {
                  const localSpecs = getLocalSpecs(2);
                  const globalIdx = specs.findIndex(
                    (s) => s.specName === localSpecs[localIdx].specName,
                  );
                  if (globalIdx !== -1) onSpecChange(globalIdx, key, val);
                }}
              />
            </div>
          )}

          {selectedSubProcessIds.includes(7) && (
            <div className="space-y-2 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-black text-slate-700 uppercase mb-3">
                Sello
              </h4>
              {getLocalSpecs(7).map((spec, localIdx) => (
                <DimensionalSpecRow
                  key={`p7-${localIdx}`}
                  spec={spec}
                  idx={localIdx}
                  onSpecChange={(_, key, val) => {
                    const globalIdx = specs.findIndex(
                      (s) => s.specName === spec.specName,
                    );
                    if (globalIdx !== -1) onSpecChange(globalIdx, key, val);
                  }}
                />
              ))}
            </div>
          )}

          {[3, 4].map((id) => {
            if (!selectedSubProcessIds.includes(id)) return null;

            const localSpecs = getLocalSpecs(id);
            const localVisuals = getLocalVisuals(id);
            const title = INTEGRATION_BUTTONS.find((b) => b.id === id)?.name;

            return (
              <div
                key={`proc-${id}`}
                className="space-y-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100"
              >
                <h4 className="text-xs font-black text-slate-700 uppercase">
                  {title}
                </h4>

                {localSpecs.length > 0 && (
                  <div className="space-y-2">
                    {localSpecs.map((spec, localIdx) => (
                      <DimensionalSpecRow
                        key={`p${id}-spec-${localIdx}`}
                        spec={spec}
                        idx={localIdx}
                        onSpecChange={(_, key, val) => {
                          const globalIdx = specs.findIndex(
                            (s) => s.specName === spec.specName,
                          );
                          if (globalIdx !== -1)
                            onSpecChange(globalIdx, key, val);
                        }}
                      />
                    ))}
                  </div>
                )}

                {localVisuals.length > 0 && (
                  <div className="space-y-2 border-t border-slate-200/60 pt-3">
                    {localVisuals.map((check, localIdx) => (
                      <VisualChecklistRow
                        key={`p${id}-vis-${localIdx}`}
                        check={check}
                        idx={localIdx}
                        onChecklistChange={(_, val) => {
                          const globalIdx = visuals.findIndex(
                            (v) => v.checkpointName === check.checkpointName,
                          );
                          if (globalIdx !== -1)
                            onChecklistChange(globalIdx, val);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
