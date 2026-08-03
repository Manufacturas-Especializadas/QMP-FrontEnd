import { useState, useEffect, type SyntheticEvent } from "react";
import {
  DataTable,
  type Column,
} from "../../../components/DataTable/DataTable";
import { ConfigLayout } from "../../../components/Layouts/ConfigLayout/ConfigLayout";
import { Modal } from "../../../components/Modal/Modal";
import { Input } from "../../../components/CustomInputs/Input";
import { ConfirmModal } from "../../../components/ConfirmModal/ConfirmModal";
import { useProcesses } from "../../../hooks/useProcesses";
import { useLines } from "../../../hooks/useLines";
import type { ProcessData } from "../../../types/types";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

export const ProcesesConfig = () => {
  const {
    processes,
    loading: isProcessesLoading,
    createProcess,
    updateProcess,
    deleteProcess,
    fetchProcesses,
  } = useProcesses();

  const { lines } = useLines({ isPaged: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const pageSize = 6;

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredProcesses = processes.filter((process) => {
    if (!normalizedSearchTerm) {
      return true;
    }

    const processName = process.processName?.toLowerCase() ?? "";
    const lineName = process.lineName?.toLowerCase() ?? "";

    return (
      processName.includes(normalizedSearchTerm) ||
      lineName.includes(normalizedSearchTerm)
    );
  });

  const totalPages = Math.ceil(filteredProcesses.length / pageSize);

  const paginatedProcesses = filteredProcesses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [processName, setProcessName] = useState("");
  const [lineId, setLineId] = useState<number | "">("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProcesses();
  }, [fetchProcesses]);

  const handleOpenCreate = () => {
    setSelectedId(null);
    setProcessName("");
    setLineId("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (id: number) => {
    const processToEdit = processes.find((p) => p.id === id);
    if (processToEdit) {
      setSelectedId(processToEdit.id);
      setProcessName(processToEdit.processName);
      setLineId(processToEdit.lineId);
      setIsModalOpen(true);
    }
  };

  const handleOpenDelete = (id: number) => {
    setIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!idToDelete) return;
    try {
      await deleteProcess(idToDelete);
      setIsDeleteModalOpen(false);
    } catch (error) { }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!processName.trim() || !lineId) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        processName: processName.trim(),
        lineId: Number(lineId),
      };

      if (selectedId) {
        await updateProcess(selectedId, payload);
      } else {
        await createProcess(payload);
      }

      setIsModalOpen(false);
      setProcessName("");
      setLineId("");
    } catch (error) {
    } finally {
      setIsSaving(false);
    }
  };

  const columns: Column<ProcessData>[] = [
    {
      header: "Línea",
      accessor: "lineName",
    },
    {
      header: "Nombre del Proceso",
      accessor: "processName",
    },
    {
      header: "Acciones",
      accessor: (item: ProcessData) => (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleOpenEdit(item.id)}
            className="text-slate-400 hover:text-blue-600 font-medium transition-colors 
            hover:cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={() => handleOpenDelete(item.id)}
            className="text-slate-400 hover:text-red-600 font-medium transition-colors 
            hover:cursor-pointer"
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
        title="Administrar Procesos"
        description="Gestiona los procesos de manufactura y asígnalos a sus respectivas líneas"
        onAddClick={handleOpenCreate}
      >
        <div className="mb-4 relative w-full sm:w-80">
          <Search
            className="absolute left-3.5 top-3 text-slate-400"
            size={15}
          />
          <input
            type="text"
            placeholder="Buscar proceso o línea..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 
            py-2.5 text-xs font-bold outline-none focus:border-blue-600 shadow-sm"
          />
        </div>

        <DataTable
          columns={columns}
          data={paginatedProcesses}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: (page) => setCurrentPage(page),
          }}
        />
      </ConfigLayout>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedId
            ? "Editar Proceso de Producción"
            : "Nuevo Proceso de Producción"
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Línea Asignada
            </label>
            <select
              value={lineId}
              onChange={(e) =>
                setLineId(e.target.value ? Number(e.target.value) : "")
              }
              disabled={isSaving}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none 
              focus:border-blue-500 bg-white text-slate-700 disabled:opacity-60"
              required
            >
              <option value="">-- Selecciona una línea --</option>
              {lines?.map((line: any) => (
                <option key={line.id} value={line.id}>
                  {line.lineName || line.name}{" "}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Input
              label="Nombre del proceso"
              value={processName}
              onChange={(e) => setProcessName(e.target.value)}
              disabled={isSaving}
              placeholder="Ej: SOLDADURA HORNO"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              disabled={isSaving}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 
              font-semibold rounded-lg hover:bg-slate-50 transition-colors 
              hover:cursor-pointer disabled:opacity-60"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold 
              rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer 
              disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isProcessesLoading}
        title="Confirmar eliminación"
        description={`¿Estás seguro de que deseas eliminar este proceso? Se eliminarán también los códigos de máquina asociados. Esta acción no se puede deshacer.`}
      />
    </>
  );
};
