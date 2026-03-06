import { Modal } from "../Modal/Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col">
        <div className="mb-8">
          <p className="text-slate-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex w-full gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-slate-200 
            text-slate-600 font-semibold rounded-lg hover:bg-slate-50 
            transition-colors cursor-pointer disabled:opacity-50 hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg 
            hover:bg-red-700 transition-all shadow-md shadow-red-100 cursor-pointer 
            disabled:opacity-50 hover:cursor-pointer"
          >
            {isLoading ? "Eliminando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
