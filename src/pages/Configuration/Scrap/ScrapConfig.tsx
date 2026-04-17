import {
  DataTable,
  type Column,
} from "../../../components/DataTable/DataTable";
import { ConfigLayout } from "../../../components/Layouts/ConfigLayout/ConfigLayout";
import { useScrapAll } from "../../../hooks/useScrapAll";
import type { ScrapList } from "../../../types/types";

export const ScrapConfig = () => {
  const { scrap, currentPage, totalPages, goToPage, refresh } = useScrapAll({
    isPaged: true,
    pageSize: 6,
  });

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
      header: "¿Verficado?",
      accessor: "isVerified",
    },
    {
      header: "Acciones",
      accessor: (item: ScrapList) => (
        <div className="flex items-center justify-center gap-4">
          <button
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
    </>
  );
};
