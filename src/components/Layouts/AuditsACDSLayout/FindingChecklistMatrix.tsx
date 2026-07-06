interface FindingChecklistMatrixProps {
  currentFinding: any;
  setCurrentFinding: React.Dispatch<React.SetStateAction<any>>;
}

export const FindingChecklistMatrix = ({
  currentFinding,
  setCurrentFinding,
}: FindingChecklistMatrixProps) => {
  return (
    <>
      {[
        {
          l: "Coinciden el ID del contenedor vs ID de la pieza",
          k: "containerIdMatch",
          valYes: true,
          valNo: false,
        },
        {
          l: "Procesos completos(Pieza fisica vs dibujo)",
          k: "completeProcess",
          valYes: true,
          valNo: false,
        },
        {
          l: "PP según BOM",
          k: "ppBom",
          valYes: 1,
          valNo: 2,
        },
        {
          l: "Se detectan defectos de soldadura",
          k: "weldingDefects",
          valYes: 1,
          valNo: 2,
        },
      ].map((t) => (
        <div
          key={t.k}
          className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-150"
        >
          <span className="text-xs font-black text-slate-600 uppercase tracking-tight">
            {t.l}
          </span>
          <div className="flex gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-100">
            <button
              type="button"
              onClick={() =>
                setCurrentFinding((p: any) => ({ ...p, [t.k]: true }))
              }
              className={`px-3 py-1 rounded text-[9px] uppercase font-black cursor-pointer transition-all ${currentFinding[t.k] === true ? "bg-blue-600 text-white shadow-sm" : "text-slate-400"}`}
            >
              SÍ
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentFinding((p: any) => ({ ...p, [t.k]: false }))
              }
              className={`px-3 py-1 rounded text-[9px] uppercase font-black cursor-pointer transition-all ${currentFinding[t.k] === false ? "bg-rose-600 text-white shadow-sm" : "text-slate-400"}`}
            >
              NO
            </button>
          </div>
        </div>
      ))}

      <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-150">
        {[
          { label: "Vista Frontal", key: "frontView" },
          { label: "Vista Lateral", key: "sideView" },
          { label: "Vista Superior", key: "topView" },
          { label: "Vista Isométrica", key: "isometricView" },
        ].map((v) => (
          <div
            key={v.key}
            className="flex justify-between items-center py-1.5 border-b border-slate-50 
            last:border-0"
          >
            <span className="text-xs font-bold text-slate-600 uppercase">
              {v.label}
            </span>
            <div className="flex gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-100">
              {[
                { v: 1, l: "Cumple" },
                { v: 2, l: "No Cumple" },
                { v: 3, l: "N/A" },
              ].map((o) => {
                const isSelected = currentFinding[v.key] === o.v;
                return (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() =>
                      setCurrentFinding((p: any) => ({ ...p, [v.key]: o.v }))
                    }
                    className={`px-2.5 py-1 rounded text-[8px] uppercase font-black 
                        transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-800 text-white shadow-sm"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                  >
                    {o.l}
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
