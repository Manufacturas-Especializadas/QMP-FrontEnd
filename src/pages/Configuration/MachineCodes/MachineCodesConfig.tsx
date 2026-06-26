import { useState, useEffect, type SyntheticEvent } from "react";
import { Plus, Trash2, Search } from "lucide-react";
import {
  DataTable,
  type Column,
} from "../../../components/DataTable/DataTable";
import { ConfigLayout } from "../../../components/Layouts/ConfigLayout/ConfigLayout";
import { Modal } from "../../../components/Modal/Modal";
import { ConfirmModal } from "../../../components/ConfirmModal/ConfirmModal";
import toast from "react-hot-toast";
import { useMachineCodes } from "../../../hooks/useMachineCodes";
import { useLines } from "../../../hooks/useLines";
import { useProcesses } from "../../../hooks/useProcesses";
import type { MachineCode } from "../../../types/types";

export const MachineCodesConfig = () => {
  const {
    machineCodes,
    loading: isCodesLoading,
    createMachineCodes,
    updateMachineCode,
    deleteMachineCode,
    fetchMachineCodes,
  } = useMachineCodes();
  const { lines } = useLines({ isPaged: false });
  const { processes, fetchProcesses } = useProcesses();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lineId, setLineId] = useState<number | "">("");
  const [processId, setProcessId] = useState<number | "">("");
  const [dynamicCodes, setDynamicCodes] = useState<string[]>([""]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchMachineCodes();
    fetchProcesses();
  }, [fetchMachineCodes, fetchProcesses]);

  const filteredCodes =
    machineCodes?.filter((c) =>
      [c.machineCodeName, c.processName, c.lineName].some((val) =>
        val?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    ) || [];

  const pageSize = 6;
  const totalPages = Math.ceil(filteredCodes.length / pageSize);
  const paginatedCodes = filteredCodes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const filteredProcesses =
    processes?.filter((p) => p.lineId === Number(lineId)) || [];

  const handleOpenCreate = () => {
    setSelectedId(null);
    setLineId("");
    setProcessId("");
    setDynamicCodes([""]);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (id: number) => {
    const codeToEdit = machineCodes.find((c) => c.id === id);
    if (codeToEdit) {
      setSelectedId(codeToEdit.id);
      setLineId(codeToEdit.lineId);
      setProcessId(codeToEdit.processId);
      setDynamicCodes([codeToEdit.machineCodeName]); // En edición, solo mostramos 1 input
      setIsModalOpen(true);
    }
  };

  const handleOpenDelete = (id: number) => {
    setIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!idToDelete) return;
    await deleteMachineCode(idToDelete);
    setIsDeleteModalOpen(false);
  };

  const addCodeInput = () => setDynamicCodes([...dynamicCodes, ""]);

  const removeCodeInput = (index: number) => {
    const newCodes = dynamicCodes.filter((_, i) => i !== index);
    setDynamicCodes(newCodes);
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCodes = [...dynamicCodes];
    newCodes[index] = value.toUpperCase();
    setDynamicCodes(newCodes);
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validCodes = dynamicCodes.filter((c) => c.trim() !== "");
    if (!processId || validCodes.length === 0) {
      toast.error("Selecciona un proceso y llena al menos un código");
      return;
    }

    try {
      setIsSaving(true);
      if (selectedId) {
        await updateMachineCode(selectedId, {
          processId: Number(processId),
          machineCodeName: validCodes[0],
        });
      } else {
        await createMachineCodes(Number(processId), validCodes);
      }

      setIsModalOpen(false);
    } catch (error) {
    } finally {
      setIsSaving(false);
    }
  };

  const columns: Column<MachineCode>[] = [
    {
      header: "Línea",
      accessor: (item) => (
        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-black uppercase">
          {item.lineName}
        </span>
      ),
    },
    { header: "Proceso", accessor: "processName" },
    {
      header: "Código de Máquina",
      accessor: (item) => (
        <span className="font-black text-blue-900 tracking-wide">
          {item.machineCodeName}
        </span>
      ),
    },
    {
      header: "Acciones",
      accessor: (item: MachineCode) => (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleOpenEdit(item.id)}
            className="text-slate-400 hover:text-blue-600 font-medium transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => handleOpenDelete(item.id)}
            className="text-slate-400 hover:text-red-600 font-medium transition-colors"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ConfigLayout
        title="Administrar Códigos de Máquina"
        description="Gestiona los identificadores de las máquinas y asígnalos a sus procesos"
        onAddClick={handleOpenCreate}
      >
        <div className="mb-4 relative w-full sm:w-80">
          <Search
            className="absolute left-3.5 top-3 text-slate-400"
            size={15}
          />
          <input
            type="text"
            placeholder="Buscar código, proceso o línea..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 
            py-2.5 text-xs font-bold outline-none focus:border-blue-600 shadow-sm"
          />
        </div>

        <DataTable
          columns={columns}
          data={paginatedCodes}
          pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }}
        />
      </ConfigLayout>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedId ? "Editar Código de Máquina" : "Nuevos Códigos de Máquina"
        }
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-black uppercase text-slate-500">
                Línea
              </label>
              <select
                value={lineId}
                onChange={(e) => {
                  setLineId(e.target.value ? Number(e.target.value) : "");
                  setProcessId("");
                }}
                disabled={isSaving}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 
                rounded-xl outline-none focus:bg-white focus:border-blue-500 text-xs 
                font-bold"
                required
              >
                <option value="">-- Seleccionar --</option>
                {lines?.map((line: any) => (
                  <option key={line.id} value={line.id}>
                    {line.lineName || line.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-black uppercase text-slate-500">
                Proceso
              </label>
              <select
                value={processId}
                onChange={(e) =>
                  setProcessId(e.target.value ? Number(e.target.value) : "")
                }
                disabled={!lineId || isSaving}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 
                rounded-xl outline-none focus:bg-white focus:border-blue-500 text-xs 
                font-bold disabled:opacity-50"
                required
              >
                <option value="">-- Seleccionar --</option>
                {filteredProcesses.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.processName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] font-black uppercase text-slate-500">
                {dynamicCodes.length > 1
                  ? "Códigos a Ingresar"
                  : "Código de Máquina"}
              </label>
              {!selectedId && (
                <button
                  type="button"
                  onClick={addCodeInput}
                  className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 
                  px-2 py-1 rounded-md flex items-center gap-1 hover:bg-blue-100 
                  transition-colors"
                >
                  <Plus size={12} /> Agregar Otro
                </button>
              )}
            </div>

            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {dynamicCodes.map((code, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ej: EXDHR001"
                    value={code}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    disabled={isSaving}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 
                    py-2.5 text-xs font-bold uppercase outline-none focus:border-blue-600"
                    required
                  />
                  {!selectedId && dynamicCodes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCodeInput(index)}
                      className="p-2.5 text-slate-400 bg-slate-50 rounded-xl 
                      hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              disabled={isSaving}
              className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 
              font-bold text-xs uppercase rounded-xl hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-black text-xs 
              uppercase rounded-xl shadow-lg shadow-blue-100 disabled:opacity-50"
            >
              {isSaving ? "Guardando..." : "Guardar Códigos"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isCodesLoading}
        title="Confirmar eliminación"
        description="¿Estás seguro de que deseas eliminar este código? Esta acción no se puede deshacer."
      />
    </>
  );
};
