import { ArrowLeft, ArrowRight, Loader2, Cpu } from "lucide-react";
import type { Traceability } from "../../../../types/types";
import { useMachinesByLines } from "../../../../hooks/useMachinesByLines";
import { useCategoryOperator } from "../../../../hooks/useCategoryOperators";
import { useTypeMeasuringEquipment } from "../../../../hooks/useTypeMeasuringEquipment";
import { usePipeDiameters } from "../../../../hooks/usePipeDiameters";
import { useWallsOfDiameters } from "../../../../hooks/useWallsOfDiameters";

interface Step2Props {
  data: Traceability;
  updateFields: (fields: Partial<Traceability>) => void;
  onNext: () => void;
  onBack: () => void;
  selectedLineIds: number[];
}

export const Step2Traceability = ({
  data,
  updateFields,
  onNext,
  onBack,
  selectedLineIds,
}: Step2Props) => {
  const { machines, loadingMachines } = useMachinesByLines(selectedLineIds);
  const { category } = useCategoryOperator();
  const { equipment } = useTypeMeasuringEquipment();
  const { pipeDiameter } = usePipeDiameters();
  const { wallsDiameters } = useWallsOfDiameters();

  const toggleMachine = (machineId: number) => {
    const currentMachines = [...data.machineCodeIds];
    if (currentMachines.includes(machineId)) {
      updateFields({
        machineCodeIds: currentMachines.filter((id) => id !== machineId),
      });
    } else {
      updateFields({ machineCodeIds: [...currentMachines, machineId] });
    }
  };

  const handleSerialChange = (index: number, value: string) => {
    const updatedSerials = [...data.equipmentSerials];
    updatedSerials[index] = value;
    updateFields({ equipmentSerials: updatedSerials });
  };

  const isValid =
    data.machineCodeIds.length > 0 &&
    data.operatorsPayroll.trim() !== "" &&
    data.categoryId > 0 &&
    data.equipmentSerials[0].trim() === "";

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-3">
        <label className="text-xs uppercase font-black text-slate-400 tracking-wider block">
          Códigos de Máquina Asociados (Selección Múltiple)
        </label>

        {loadingMachines ? (
          <div
            className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex 
            items-center justify-center gap-2 text-sm font-bold text-slate-400"
          >
            <Loader2 className="animate-spin text-blue-600" size={18} />
            Filtrando maquinaria de planta...
          </div>
        ) : machines.length === 0 ? (
          <div
            className="p-6 bg-amber-50/50 border border-amber-100 rounded-2xl text-center 
            text-xs font-bold text-amber-700"
          >
            No hay máquinas registradas para las líneas seleccionadas en el Paso
            1.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-40 overflow-y-auto pr-1">
            {machines.map((mac) => {
              const isSelected = data.machineCodeIds.includes(mac.id);
              return (
                <button
                  key={mac.id}
                  type="button"
                  onClick={() => toggleMachine(mac.id)}
                  className={`p-3 rounded-xl border text-left font-black text-xs uppercase tracking-tight transition-all 
                    flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                        : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                    }`}
                >
                  <Cpu
                    size={14}
                    className={isSelected ? "text-white" : "text-slate-400"}
                  />
                  <span className="truncate">{mac.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs uppercase font-black text-slate-400 tracking-wider">
            Nómina del Operador
          </label>
          <input
            type="text"
            placeholder="Ej: 004291"
            value={data.operatorsPayroll}
            onChange={(e) => updateFields({ operatorsPayroll: e.target.value })}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 
            text-sm font-medium outline-none focus:bg-white focus:border-blue-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs uppercase font-black text-slate-400 tracking-wider">
            Categoría del Operador
          </label>
          <select
            value={data.categoryId || ""}
            onChange={(e) =>
              updateFields({ categoryId: Number(e.target.value) })
            }
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 
            text-sm font-medium outline-none focus:bg-white focus:border-blue-500"
          >
            <option value="">-- Seleccione Categoría --</option>
            {category.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs uppercase font-black text-slate-400 tracking-wider">
          Tipo de Equipo de Medición
        </label>
        <select
          value={data.typeMeasuringEquipmentId || ""}
          onChange={(e) =>
            updateFields({
              typeMeasuringEquipmentId: e.target.value
                ? Number(e.target.value)
                : null,
            })
          }
          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 
          text-sm font-medium outline-none focus:bg-white focus:border-blue-500"
        >
          <option value="">-- Seleccione Tipo --</option>
          {equipment.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-3">
        <label className="text-xs uppercase font-black text-slate-500 tracking-wider block">
          IDs de Equipos de Medición
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="ID Equipo 1 (Ej: VER-08)"
            required
            value={data.equipmentSerials[0] || ""}
            onChange={(e) => handleSerialChange(0, e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs 
            font-bold outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="ID Equipo 2 (Opcional)"
            value={data.equipmentSerials[1] || ""}
            onChange={(e) => handleSerialChange(1, e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs 
            font-bold outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-medium">
        <input
          type="text"
          placeholder="Shop Order"
          value={data.shopOrder || ""}
          onChange={(e) => updateFields({ shopOrder: e.target.value })}
          className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none 
          focus:bg-white focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Lote de Tubería"
          value={data.batchPipe || ""}
          onChange={(e) => updateFields({ batchPipe: e.target.value })}
          className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none 
          focus:bg-white focus:border-blue-500"
        />
        <select
          value={data.pipeDiameterId || ""}
          onChange={(e) =>
            updateFields({
              pipeDiameterId: e.target.value ? Number(e.target.value) : null,
            })
          }
          className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none 
          focus:bg-white focus:border-blue-500"
        >
          <option value="">Diámetro Tubería</option>
          {pipeDiameter.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>

        <select
          value={data.pipeWallId || ""}
          onChange={(e) =>
            updateFields({
              pipeWallId: e.target.value ? Number(e.target.value) : null,
            })
          }
          className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none 
          focus:bg-white focus:border-blue-500"
        >
          <option value="">Pared de tubería</option>
          {wallsDiameters.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      <div className="pt-2 flex justify-between items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold 
          text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all flex items-center 
          gap-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Atrás
        </button>
        <button
          type="button"
          disabled={!isValid || loadingMachines}
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase 
          tracking-wider px-6 py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all flex 
          items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Controles del Proceso <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
