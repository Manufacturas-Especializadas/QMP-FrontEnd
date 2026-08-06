import type { Dispatch, SetStateAction } from "react";

export interface FindingFormState {
  id: number;
  partNumber: string;
  numberOfPieces: number;
  sampleSize: string;
  packerPayroll: number;

  containerIdMatch: boolean | null;
  completeProcess: boolean | null;

  frontView: number;
  sideView: number;
  topView: number;
  isometricView: number;

  ppBom: number;
  weldingDefects: number;

  isProductConforming: boolean;
  shopOrder: string;

  imageFiles: File[];
  existingImageUrls: string;
}

interface FindingChecklistMatrixProps {
  currentFinding: FindingFormState;
  setCurrentFinding: Dispatch<SetStateAction<FindingFormState>>;
}

const checklistItems = [
  {
    label: "Coinciden el ID del contenedor vs ID de la pieza",
    key: "containerIdMatch",
    yesValue: true,
    noValue: false,
  },
  {
    label: "Procesos completos (pieza física vs dibujo)",
    key: "completeProcess",
    yesValue: true,
    noValue: false,
  },
  {
    label: "PP según BOM",
    key: "ppBom",
    yesValue: 1,
    noValue: 2,
  },
  {
    label: "Se detectan defectos de soldadura",
    key: "weldingDefects",
    yesValue: 1,
    noValue: 2,
  },
] as const;

const viewItems = [
  {
    label: "Vista Frontal",
    key: "frontView",
  },
  {
    label: "Vista Lateral",
    key: "sideView",
  },
  {
    label: "Vista Superior",
    key: "topView",
  },
  {
    label: "Vista Isométrica",
    key: "isometricView",
  },
] as const;

const viewOptions = [
  {
    value: 1,
    label: "Cumple",
  },
  {
    value: 2,
    label: "No cumple",
  },
  {
    value: 3,
    label: "N/A",
  },
] as const;

export const FindingChecklistMatrix = ({
  currentFinding,
  setCurrentFinding,
}: FindingChecklistMatrixProps) => {
  const updateChecklistValue = (
    key:
      | "containerIdMatch"
      | "completeProcess"
      | "ppBom"
      | "weldingDefects",
    value: boolean | number,
  ) => {
    setCurrentFinding((previousFinding) => ({
      ...previousFinding,
      [key]: value,
    }));
  };

  const updateViewValue = (
    key: "frontView" | "sideView" | "topView" | "isometricView",
    value: number,
  ) => {
    setCurrentFinding((previousFinding) => ({
      ...previousFinding,
      [key]: value,
    }));
  };

  return (
    <>
      {checklistItems.map((item) => {
        const currentValue = currentFinding[item.key];
        const isYesSelected = currentValue === item.yesValue;
        const isNoSelected = currentValue === item.noValue;

        return (
          <div
            key={item.key}
            className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-150"
          >
            <span className="text-xs font-black text-slate-600 uppercase tracking-tight">
              {item.label}
            </span>

            <div className="flex gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-100">
              <button
                type="button"
                onClick={() =>
                  updateChecklistValue(item.key, item.yesValue)
                }
                className={`px-3 py-1 rounded text-[9px] uppercase font-black cursor-pointer transition-all ${isYesSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-blue-600"
                  }`}
              >
                Sí
              </button>

              <button
                type="button"
                onClick={() =>
                  updateChecklistValue(item.key, item.noValue)
                }
                className={`px-3 py-1 rounded text-[9px] uppercase font-black cursor-pointer transition-all ${isNoSelected
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-rose-600"
                  }`}
              >
                No
              </button>
            </div>
          </div>
        );
      })}

      <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-150">
        {viewItems.map((view) => (
          <div
            key={view.key}
            className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0"
          >
            <span className="text-xs font-bold text-slate-600 uppercase">
              {view.label}
            </span>

            <div className="flex gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-100">
              {viewOptions.map((option) => {
                const isSelected =
                  currentFinding[view.key] === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      updateViewValue(view.key, option.value)
                    }
                    className={`px-2.5 py-1 rounded text-[8px] uppercase font-black transition-all cursor-pointer ${isSelected
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                      }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};