import { useState, type SyntheticEvent } from "react";
import { useCreateClient } from "../../../hooks/useCreateClient";
import { useClients } from "../../../hooks/useClients";
import { useUpdateClient } from "../../../hooks/useUpdateClient";
import { useDeleteClient } from "../../../hooks/useDeleteClient";
import { useClientById } from "../../../hooks/useClientById";
import toast from "react-hot-toast";
import {
  DataTable,
  type Column,
} from "../../../components/DataTable/DataTable";
import type { Clients } from "../../../types/types";
import { ConfigLayout } from "../../../components/Layouts/ConfigLayout/ConfigLayout";
import { Modal } from "../../../components/Modal/Modal";
import { Input } from "../../../components/CustomInputs/Input";
import { ConfirmModal } from "../../../components/ConfirmModal/ConfirmModal";

export const ClientConfig = () => {
  const { clients, currentPage, totalPages, goToPage, refresh } = useClients({
    isPaged: true,
    pageSize: 6,
  });
  const {
    createClient,
    loading: isCreating,
    error: createError,
  } = useCreateClient();
  const {
    updateClient,
    loading: isUpdating,
    error: updateError,
  } = useUpdateClient();
  const { deleteClient, loading: isDeleting } = useDeleteClient();
  const { getById, loading: isFetchingClient } = useClientById();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [clientName, setClientName] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleOpenCreate = () => {
    setSelectedId(null);
    setClientName("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = async (id: number) => {
    setSelectedId(id);
    const data = await getById(id);
    if (data) {
      setClientName(data.clientName);
      setIsModalOpen(true);
    }
  };

  const handleOpenDelete = (id: number) => {
    setIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!idToDelete) return;

    const success = await deleteClient(idToDelete);
    if (success) {
      toast.success("Cliente eliminado correctamente");
      await refresh();
      setIsDeleteModalOpen(false);
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    const success = selectedId
      ? await updateClient({ clientName }, selectedId)
      : await createClient({ clientName });

    if (success) {
      toast.success(selectedId ? "Cliente actualizado" : "Cliente creada");
      await refresh();
      setIsModalOpen(false);
      setClientName("");
    }
  };

  const columns: Column<Clients>[] = [
    {
      header: "Nombre del cliente",
      accessor: "name",
    },
    {
      header: "Acciones",
      accessor: (item: Clients) => (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleOpenEdit(item.id)}
            className="text-slate-400 hover:text-blue-600 
            font-medium transition-colors hover:cursor-pointer"
          >
            Editar
          </button>
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
        title="Administrar Clientes"
        description="Gestiona las clientes dados de alta"
        onAddClick={handleOpenCreate}
      >
        <DataTable
          columns={columns}
          data={clients}
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
        title={selectedId ? "Editar Cliente" : "Nuevo Cliente"}
      >
        {isFetchingClient ? (
          <div className="py-6 text-center text-slate-500">
            Cargando datos...
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input
                label="Nombre del cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
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
