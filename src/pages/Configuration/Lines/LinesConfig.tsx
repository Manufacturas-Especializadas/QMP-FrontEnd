import { useState, type SyntheticEvent } from "react";
import {
  DataTable,
  type Column,
} from "../../../components/DataTable/DataTable";
import { ConfigLayout } from "../../../components/Layouts/ConfigLayout/ConfigLayout";
import { Modal } from "../../../components/Modal/Modal";
import { useLines } from "../../../hooks/useLines";
import { Input } from "../../../components/CustomInputs/Input";
import { useCreateLine } from "../../../hooks/useCreateLine";
import toast from "react-hot-toast";
import { useUpdateLine } from "../../../hooks/useUpdateLine";
import { useLineById } from "../../../hooks/useLineById";
import type { Lines } from "../../../types/types";

export const LinesConfig = () => {
  const columns: Column<Lines>[] = [
    {
      header: "Nombre de Línea",
      accessor: "name",
    },
    {
      header: "Acciones",
      accessor: (item: Lines) => (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleOpenEdit(item.id)}
            className="text-slate-400 hover:text-blue-600 
            font-medium transition-colors hover:cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={() => console.log("Eliminar", item.id)}
            className="text-slate-400 hover:text-red-600 font-medium 
            transition-colors hover:cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const { lines, currentPage, totalPages, goToPage, refresh } = useLines({
    isPaged: true,
    pageSize: 6,
  });
  const {
    createLine,
    loading: isCreating,
    error: createError,
  } = useCreateLine();
  const {
    updateLine,
    loading: isUpdating,
    error: updateError,
  } = useUpdateLine();
  const { getById, loading: isFetchingLine } = useLineById();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineName, setLineName] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleOpenCreate = () => {
    setSelectedId(null);
    setLineName("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = async (id: number) => {
    setSelectedId(id);
    const data = await getById(id);
    if (data) {
      setLineName(data.lineName);
      setIsModalOpen(true);
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lineName.trim()) return;

    const success = selectedId
      ? await updateLine({ lineName }, selectedId)
      : await createLine({ lineName });

    if (success) {
      toast.success(selectedId ? "Línea actualizada" : "Línea creada");
      await refresh();
      setIsModalOpen(false);
      setLineName("");
    }
  };

  return (
    <>
      <ConfigLayout
        title="Administrar Líneas"
        description="Gestiona las estaciones de trabajo y líneas de producción"
        onAddClick={handleOpenCreate}
      >
        <DataTable
          columns={columns}
          data={lines}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: (page) => goToPage(page),
          }}
        />
      </ConfigLayout>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedId
            ? "Editar Línea de Producción"
            : "Nueva Línea de Producción"
        }
      >
        {isFetchingLine ? (
          <div className="py-6 text-center text-slate-500">
            Cargando datos...
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input
                label="Nombre de la linea"
                value={lineName}
                onChange={(e) => setLineName(e.target.value)}
                disabled={isCreating || isUpdating}
              />
              {(createError || updateError) && (
                <p className="text-red-500 text-xs mt-2">
                  {createError || updateError}
                </p>
              )}
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors hover:cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer disabled:bg-blue-400"
              >
                {isCreating || isUpdating ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};
