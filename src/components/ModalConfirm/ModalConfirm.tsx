import type { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  confirmVariant?: "danger" | "primary";
}

export const ModalConfirm = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Aceptar",
  confirmVariant = "primary",
}: Props) => {
  if (!isOpen) return null;

  const btnClass =
    confirmVariant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
      bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md 
        overflow-hidden transform animate-in zoom-in-95 duration-200"
      >
        <div
          className="px-6 py-4 border-b border-gray-100 flex justify-between 
          items-center"
        >
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-6 text-gray-600">{children}</div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 
            hover:bg-gray-200 rounded-lg transition-colors hover:cursor-pointer"
          >
            Cancelar
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-sm font-medium text-white 
                rounded-lg transition-colors ${btnClass} hover:cursor-pointer`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
