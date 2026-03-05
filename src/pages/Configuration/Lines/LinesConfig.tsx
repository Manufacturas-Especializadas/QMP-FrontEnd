import { useState, type SyntheticEvent } from "react";
import { DataTable } from "../../../components/DataTable/DataTable";
import { ConfigLayout } from "../../../components/Layouts/ConfigLayout/ConfigLayout";
import { Modal } from "../../../components/Modal/Modal";
import { useLines } from "../../../hooks/useLines";
import { Input } from "../../../components/CustomInputs/Input";
import { useCreateLine } from "../../../hooks/useCreateLine";
import toast from "react-hot-toast";

export const LinesConfig = () => {
  const columns = [{ header: "Nombre de Línea", accessor: "name" as const }];

  const { lines, currentPage, totalPages, goToPage, refresh } = useLines({
    isPaged: true,
    pageSize: 6,
  });
  const { createLine, loading, error } = useCreateLine();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineName, setLineName] = useState("");

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lineName.trim()) return;

    const success = await createLine({ lineName });

    if (success) {
      toast.success("Línea creada");

      await refresh();

      setLineName("");
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <ConfigLayout
        title="Administrar Líneas"
        description="Gestiona las estaciones de trabajo y líneas de producción"
        onAddClick={() => setIsModalOpen(true)}
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
        title="Nueva Línea de Producción"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Input
              label="Nombre de la linea"
              value={lineName}
              onChange={(e) => setLineName(e.target.value)}
              disabled={loading}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 border border-slate-200 
              text-slate-600 font-semibold rounded-lg hover:bg-slate-50 
              transition-colors hover:cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg 
              hover:bg-blue-700 transition-colors hover:cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
