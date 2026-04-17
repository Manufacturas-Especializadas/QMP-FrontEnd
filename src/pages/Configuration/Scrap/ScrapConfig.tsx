import toast from "react-hot-toast";
import {
  DataTable,
  type Column,
} from "../../../components/DataTable/DataTable";
import { ConfigLayout } from "../../../components/Layouts/ConfigLayout/ConfigLayout";
import { useDeleteScrap } from "../../../hooks/useDeleteScrap";
import { useScrapAll } from "../../../hooks/useScrapAll";
import type { ScrapList } from "../../../types/types";
import { useState } from "react";
import { ConfirmModal } from "../../../components/ConfirmModal/ConfirmModal";

export const ScrapConfig = () => {
  const { scrap, currentPage, totalPages, goToPage, refresh } = useScrapAll({
    isPaged: true,
    pageSize: 6,
  });

  const { deleteScrap, loading: isDeleting } = useDeleteScrap();
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDelete = (id: number) => {
    setIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!idToDelete) return;

    const success = await deleteScrap(idToDelete);
    if (success) {
      toast.success("Cliente eliminado correctamente");
      await refresh();
      setIsDeleteModalOpen(false);
    }
  };

  const columns: Column<ScrapList>[] = [
    {
      header: "Proceso",
      accessor: "processName",
    },
    {
      header: "Codigo de Maquina",
      accessor: "machineCodeName",
    },
    {
      header: "Tipo de scrap",
      accessor: "typeScrapName",
    },
    {
      header: "Defecto",
      accessor: "defectName",
    },
    {
      header: "Linea",
      accessor: "lineName",
    },
    {
      header: "Acciones",
      accessor: (item: ScrapList) => (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleOpenDelete(item.id)}
            className="text-slate-400 hover:text-red-600 font-medium
            transition-colors hover:cursor-pointer"
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
        title="Administrar Scrap"
        description="Gestiona los scraps dados de alta"
      >
        <DataTable
          columns={columns}
          data={scrap}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: (page) => goToPage(page),
          }}
        />
      </ConfigLayout>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Confirmar eliminación"
        description={`¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.`}
      />
    </>
  );
};
