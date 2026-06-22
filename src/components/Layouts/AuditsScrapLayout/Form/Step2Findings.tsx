import {
  Camera,
  PenTool,
  FileImage,
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  Pencil,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { CreateAuditScrapPayload } from "../../../../types/types";
import { SignaturePad } from "../SignaturePad";
import { useTypeScrap } from "../../../../hooks/useTypeScrap";

interface Step2Props {
  data: CreateAuditScrapPayload;
  updateFields: (fields: Partial<CreateAuditScrapPayload>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSaving: boolean;
}

export const Step2Findings = ({
  data,
  updateFields,
  onBack,
  onSubmit,
  isSaving,
}: Step2Props) => {
  const { typeScrap, refresh } = useTypeScrap();
  const [isPadOpen, setIsPadOpen] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (refresh) {
      refresh();
    }
  }, [typeScrap]);

  const [currentFinding, setCurrentFinding] = useState({
    id: 0,
    typeScrapId: 0,
    estimatedWeight: 0,
    materialCorrectlyIdentified: 1,
    materialCorrectlySegregated: 1,
    unreportedReason: "",
    imageFiles: [] as File[],
    signatureFile: null as File | null,
    keepImageUrl: null as string | null,
    keepSignatureUrl: null as string | null,
  });

  const handleSelectEdit = (index: number) => {
    setEditingIndex(index);
    const finding = data.findings[index];

    setCurrentFinding({
      id: finding.id ?? 0,
      typeScrapId: finding.typeScrapId,
      estimatedWeight: finding.estimatedWeight,
      materialCorrectlyIdentified: finding.materialCorrectlyIdentified,
      materialCorrectlySegregated: finding.materialCorrectlySegregated,
      unreportedReason: finding.unreportedReason ?? "",
      imageFiles: finding.imageFiles ?? [],
      signatureFile: finding.signatureFile ?? null,
      keepImageUrl: (finding as any).keepImageUrl ?? null,
      keepSignatureUrl: (finding as any).keepSignatureUrl ?? null,
    });
  };

  const handleSaveFinding = () => {
    if (
      currentFinding.typeScrapId === 0 ||
      currentFinding.estimatedWeight <= 0
    ) {
      alert("Por favor rellena el Tipo de Scrap y el Peso Estimado.");
      return;
    }

    if (editingIndex !== null) {
      const updatedFindings = [...data.findings];
      updatedFindings[editingIndex] = { ...currentFinding };
      updateFields({ findings: updatedFindings });
      setEditingIndex(null);
    } else {
      updateFields({ findings: [...data.findings, { ...currentFinding }] });
    }

    resetForm();
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    resetForm();
  };

  const resetForm = () => {
    setCurrentFinding({
      id: 0,
      typeScrapId: 0,
      estimatedWeight: 0,
      materialCorrectlyIdentified: 1,
      materialCorrectlySegregated: 1,
      unreportedReason: "",
      imageFiles: [],
      signatureFile: null,
      keepImageUrl: null,
      keepSignatureUrl: null,
    });
  };

  const handleRemoveFinding = (index: number) => {
    if (editingIndex === index) {
      setEditingIndex(null);
      resetForm();
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
    updateFields({ findings: data.findings.filter((_, i) => i !== index) });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles = [...currentFinding.imageFiles, ...selectedFiles];

    if (totalFiles.length > 3) {
      alert(
        "El estándar corporativo MESA restringe la carga a un máximo de 3 fotografías de evidencia.",
      );
      setCurrentFinding((p) => ({ ...p, imageFiles: totalFiles.slice(0, 3) }));
    } else {
      setCurrentFinding((p) => ({ ...p, imageFiles: totalFiles }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-in fade-in duration-200">
      <div
        className="lg:col-span-3 space-y-4 bg-slate-50/50 p-5 rounded-3xl border 
        border-slate-100 relative"
      >
        {editingIndex !== null && (
          <div
            className="absolute right-5 top-4 bg-amber-50 border border-amber-200 
            text-amber-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md 
            animate-in fade-in"
          >
            Editando Contenedor #{editingIndex + 1}
          </div>
        )}

        <h3
          className="text-xs font-black text-slate-700 uppercase tracking-wider 
          border-b border-slate-200/60 pb-2"
        >
          {editingIndex !== null
            ? "Modificar Datos del Contenedor"
            : "Capturar Nuevo Lote / Contenedor"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 block">
              Tipo de Scrap
            </label>
            <select
              value={currentFinding.typeScrapId}
              onChange={(e) =>
                setCurrentFinding((p) => ({
                  ...p,
                  typeScrapId: Number(e.target.value),
                }))
              }
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 
              text-xs font-bold text-slate-700 outline-none focus:border-blue-500 
              cursor-pointer"
            >
              <option value="0">-- Seleccionar --</option>
              {typeScrap?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 block">
              Peso Estimado (KG)
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={currentFinding.estimatedWeight || ""}
              onChange={(e) =>
                setCurrentFinding((p) => ({
                  ...p,
                  estimatedWeight: Number(e.target.value),
                }))
              }
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 
              text-xs font-bold outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {["Identificación de Material", "Segregación de Contenedor"].map(
          (label, idx) => {
            const key =
              idx === 0
                ? "materialCorrectlyIdentified"
                : "materialCorrectlySegregated";
            const currentVal =
              idx === 0
                ? currentFinding.materialCorrectlyIdentified
                : currentFinding.materialCorrectlySegregated;

            return (
              <div
                key={label}
                className="flex justify-between items-center bg-white p-3 rounded-xl 
                border border-slate-150"
              >
                <span className="text-xs font-black text-slate-600 uppercase tracking-tight">
                  {label}
                </span>
                <div
                  className="flex gap-1 bg-slate-50 p-0.5 rounded-lg border 
                  border-slate-100"
                >
                  {[
                    { v: 1, l: "Cumple" },
                    { v: 2, l: "No Cumple" },
                    { v: 3, l: "N/A" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() =>
                        setCurrentFinding((p) => ({ ...p, [key]: o.v }))
                      }
                      className={`px-3 py-1 rounded text-[9px] uppercase font-black transition-all cursor-pointer ${
                        currentVal === o.v
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            );
          },
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 block">
            Descripción y Observaciones del Hallazgo
          </label>
          <textarea
            rows={2}
            value={currentFinding.unreportedReason}
            onChange={(e) =>
              setCurrentFinding((p) => ({
                ...p,
                unreportedReason: e.target.value,
              }))
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-3 
            py-2 text-xs font-bold outline-none focus:border-blue-500 shadow-inner"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <label
            className={`border border-dashed p-3 rounded-xl flex items-center 
              justify-center gap-2 text-xs font-bold cursor-pointer transition-all 
                relative overflow-hidden bg-white ${
                  currentFinding.imageFiles.length > 0 ||
                  currentFinding.keepImageUrl
                    ? "border-emerald-300 text-emerald-700"
                    : "border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600"
                }`}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Camera size={14} />
            <span className="truncate">
              {currentFinding.imageFiles.length > 0
                ? `Nuevas Fotos (${currentFinding.imageFiles.length}/3)`
                : currentFinding.keepImageUrl
                  ? "Fotos en Azure ✓ (Reemplazar)"
                  : "Cargar Fotos (Max 3)"}
            </span>
          </label>

          <button
            type="button"
            onClick={() => setIsPadOpen(true)}
            className={`border border-dashed p-3 rounded-xl flex items-center 
              justify-center gap-2 text-xs font-bold cursor-pointer transition-all 
              bg-white ${
                currentFinding.signatureFile || currentFinding.keepSignatureUrl
                  ? "border-emerald-300 text-emerald-700"
                  : "border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600"
              }`}
          >
            <PenTool size={14} />
            <span className="truncate">
              {currentFinding.signatureFile
                ? "Nueva Firma Plasmada ✓"
                : currentFinding.keepSignatureUrl
                  ? "Firma en Azure ✓ (Reemplazar)"
                  : "Firma Supervisor"}
            </span>
          </button>
        </div>

        {currentFinding.imageFiles.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5 p-2 bg-white rounded-xl border 
            border-slate-100 animate-in fade-in"
          >
            {currentFinding.imageFiles.map((f, i) => (
              <span
                key={i}
                className="text-[9px] bg-slate-50 border px-2 py-0.5 rounded 
                text-slate-500 font-bold flex items-center gap-1"
              >
                <FileImage size={10} /> {f.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          {editingIndex !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 bg-slate-200 hover:bg-slate-300 text-slate-600 
              font-black text-xs uppercase tracking-wider rounded-xl transition-all 
              cursor-pointer flex items-center justify-center gap-1"
            >
              <X size={14} /> Cancelar
            </button>
          )}
          <button
            type="button"
            onClick={handleSaveFinding}
            className={`flex-1 py-3 font-black text-xs uppercase tracking-wider rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              editingIndex !== null
                ? "bg-amber-500 border-amber-500 text-white hover:bg-amber-600 shadow-sm"
                : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {editingIndex !== null ? (
              <>
                <Save size={14} /> Guardar Cambios del Contenedor
              </>
            ) : (
              <>
                <Plus size={14} strokeWidth={3} /> Añadir Contenedor a la Lista
              </>
            )}
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-3 flex flex-col justify-between">
        <div className="space-y-2 flex-1">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider block">
            Contenedores en esta Auditoría ({data.findings.length})
          </h3>

          <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
            {data.findings.length === 0 ? (
              <div
                className="text-center p-8 border border-slate-100 rounded-2xl text-xs 
                font-semibold text-slate-400 bg-slate-50/40"
              >
                Aún no has agregado botes de scrap a la lista.
              </div>
            ) : (
              data.findings.map((f, i) => {
                const isItemBeingEdited = editingIndex === i;
                return (
                  <div
                    key={i}
                    className={`border rounded-xl p-3 flex justify-between items-center 
                      shadow-sm transition-all ${
                        isItemBeingEdited
                          ? "bg-amber-50/40 border-amber-300 ring-1 ring-amber-300"
                          : "bg-white border-slate-100"
                      }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <span
                        className="text-xs font-black text-slate-700 block uppercase 
                        truncate"
                      >
                        {typeScrap?.find((t) => t.id === f.typeScrapId)?.name ||
                          "Scrap"}
                      </span>
                      <div className="flex gap-2 text-[10px] text-slate-400 font-bold">
                        <span className="text-blue-600 font-extrabold">
                          {f.estimatedWeight} KG
                        </span>
                        <span>•</span>
                        <span className="text-slate-500">
                          {(f.imageFiles?.length ?? 0) > 0
                            ? `Nuevas fotos: ${f.imageFiles?.length}`
                            : (f as any).keepImageUrl
                              ? "Con fotos"
                              : "Sin fotos"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSelectEdit(i)}
                        disabled={isItemBeingEdited}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 
                        rounded-lg transition-colors cursor-pointer disabled:opacity-30"
                        title="Editar parámetros"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFinding(i)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 
                        rounded-lg transition-colors cursor-pointer"
                        title="Remover de la lista"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isSaving || editingIndex !== null}
            className="w-full sm:w-auto order-2 sm:order-1 border border-slate-200 
            hover:bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider px-4 
            py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer 
            disabled:opacity-40"
          >
            <ArrowLeft size={14} /> Atrás
          </button>

          <button
            type="button"
            disabled={
              data.findings.length === 0 || isSaving || editingIndex !== null
            }
            onClick={onSubmit}
            className="w-full flex-1 order-1 sm:order-2 bg-linear-to-r from-emerald-600 
            to-teal-600 hover:from-emerald-700 hover:to-teal-700 
            disabled:from-slate-200 disabled:to-slate-200 text-white 
            disabled:text-slate-400 font-black text-xs uppercase tracking-wider px-6 py-4 
            rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center 
            justify-center gap-2 cursor-pointer"
          >
            <Save size={14} />{" "}
            {isSaving ? "Guardando..." : "Finalizar Auditoría"}
          </button>
        </div>
      </div>

      <SignaturePad
        isOpen={isPadOpen}
        onClose={() => setIsPadOpen(false)}
        onSave={(file) =>
          setCurrentFinding((p) => ({ ...p, signatureFile: file }))
        }
      />
    </div>
  );
};
