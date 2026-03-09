import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export const DataTable = <T,>({
  columns,
  data,
  pagination,
}: DataTableProps<T>) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider 
                  text-slate-600 text-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {data.map((item, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-blue-50/40 transition-colors group"
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                    {typeof col.accessor === "function"
                      ? col.accessor(item)
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div
          className="px-6 py-4 border-t border-slate-100 bg-white 
          flex items-center justify-between"
        >
          <p className="text-sm text-slate-500">
            Página{" "}
            <span className="font-medium text-slate-800">
              {pagination.currentPage}
            </span>{" "}
            de{" "}
            <span className="font-medium text-slate-800">
              {pagination.totalPages}
            </span>
          </p>
          <div className="inline-flex gap-2">
            <button
              onClick={() =>
                pagination.onPageChange(pagination.currentPage - 1)
              }
              disabled={pagination.currentPage === 1}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 
              disabled:opacity-50 disabled:hover:bg-white transition-colors 
              hover:cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() =>
                pagination.onPageChange(pagination.currentPage + 1)
              }
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 
              disabled:opacity-50 disabled:hover:bg-white transition-colors 
              hover:cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
