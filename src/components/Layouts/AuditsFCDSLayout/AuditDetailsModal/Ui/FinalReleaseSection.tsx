import { BarChart3 } from "lucide-react";
import { EvalBadge } from "./Badges";

export const FinalReleaseSection = ({ data }: { data: any }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
    <div
      className="flex items-center gap-2 border-b border-slate-50 pb-2 text-slate-800 
      font-black text-xs uppercase tracking-wider"
    >
      <BarChart3 size={14} className="text-blue-500" /> Liberación Final de
      Producto
    </div>
    <div className="max-h-37.5 overflow-y-auto pr-1 text-xs custom-scrollbar">
      {data.dimensionalSpecs && data.dimensionalSpecs.length > 0 && (
        <table className="w-full text-left border-collapse mb-4">
          <thead>
            <tr
              className="text-[10px] uppercase text-slate-400 font-bold border-b 
              border-slate-100"
            >
              <th className="pb-1.5">Especificación</th>
              <th className="pb-1.5 text-center">Esp.</th>
              <th className="pb-1.5 text-center">Real</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
            {data.dimensionalSpecs.map((spec: any, i: number) => (
              <tr key={i}>
                <td className="py-2 text-slate-700">{spec.specName}</td>
                <td className="py-2 text-center text-slate-400 font-medium">
                  {spec.expectedValue}
                </td>
                <td className="py-2 text-center text-blue-600">
                  {spec.realValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {data.visualChecklists && data.visualChecklists.length > 0 && (
        <div className="space-y-2">
          {data.visualChecklists.map((vis: any, i: number) => (
            <div
              key={i}
              className="flex justify-between items-center font-bold text-slate-600 
              border-b border-slate-50 pb-1.5"
            >
              <span>{vis.checkpointName}</span>
              <EvalBadge val={vis.resultValue} />
            </div>
          ))}
        </div>
      )}

      {!data.dimensionalSpecs?.length && !data.visualChecklists?.length && (
        <div className="text-center text-slate-400 py-6 font-semibold">
          Sin especificaciones cargadas.
        </div>
      )}
    </div>
  </div>
);
