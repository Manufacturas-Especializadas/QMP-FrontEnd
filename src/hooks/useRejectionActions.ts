import toast from "react-hot-toast";
import type { RejectionResponse } from "../types/types";

export const useRejectionActions = () => {
  const formatRejectionData = (item: RejectionResponse) => {
    const date = new Date(item.createdAt);
    const formattedDate = isNaN(date.getTime())
      ? "Fecha no disponible"
      : date.toLocaleString("es-MX", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

    const imageUrls = item.image
      ? item.image.split(";").filter((url) => url.trim() !== "")
      : [];

    const evidenceText =
      imageUrls.length > 0
        ? imageUrls.map((url, i) => `\n📸 *Foto ${i + 1}:* ${url}`).join("")
        : "\n📸 *Evidencia:* No disponible";

    return { formattedDate, evidenceText };
  };

  const sendToWhatsApp = (item: RejectionResponse) => {
    const { formattedDate, evidenceText } = formatRejectionData(item);

    const message = `
      *REPORTE DE RECHAZO INTERNO*
      📅 *Fecha:* ${formattedDate}
      📄 *Nro Parte:* ${item.partNumber}
      🧩 *Defecto:* ${item.defectName}
      🔍 *Condición:* ${item.conditionName}
      🏭 *Línea:* ${item.lineName}
      🏢 *Cliente:* ${item.clientName}
      🔢 *Cantidad:* ${item.numberOfPieces} pzas
      👤 *Inspector:* ${item.inspector}
      📝 *Descripción:* ${item.description || "Sin descripción"}
      ${evidenceText}

      Saludos.`.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    const newWindow = window.open(whatsappUrl, "_blank");
    if (!newWindow) {
      toast.error("Ventana emergente bloqueada por el navegador");
    }
  };

  const sendToOutlook = (item: RejectionResponse) => {
    const { formattedDate } = formatRejectionData(item);

    const subject = `Reporte de Rechazo Interno - ${item.partNumber} - ${formattedDate}`;

    const body = `Buen día, reporte de rechazo interno:
      Fecha: ${formattedDate}
      Número de parte: ${item.partNumber}
      Defecto: ${item.defectName}
      Condición: ${item.conditionName}
      Línea: ${item.lineName}
      Cliente: ${item.clientName}
      Piezas rechazadas: ${item.numberOfPieces}
      Inspector: ${item.inspector}
      Descripción: ${item.description || "Sin descripción"}

      Evidencia Fotográfica:
      ${item.image ? item.image.split(";").join("\n") : "No disponible"}

      Saludos.`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return {
    sendToWhatsApp,
    sendToOutlook,
  };
};
