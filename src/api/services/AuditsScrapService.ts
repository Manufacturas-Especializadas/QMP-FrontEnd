import { API_CONFIG } from "../../config/api";
import type {
  AuditScrapList,
  AvailableMonth,
  CreateAuditScrapPayload,
  DetailedAuditScrap,
  UpdateAuditScrapPayload,
} from "../../types/types";
import { apiClient } from "../client";

class AuditsScrapService {
  private getAllEndpoint = API_CONFIG.endpoints.auditsScrap.getAll;
  private getByIdEndpoint = API_CONFIG.endpoints.auditsScrap.getById;
  private getAvailableMonthsEndpoint =
    API_CONFIG.endpoints.auditsScrap.availableMonths;
  private exportToExcelEndpoint =
    API_CONFIG.endpoints.auditsScrap.exportToExcel;
  private createEndpoint = API_CONFIG.endpoints.auditsScrap.create;
  private updateEndpoint = API_CONFIG.endpoints.auditsScrap.update;
  private deleteEndpoint = API_CONFIG.endpoints.auditsScrap.delete;

  async getAuditsScrap(): Promise<AuditScrapList[]> {
    const response = await apiClient.get<AuditScrapList[]>(this.getAllEndpoint);
    return response;
  }

  async getById(id: number): Promise<DetailedAuditScrap> {
    const response = await apiClient.get<DetailedAuditScrap>(
      `${this.getByIdEndpoint}${id}`,
    );
    return response;
  }

  async getAvaliableMonth(): Promise<AvailableMonth[]> {
    return apiClient.get<AvailableMonth[]>(this.getAvailableMonthsEndpoint);
  }

  async exportToExcel(year: number, month: number): Promise<void> {
    const formattedMonth = month.toString().padStart(2, "0");

    const urlWithParams = `${this.exportToExcelEndpoint}?year=${year}&month=${formattedMonth}`;

    const filename = `Reporte_Auditorias_FCD_${year}_${formattedMonth}.xlsx`;

    await apiClient.downloadFile(urlWithParams, filename);
  }

  async create(payload: CreateAuditScrapPayload): Promise<any> {
    const formData = new FormData();
    formData.append("ShiftId", payload.shiftId.toString());

    formData.append("LeaderPayroll", payload.leaderPayroll.toString());

    payload.lineIds.forEach((id, index) => {
      formData.append(`LineIds[${index}]`, id.toString());
    });

    payload.findings.forEach((finding, index) => {
      formData.append(
        `Findings[${index}].TypeScrapId`,
        finding.typeScrapId.toString(),
      );
      formData.append(
        `Findings[${index}].DefectId`,
        finding.defectId.toString(),
      );
      formData.append(
        `Findings[${index}].EstimatedWeight`,
        finding.estimatedWeight.toString(),
      );
      formData.append(
        `Findings[${index}].MaterialCorrectlyIdentified`,
        finding.materialCorrectlyIdentified.toString(),
      );
      formData.append(
        `Findings[${index}].MaterialCorrectlySegregated`,
        finding.materialCorrectlySegregated.toString(),
      );

      if (finding.unreportedReason) {
        formData.append(
          `Findings[${index}].UnreportedReason`,
          finding.unreportedReason,
        );
      }
      if (finding.imageFiles && finding.imageFiles.length > 0) {
        finding.imageFiles.forEach((file) => {
          formData.append(`Findings[${index}].ImageFiles`, file);
        });
      }
      if (finding.signatureFile) {
        formData.append(
          `Findings[${index}].SignatureFile`,
          finding.signatureFile,
        );
      }
    });

    const response = await apiClient.post(this.createEndpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  }

  async update(id: number, payload: UpdateAuditScrapPayload): Promise<any> {
    const formData = new FormData();
    formData.append("ShiftId", payload.shiftId.toString());

    formData.append("LeaderPayroll", payload.leaderPayroll.toString());

    payload.lineIds.forEach((lId, index) => {
      formData.append(`LineIds[${index}]`, lId.toString());
    });

    payload.findings.forEach((finding, index) => {
      formData.append(`Findings[${index}].Id`, finding.id.toString());
      formData.append(
        `Findings[${index}].TypeScrapId`,
        finding.typeScrapId.toString(),
      );
      formData.append(
        `Findings[${index}].DefectId`,
        finding.defectId.toString(),
      );
      formData.append(
        `Findings[${index}].EstimatedWeight`,
        finding.estimatedWeight.toString(),
      );
      formData.append(
        `Findings[${index}].MaterialCorrectlyIdentified`,
        finding.materialCorrectlyIdentified.toString(),
      );
      formData.append(
        `Findings[${index}].MaterialCorrectlySegregated`,
        finding.materialCorrectlySegregated.toString(),
      );

      if (finding.unreportedReason)
        formData.append(
          `Findings[${index}].UnreportedReason`,
          finding.unreportedReason,
        );
      if (finding.imageFile)
        formData.append(`Findings[${index}].ImageFile`, finding.imageFile);
      if (finding.signatureFile)
        formData.append(
          `Findings[${index}].SignatureFile`,
          finding.signatureFile,
        );
      if (finding.keepImageUrl)
        formData.append(
          `Findings[${index}].KeepImageUrl`,
          finding.keepImageUrl,
        );
      if (finding.keepSignatureUrl)
        formData.append(
          `Findings[${index}].KeepSignatureUrl`,
          finding.keepSignatureUrl,
        );
    });

    const response = await apiClient.put(
      `${this.updateEndpoint}${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response;
  }

  async delete(id: number): Promise<any> {
    const response = await apiClient.delete(`${this.deleteEndpoint}${id}`);
    return response;
  }
}

export const auditsScrapService = new AuditsScrapService();
