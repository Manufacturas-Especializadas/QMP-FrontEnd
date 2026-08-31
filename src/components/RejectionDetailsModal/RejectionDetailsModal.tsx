import {
  X,
  Calendar,
  User,
  Hash,
  Package,
  AlertOctagon,
  ClipboardCheck,
  Image as ImageIcon,
  PenTool,
} from "lucide-react";
import { formatDateTime } from "../../utils/dateFormatter";
import type { RejectionResponse } from "../../types/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rejection: RejectionResponse | null;
}

export const RejectionDetailsModal = ({
  isOpen,
  onClose,
  rejection,
}: Props) => {
  if (!isOpen || !rejection) return null;

  const photoList = rejection.image?.split(";").filter((img: any) => img) || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 
      backdrop-blur-sm animate-in fade-in duration-300"
    >
      <div
        className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden 
        flex flex-col max-h-[95vh] animate-in zoom-in-95"
      >
        <div
          className="p-6 bg-linear-to-r from-gray-50 to-white border-b border-gray-100 
          flex justify-between items-center"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="px-3 py-1 bg-red-600 text-white text-[10px] font-black 
                rounded-full uppercase tracking-tighter"
              >
                Folio: {rejection.folio}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                ID Registro: {rejection.id}
              </span>
            </div>
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">
              Detalles del Rechazo
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 
            transition-colors hover:cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <section>
                <h3
                  className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4 
                  flex items-center gap-2"
                >
                  <ClipboardCheck size={14} /> Información General
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <DetailItem
                    icon={<Calendar size={14} />}
                    label="Fecha Registro"
                    value={formatDateTime(rejection.createdAt)}
                  />
                  <DetailItem
                    icon={<User size={14} />}
                    label="Inspector"
                    value={rejection.inspector}
                  />
                  <DetailItem
                    icon={<Hash size={14} />}
                    label="Nro Parte"
                    value={rejection.partNumber}
                  />
                  <DetailItem
                    icon={<Package size={14} />}
                    label="piezas rechazadas"
                    value={rejection.numberOfPieces.toString()}
                  />
                </div>
              </section>

              <section>
                <h3
                  className="text-xs font-black text-red-600 uppercase tracking-[0.2em] 
                  mb-4 flex items-center gap-2"
                >
                  <AlertOctagon size={14} /> Clasificación de Falla
                </h3>
                <div className="space-y-4 bg-red-50/30 p-4 rounded-3xl border border-red-50">
                  <DetailItem
                    label="Defecto Detectado"
                    value={rejection.defectName}
                    bold
                  />
                  <DetailItem
                    label="Condición Especifica"
                    value={rejection.conditionName}
                  />
                  <DetailItem
                    label="Acción de Contención"
                    value={rejection.containmentActionName}
                  />
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                  Descripción
                </h3>
                <p
                  className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 
                  rounded-2xl border border-gray-100"
                >
                  {rejection.description || "Sin descripción adicional."}
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h3
                  className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] 
                  mb-4 flex items-center gap-2"
                >
                  <ImageIcon size={14} /> Evidencia Fotográfica
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {photoList.length > 0 ? (
                    photoList.map((url: any, i: any) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="aspect-video rounded-2xl overflow-hidden border 
                        border-gray-100 hover:ring-2 hover:ring-blue-400 transition-all"
                      >
                        <img
                          src={url}
                          className="w-full h-full object-cover"
                          alt="evidencia"
                        />
                      </a>
                    ))
                  ) : (
                    <div
                      className="col-span-2 py-10 bg-gray-50 rounded-3xl border-2 
                      border-dashed border-gray-200 flex flex-col items-center justify-center 
                      text-gray-400"
                    >
                      <ImageIcon size={32} strokeWidth={1} />
                      <span className="text-[10px] font-bold uppercase mt-2">
                        Sin fotos adjuntas
                      </span>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <h3
                  className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] 
                  mb-4 flex items-center gap-2"
                >
                  <PenTool size={14} /> Firma de Conformidad
                </h3>
                <div
                  className="bg-gray-50 rounded-3xl border border-gray-100 p-4 flex 
                  items-center justify-center"
                >
                  {rejection.informedSignature ? (
                    <img
                      src={rejection.informedSignature}
                      className="max-h-32 object-contain"
                      alt="firma"
                    />
                  ) : (
                    <span className="text-xs text-gray-400 italic">
                      No se registró firma
                    </span>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold 
            hover:bg-gray-800 transition-all shadow-lg hover:cursor-pointer"
          >
            Cerrar Vista
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({
  label,
  value,
  icon,
  bold,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  bold?: boolean;
}) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
      {icon} {label}
    </span>
    <span
      className={`text-sm ${bold ? "font-black text-gray-800" : "font-medium text-gray-600"}`}
    >
      {value}
    </span>
  </div>
);
