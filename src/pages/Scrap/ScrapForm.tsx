import { 
  Save, 
  ArrowLeft, 
  Clock, 
  Layers, 
  Settings, 
  Box, 
  AlertOctagon,
  Trash2,
  Plus,
  Check,
  X,
  Edit2,
  FileBox
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useLines } from "../../hooks/useLines";
import { useShifts } from "../../hooks/useShifts";
import { FloatingSelect } from "../../components/CustomInputs/FloatingSelect";
import { useProcessByLine } from "../../hooks/useProcessByLine";
import { useMachineCodesByProcess } from "../../hooks/useMachineCodesByProcess";
import { Input } from "../../components/CustomInputs/Input";
import { useMaterial } from "../../hooks/useMaterial";
import { useTypeScrap } from "../../hooks/useTypeScrap";
import { useDefectByTypeScrap } from "../../hooks/useDefectByTypeScrap";
import { useScrapForm, type ScrapFormState } from "../../hooks/useCreateScrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { scrapService } from "../../api/services/ScrapService";

export const ScrapForm = () => {
  const { formData, setFormData, resetPartial, loading, handleChange, handleLineClick, handleSubmit } =
    useScrapForm();

  const { lines } = useLines();
  const { shifts } = useShifts();
  const { material } = useMaterial();
  const { typeScrap } = useTypeScrap();

  const { processes, isLoading: loadingProcesses } = useProcessByLine(
    formData.lineId,
  );
  const { machineCodes, isLoading: loadingMachineCodes } = useMachineCodesByProcess(formData.processId);
  const { defects, isLoading: loadingDefects } = useDefectByTypeScrap(
    formData.typeScrapId,
  );

  const [reports, setReports] = useState<ScrapFormState[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const [showValidationErrors, setShowValidationErrors] = useState(false);

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

  const navigate = useNavigate();

  const handleSaveReportToStack = () => {
    const isShiftValid = formData.shiftId !== 0;
    const isLineValid = formData.lineId !== 0;
    const isProcessValid = formData.processId !== 0;
    const isPayRollValid = Number(formData.payRollNumber) > 0;
    const isMaterialValid = formData.materialId !== 0;
    const isTypeScrapValid = formData.typeScrapId !== 0;
    const isDefectValid = formData.defectId !== 0;
    const isWeightValid = Number(formData.weight) > 0;
    const isMachineCodeValid = machineCodes.length === 0 || formData.machineCodeId !== 0;

    if (
      !isShiftValid ||
      !isLineValid ||
      !isProcessValid ||
      !isMachineCodeValid ||
      !isPayRollValid ||
      !isMaterialValid ||
      !isTypeScrapValid ||
      !isDefectValid ||
      !isWeightValid
    ) {
      setShowValidationErrors(true);
      toast.error("Por favor completa todos los campos obligatorios antes de agregar el reporte.");
      return;
    }

    const currentProcessName = processOptions.find(o => o.value === formData.processId)?.label || "N/A";
    const currentDefectName = defectsOptions.find(o => o.value === formData.defectId)?.label || "N/A";

    const reportData: any = {
      ...formData,
      id: editingIndex !== null ? (reports[editingIndex] as any).id : (formData as any).id, 
      processName: currentProcessName,
      defectName: currentDefectName,
    };

    if (editingIndex !== null) {
      const updatedReports = [...reports];
      updatedReports[editingIndex] = reportData;
      setReports(updatedReports);
      setEditingIndex(null);
    } else {
      setReports([reportData, ...reports]);
    }

    setShowValidationErrors(false);

    if (resetPartial) resetPartial();
  };

  const handleEditReport = (index: number) => {
    setEditingIndex(index);
    setShowValidationErrors(false);
    const reportToEdit = reports[index];
    
    if (setFormData) {
      setFormData(reportToEdit);
    }
  };

  const handleDeleteReport = (index: number) => {
    setReports(reports.filter((_, i) => i !== index));
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setShowValidationErrors(false);
    if (resetPartial) resetPartial();
  };

  const getLabel = (options: any[], id: any) => options.find(o => o.value === id)?.label || "N/A";

  const onFinalSubmit = async () => {
    if (isEditMode && editScrapId) {
      try {
        const updatePayload = reports.map((r: any) => ({
          id: r.id || 0,
          payRollNumber: Number(r.payRollNumber),
          processId: Number(r.processId),
          machineCodeId: Number(r.machineCodeId) || null,
          alloy: r.alloy || "",
          diameter: r.diameter || "",
          wall: r.wall || "",
          weight: Number(r.weight),
          rdm: r.rdm || "",
          materialId: Number(r.materialId),
          typeScrapId: Number(r.typeScrapId),
          defectId: Number(r.defectId),
          partNumber: r.partNumber
        }));

        await scrapService.updateScrap(editScrapId, updatePayload);
        toast.success("Reporte actualizado correctamente");
        setReports([]);
        setShowValidationErrors(false);
        navigate("/scrap");
      } catch (error) {
        console.error("Error al actualizar el reporte", error);
        toast.error("Ocurrió un error al actualizar los datos.");
      }
      return;
    }

    if (handleSubmit) {
      await handleSubmit(reports);
      setReports([]); 
      setShowValidationErrors(false);
      navigate("/scrap");
    }
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [editScrapId, setEditScrapId] = useState<number | null>(null);
  const location = useLocation();
  const editReport = location.state?.editReport;

  useEffect(() => {
    if (editReport) {
      setIsEditMode(true);
      setEditScrapId(editReport.id);

      const mappedReports = editReport.scrapDetails.map((detail: any) => ({
        id: detail.id,
        shiftId: editReport.shiftId,
        lineId: editReport.lineId,
        processId: detail.processId ?? 0,
        machineCodeId: detail.machineCodeId ?? 0,
        payRollNumber: detail.payRollNumber ?? "",
        materialId: detail.materialId ?? 0,
        typeScrapId: detail.typeScrapId ?? 0,
        defectId: detail.defectId ?? 0,
        weight: detail.weight ?? 0,
        rdm: detail.rdm || "",
        alloy: detail.alloy || "",
        diameter: detail.diameter || "",
        wall: detail.wall || "",
        processName: detail.processName || "",
        defectName: detail.defectName || "",
        partNumber: detail.partNumber || "",
      }));

      setReports(mappedReports);

      if (setFormData) {
        setFormData((prev: any) => ({
          ...prev,
          shiftId: editReport.shiftId ?? 0,
          lineId: editReport.lineId ?? 0,
        }));
      }
    }
  }, [editReport, setFormData]);

  const isBaseInfoLocked = isEditMode || reports.length > 0;

  return (
    <div className="max-w-350 mx-auto mt-8 mb-20 px-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
      
      
      <div className="relative bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] shadow-blue-900/5 rounded-[2.5rem] p-6 sm:p-10">
        
        
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-400/10 blur-3xl rounded-full" />
        </div>

        <div className="mb-8 border-b border-slate-200/60 pb-5">
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <Trash2 className="text-blue-600" size={28} /> {isEditMode ? "Editar Reporte de Scrap" : "Reporte de Scrap"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
      {isEditMode 
      ? `Estás modificando la información del reporte #${editScrapId}.` 
      : "Completa todos los campos para registrar el reporte de producción y agrégalos a tu lista."}
  </p>
        </div>


        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 relative z-10">
          
          <div className="xl:col-span-3 space-y-8">
            
            <div className="grid grid-cols-1 gap-8">
              

              <div className="space-y-3">
                <label className="text-xs uppercase font-black text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Clock size={14} className="text-blue-500" /> Seleccionar Turno
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {shifts.map((shift) => (
                    <button
                      key={shift.id}
                      type="button"
                      disabled={isBaseInfoLocked}
                      onClick={() => handleChange("shiftId", shift.id)}
                      className={`p-4 rounded-2xl border font-bold text-xs uppercase tracking-wider 
                 transition-all ${isBaseInfoLocked ? "cursor-not-allowed opacity-60 bg-slate-100" : "cursor-pointer"} ${formData.shiftId === shift.id // <--- CAMBIO AQUÍ
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : showValidationErrors && !formData.shiftId
                            ? "bg-red-50 border-red-500 text-red-600 hover:bg-red-100/50"
                            : "bg-white/80 border-slate-200 text-slate-600 hover:bg-white"
                        }`}
                    >
                      {shift.name}
                    </button>
                  ))}
                </div>
              </div>


              <div className="space-y-3">
                <label className="text-xs uppercase font-black text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Layers size={14} className="text-blue-500" /> Seleccionar Línea
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-5 gap-2 max-h-48 overflow-y-auto pr-1">
                  {lines.map((l) => {
                    const isSelected = formData.lineId === l.id;
                    const isError = showValidationErrors && !formData.lineId;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        disabled={isBaseInfoLocked}
                        onClick={() => handleLineClick(l.id, l.name)}
                        className={`p-3.5 rounded-xl text-left border font-bold text-xs 
        transition-all flex justify-between items-center ${isBaseInfoLocked ? "cursor-not-allowed opacity-60 bg-slate-100" : "cursor-pointer"} ${isSelected // <--- CAMBIO AQUÍ
                            ? "bg-blue-50 border-blue-500 text-blue-700"
                            : isError
                              ? "bg-red-50 border-red-500 text-red-700 hover:bg-red-100/50"
                              : "bg-white/80 border-slate-200 text-slate-600 hover:bg-white"
                          }`}
                      >
                        {l.name.replace("L-", "")}
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center text-[9px] min-w-4 ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white"
                              : isError
                              ? "border-red-400 bg-red-100 text-red-700 font-bold animate-pulse"
                              : "border-slate-200 bg-slate-50"
                          }`}
                        >
                          {isSelected && "✓"}
                          {isError && !isSelected && "!"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <hr className="border-slate-200/60" />


            <div className="space-y-4 relative z-40">
              <label className="text-xs uppercase font-black text-slate-500 tracking-wider flex items-center gap-1.5">
                <Settings size={14} className="text-blue-500" /> Proceso y Operador
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={`transition-all duration-300 rounded-xl ${showValidationErrors && !formData.processId ? "ring-2 ring-red-500/50" : ""}`}>
                  <FloatingSelect
                    label={loadingProcesses ? "Cargando procesos..." : "Proceso"}
                    value={formData.processId || ""}
                    options={processOptions}
                    onChange={(val) => handleChange("processId", val)}
                  />
                </div>
                <div className={`transition-all duration-300 rounded-xl ${showValidationErrors && (machineCodes.length > 0 && !formData.machineCodeId) ? "ring-2 ring-red-500/50" : ""}`}>
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
                  />
                </div>
                <div className={`transition-all duration-300 rounded-xl sm:col-span-2 lg:col-span-1 ${showValidationErrors && (!formData.payRollNumber || Number(formData.payRollNumber) <= 0) ? "ring-2 ring-red-500/50" : ""}`}>
                  <Input
                    type="number"
                    label="Número de nómina"
                    value={formData.payRollNumber || ""}
                    onChange={(e) => handleChange("payRollNumber", e.target.value)}
                  />
                </div>
              </div>
            </div>


            <div className="space-y-4 relative z-30">
              <label className="text-xs uppercase font-black text-slate-500 tracking-wider flex items-center gap-1.5">
                <Box size={14} className="text-blue-500" /> Detalles del Material
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`transition-all duration-300 rounded-xl ${showValidationErrors && !formData.materialId ? "ring-2 ring-red-500/50" : ""}`}>
                  <FloatingSelect
                    label="Material"
                    value={formData.materialId || ""}
                    options={materialOptions}
                    onChange={(val) => handleChange("materialId", val)}
                  />
                </div>
                <Input
                  label="Aleación (Opcional)"
                  value={formData.alloy || ""}
                  onChange={(e) => handleChange("alloy", e.target.value)}
                />
                <Input
                  label="Diámetro (Opcional)"
                  value={formData.diameter || ""}
                  onChange={(e) => handleChange("diameter", e.target.value)}
                />
                <Input
                  label="Pared (Opcional)"
                  value={formData.wall || ""}
                  onChange={(e) => handleChange("wall", e.target.value)}
                />
                <Input
                  label="Num Parte (Opcional)"
                  value={formData.partNumber || ""}
                  onChange={(e) => handleChange("partNumber", e.target.value)}
                />
              </div>
            </div>


            <div className="space-y-4 relative z-20">
              <label className="text-xs uppercase font-black text-slate-500 tracking-wider flex items-center gap-1.5">
                <AlertOctagon size={14} className="text-blue-500" /> Detalles del Hallazgo
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`transition-all duration-300 rounded-xl ${showValidationErrors && !formData.typeScrapId ? "ring-2 ring-red-500/50" : ""}`}>
                  <FloatingSelect
                    label="Tipo de Scrap"
                    value={formData.typeScrapId || ""}
                    options={typeScrapOptions}
                    onChange={(val) => handleChange("typeScrapId", val)}
                  />
                </div>
                <div className={`transition-all duration-300 rounded-xl ${showValidationErrors && !formData.defectId ? "ring-2 ring-red-500/50" : ""}`}>
                  <FloatingSelect
                    label={loadingDefects ? "Cargando defectos..." : "Defecto"}
                    value={formData.defectId || ""}
                    options={defectsOptions}
                    onChange={(val) => handleChange("defectId", val)}
                  />
                </div>
                <div className={`transition-all duration-300 rounded-xl ${showValidationErrors && (!formData.weight || Number(formData.weight) <= 0) ? "ring-2 ring-red-500/50" : ""}`}>
                  <Input
                    type="number"
                    label="Peso (kg)"
                    value={formData.weight || ""}
                    onChange={(e) => handleChange("weight", e.target.value)}
                  />
                </div>
                <Input
                  label="RDM"
                  value={formData.rdm || ""}
                  onChange={(e) => handleChange("rdm", e.target.value)}
                />
              </div>
            </div>


            <div className="pt-2 flex gap-2">
              {editingIndex !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-4 bg-slate-200 text-slate-600 font-black text-xs uppercase 
      rounded-xl flex items-center gap-2 hover:bg-slate-300 transition-all cursor-pointer"
                >
                  <X size={16} /> Cancelar
                </button>
              )}

              {!(isEditMode && editingIndex === null) && (
                <button
                  type="button"
                  onClick={handleSaveReportToStack}
                  className={`flex-1 py-4 font-black text-xs uppercase tracking-wider rounded-xl border flex 
      items-center justify-center gap-2 cursor-pointer transition-all ${editingIndex !== null
                      ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200"
                      : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200"
                    }`}
                >
                  {editingIndex !== null ? (
                    <>
                      <Check size={16} /> Confirmar Cambios
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> Agregar Reporte a la Lista
                    </>
                  )}
                </button>
              )}
            </div>
          </div>


          <div className="xl:col-span-2 flex flex-col justify-between border-t xl:border-t-0 xl:border-l border-slate-200/60 pt-8 xl:pt-0 xl:pl-8">
            
            <div className="flex-1 space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <FileBox size={16} /> Lotes en esta Inspección ({reports.length})
              </h3>
              
              <div className="space-y-3 max-h-150 overflow-y-auto pr-2 custom-scrollbar">
                {reports.length === 0 ? (
                  <div className="bg-slate-50/50 border border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-300 mb-2">
                      <FileBox size={24} />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Aún no has agregado reportes
                    </span>
                    <p className="text-xs text-slate-400">
                      Llena el formulario y presiona "Agregar" para apilar tus lotes aquí.
                    </p>
                  </div>
                ) : (
                  reports.map((report, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-2xl border transition-all ${
                        editingIndex === idx 
                          ? "bg-amber-50 border-amber-300 shadow-md shadow-amber-100/50" 
                          : "bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-black uppercase text-slate-800 tracking-wider">
                          Reporte #{reports.length - idx}
                        </span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditReport(idx)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Editar"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteReport(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-3">
                        <div>
                          <p className="text-[9px] uppercase font-bold text-slate-400">Proceso</p>
                          <p className="text-xs font-medium text-slate-700 truncate">
                            {report.processName || getLabel(processOptions, report.processId)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-bold text-slate-400">Defecto</p>
                          <p className="text-xs font-medium text-slate-700 truncate">
                            {report.defectName || getLabel(defectsOptions, report.defectId)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-bold text-slate-400">Peso</p>
                          <p className="text-xs font-medium text-slate-700">{report.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-bold text-slate-400">Nómina</p>
                          <p className="text-xs font-medium text-slate-700">{report.payRollNumber}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-200/60 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                disabled={loading || editingIndex !== null}
                onClick={() => navigate("/scrap")}
                className="w-full sm:w-auto px-5 py-4 bg-white/80 backdrop-blur-md border border-slate-200 
                  text-slate-500 hover:bg-slate-50 font-black text-xs uppercase tracking-wider 
                  rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <ArrowLeft size={14} /> Atrás
              </button>
              
              <button
                type="button" 
                disabled={reports.length === 0 || loading || editingIndex !== null}
                onClick={onFinalSubmit}
                className={`w-full flex-1 px-6 py-4 font-black text-xs 
                  uppercase tracking-wider rounded-xl transition-all flex items-center 
                  justify-center gap-2 cursor-pointer disabled:pointer-events-none shadow-md ${
                    reports.length === 0 || editingIndex !== null
                      ? "bg-slate-200 text-slate-400"
                      : "bg-slate-800 hover:bg-slate-900 text-white shadow-slate-800/20"
                  }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={16} /> {isEditMode ? "Actualizar Reportes" : "Finalizar Reportes"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
