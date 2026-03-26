import { useState } from "react";
import { DataTable, type Column } from "../../components/DataTable/DataTable";
import { ConfigLayout } from "../../components/Layouts/ConfigLayout/ConfigLayout";
import { useUserList } from "../../hooks/useUsersList";
import type { UsersList } from "../../types/types";
import { formatDateTime } from "../../utils/dateFormatter";
import { ModalConfirm } from "../../components/ModalConfirm/ModalConfirm";

export const UserIndex = () => {
  const {
    users,
    toggleUserStatus,
    currentPage,
    totalPages,
    goToPage,
    refresh,
  } = useUserList({
    isPaged: true,
    pageSize: 6,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersList | null>(null);

  const openConfirmModal = (user: UsersList) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (selectedUser) {
      await toggleUserStatus(selectedUser.payRollNumber);

      await refresh();

      setIsModalOpen(false);
      setSelectedUser(null);
    }
  };

  const columns: Column<UsersList>[] = [
    {
      header: "Nómina del usuario",
      accessor: "payRollNumber",
    },
    {
      header: "Fecha de registro",
      accessor: (item: UsersList) => formatDateTime(item.createdAt),
    },
    {
      header: "Rol",
      accessor: "roleName",
    },
    {
      header: "¿Activo?",
      accessor: (item: UsersList) => (item.isActive ? "Sí" : "No"),
    },
    {
      header: "Acciones",
      accessor: (item: UsersList) => (
        <div className="flex items-center justify-center gap-4">
          <button
            // onClick={() => openConfirmModal(item)}
            className="text-slate-400 hover:text-blue-600 
                  font-medium transition-colors hover:cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={() => openConfirmModal(item)}
            className="text-slate-400 hover:text-red-600 font-medium 
                  transition-colors hover:cursor-pointer"
          >
            {item.isActive ? "Desactivar" : "Activar"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ConfigLayout
        title="Administrar Usuarios"
        description="Gestiona a los usuarios dados de alta"
      >
        <DataTable
          columns={columns}
          data={users}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: (page) => goToPage(page),
          }}
        />
      </ConfigLayout>
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedUser?.isActive ? "Desactivar Usuario" : "Activar Usuario"
        }
        confirmText={
          selectedUser?.isActive
            ? "Confirmar Desactivación"
            : "Confirmar Activación"
        }
        confirmVariant={selectedUser?.isActive ? "danger" : "primary"}
        onConfirm={handleConfirmToggle}
      >
        <p>
          ¿Estás seguro de que deseas{" "}
          {selectedUser?.isActive ? "desactivar" : "activar"}
          al usuario <strong>{selectedUser?.payRollNumber}</strong>?
        </p>
      </ModalConfirm>
    </>
  );
};
