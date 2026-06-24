import { Pencil, Trash2 } from "lucide-react";

interface FindingBucketListProps {
  findings: any[];
  editingIndex: number | null;
  onSelectEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

export const FindingBucketList = ({
  findings,
  editingIndex,
  onSelectEdit,
  onRemove,
}: FindingBucketListProps) => {
  return (
    <div className="max-h-112 overflow-y-auto space-y-2 pr-1">
      {findings.length === 0 ? (
        <div className="text-center p-8 border border-slate-100 rounded-2xl text-xs font-semibold text-slate-400 bg-slate-50/40">
          Aún no has agregado números de parte a la lista.
        </div>
      ) : (
        findings.map((f, i) => {
          const isItemBeingEdited = editingIndex === i;
          return (
            <div
              key={i}
              className={`border rounded-xl p-3 flex justify-between items-center shadow-sm transition-all ${
                isItemBeingEdited
                  ? "bg-amber-50/40 border-amber-300 ring-1 ring-amber-300"
                  : "bg-white border-slate-100"
              }`}
            >
              <div className="space-y-0.5 min-w-0">
                <span className="text-xs font-black text-slate-700 block uppercase truncate">
                  {f.partNumber}
                </span>
                <div className="flex gap-2 text-[10px] text-slate-400 font-bold">
                  <span className="text-blue-600 font-extrabold">
                    {f.numberOfPieces} Pzas
                  </span>
                  <span>•</span>
                  <span
                    className={
                      f.isProductConforming
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }
                  >
                    {f.isProductConforming ? "Conforme" : "Rechazado"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectEdit(i)}
                  disabled={isItemBeingEdited}
                  className="p-2 text-slate-400 hover:text-blue-600 rounded-lg cursor-pointer disabled:opacity-30"
                >
                  <Pencil size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
