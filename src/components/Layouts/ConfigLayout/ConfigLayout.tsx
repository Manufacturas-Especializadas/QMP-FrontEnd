import type { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  onAddClick?: () => void;
  children: ReactNode;
}

export const ConfigLayout = ({
  title,
  description,
  onAddClick,
  children,
}: Props) => {
  return (
    <div className="p-6 md:p-8 max-w-7xl animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            {title}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{description}</p>
        </div>
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 
            hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors 
            shadow-sm shadow-blue-200 hover:cursor-pointer"
          >
            + Agregar Nuevo
          </button>
        )}
      </header>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {children}
      </div>
    </div>
  );
};
