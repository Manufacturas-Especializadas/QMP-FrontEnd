import { Trash2, Save } from "lucide-react";
import { useMemo } from "react";
import { useLines } from "../../hooks/useLines";
import { useShifts } from "../../hooks/useShifts";
import { FloatingSelect } from "../../components/CustomInputs/FloatingSelect";
import { useProcessByLine } from "../../hooks/useProcessByLine";
import { useMachineCodesByProcess } from "../../hooks/useMachineCodesByProcess";
import { Input } from "../../components/CustomInputs/Input";
import { useMaterial } from "../../hooks/useMaterial";
import { useTypeScrap } from "../../hooks/useTypeScrap";
import { useDefectByTypeScrap } from "../../hooks/useDefectByTypeScrap";
import { useScrapForm } from "../../hooks/useCreateScrap";

export const ScrapForm = () => {
  const { formData, loading, handleChange, handleLineClick, handleSubmit } =
    useScrapForm();

  const { lines } = useLines();
  const { shifts } = useShifts();
  const { material } = useMaterial();
  const { typeScrap } = useTypeScrap();

  const { processes, isLoading: loadingProcesses } = useProcessByLine(
    formData.lineId,
  );

  const { machineCodes, isLoading: loadingMachineCodes } =
    useMachineCodesByProcess(formData.processId);

  const { defects, isLoading: loadingDefects } = useDefectByTypeScrap(
    formData.typeScrapId,
  );

  const typeScrapOptions = useMemo(
    () => typeScrap.map((t) => ({ label: t.name, value: t.id })),
    [typeScrap],
  );

  const materialOptions = useMemo(
    () => material.map((m) => ({ label: m.name, value: m.id })),
    [material],
  );

  const processOptions = useMemo(
    () => processes.map((p) => ({ label: p.name, value: p.id })),
    [processes],
  );

  const machineCodesOptions = useMemo(
    () => machineCodes.map((m) => ({ label: m.name, value: m.id })),
    [machineCodes],
  );

  const defectsOptions = useMemo(
    () => defects.map((d) => ({ label: d.name, value: d.id })),
    [defects],
  );

  return (
    <div
      className="max-w-4xl mx-auto bg-white rounded-3xl 
      shadow-xl border border-gray-100 animate-in fade-in duration-500 mt-4 mb-20"
    >
      <div className="bg-secondary p-6 text-white rounded-t-3xl">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trash2 size={24} /> Scrap
        </h2>
        <p className="text-blue-100">
          Completa todos los campos para el reporte de producción
        </p>
      </div>

      <form className="p-8 space-y-8" onSubmit={handleSubmit}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-6 
          rounded-2xl border border-dashed border-gray-200"
        >
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Turno
            </label>
            <div className="flex gap-3">
              {shifts.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleChange("shiftId", s.id)}
                  className={`px-5 py-2 rounded-full border-2 text-sm font-bold transition-all ${
                    formData.shiftId === s.id
                      ? "border-secondary bg-secondary text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-400 hover:border-primary/50"
                  } hover:cursor-pointer`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Línea
            </label>
            <div className="flex flex-wrap gap-2">
              {lines.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => handleLineClick(l.id, l.name)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-2 
                    text-xs font-bold transition-all hover:cursor-pointer ${
                      formData.lineId === l.id
                        ? "border-secondary bg-secondary text-white shadow-md scale-110"
                        : "border-gray-200 bg-white text-gray-400 hover:border-primary/50"
                    }`}
                >
                  {l.name.replace("L-", "")}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-30">
          <FloatingSelect
            label={loadingProcesses ? "Cargando procesos..." : "Proceso"}
            value={formData.processId || ""}
            options={processOptions}
            onChange={(val) => handleChange("processId", val)}
          />

          <FloatingSelect
            label={
              loadingMachineCodes
                ? "Cargando..."
                : machineCodes.length === 0 && formData.processId !== 0
                  ? "No requiere máquina"
                  : "Código de máquina"
            }
            value={formData.machineCodeId || ""}
            options={machineCodesOptions}
            onChange={(val) => handleChange("machineCodeId", val)}
            // disabled={machineCodes.length === 0 || loadingMachineCodes}
          />

          <Input
            type="number"
            label="Número de nómina"
            value={formData.payRollNumber || ""}
            onChange={(e) => handleChange("payRollNumber", e.target.value)}
          />

          <FloatingSelect
            label="Material"
            value={formData.materialId || ""}
            options={materialOptions}
            onChange={(val) => handleChange("materialId", val)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Aleación (Opcional)"
            value={formData.alloy}
            onChange={(e) => handleChange("alloy", e.target.value)}
          />
          <Input
            label="Diametro (Opcional)"
            value={formData.diameter}
            onChange={(e) => handleChange("diameter", e.target.value)}
          />
          <Input
            label="Pared (Opcional)"
            value={formData.wall}
            onChange={(e) => handleChange("wall", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
          <FloatingSelect
            label="Tipo de Scrap"
            value={formData.typeScrapId || ""}
            options={typeScrapOptions}
            onChange={(val) => handleChange("typeScrapId", val)}
          />

          <FloatingSelect
            label={loadingDefects ? "Cargando defectos..." : "Defecto"}
            value={formData.defectId || ""}
            options={defectsOptions}
            onChange={(val) => handleChange("defectId", val)}
            // disabled={!formData.typeScrapId}
          />

          <Input
            type="number"
            label="Peso (kg)"
            value={formData.weight || ""}
            onChange={(e) => handleChange("weight", e.target.value)}
          />

          <Input
            label="RDM"
            value={formData.rdm}
            onChange={(e) => handleChange("rdm", e.target.value)}
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`bg-secondary text-white px-10 py-4 rounded-2xl font-bold flex 
                items-center gap-2 shadow-lg shadow-blue-200 transition-all ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-[1.02] active:scale-[0.98] hover:cursor-pointer"
                }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save size={20} /> Guardar Registro
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
