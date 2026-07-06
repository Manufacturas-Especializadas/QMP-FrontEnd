import { API_CONFIG } from "../../config/api";
import type {
  AuditACDRead,
  CreateAuditACDPayload,
  UpdateAuditACDPayload,
} from "../../types/types";
import { apiClient } from "../client";

class AuditsACDService {
  private getAllEndpoint = API_CONFIG.endpoints.auditsACD.getAll;
  private getByIdEndpoint = API_CONFIG.endpoints.auditsACD.getById;
  private createEndpoint = API_CONFIG.endpoints.auditsACD.create;
  private updateEndpoint = API_CONFIG.endpoints.auditsACD.update;
  private deleteEndpoint = API_CONFIG.endpoints.auditsACD.delete;

  private buildFormData(
    payload: CreateAuditACDPayload | UpdateAuditACDPayload,
  ): FormData {
    const formData = new FormData();

    formData.append("shiftId", payload.shiftId.toString());
    if (payload.rejectionId !== null) {
      formData.append("rejectionId", payload.rejectionId.toString());
    }

    payload.lineIds.forEach((id, index) => {
      formData.append(`lineIds[${index}]`, id.toString());
    });

    payload.findings.forEach((finding: any, index: number) => {
      if (finding.id !== undefined)
        formData.append(`findings[${index}].id`, finding.id.toString());
      if (finding.existingImageUrl)
        formData.append(
          `findings[${index}].existingImageUrl`,
          finding.existingImageUrl,
        );

      // formData.append(
      //   `findings[${index}].startPointId`,
      //   finding.startPointId.toString(),
      // );
      // formData.append(
      //   `findings[${index}].endPointId`,
      //   finding.endPointId.toString(),
      // );
      formData.append(`findings[${index}].partNumber`, finding.partNumber);
      formData.append(
        `findings[${index}].numberOfPieces`,
        finding.numberOfPieces.toString(),
      );
      formData.append(`findings[${index}].sampleSize`, finding.sampleSize);
      formData.append(
        `findings[${index}].packerPayroll`,
        finding.packerPayroll.toString(),
      );

      if (finding.containerIdMatch !== null) {
        formData.append(
          `findings[${index}].containerIdMatch`,
          finding.containerIdMatch.toString(),
        );
      }

      formData.append(
        `findings[${index}].frontView`,
        finding.frontView.toString(),
      );
      formData.append(
        `findings[${index}].sideView`,
        finding.sideView.toString(),
      );
      formData.append(`findings[${index}].topView`, finding.topView.toString());
      formData.append(
        `findings[${index}].isometricView`,
        finding.isometricView.toString(),
      );

      if (finding.completeProcess !== null) {
        formData.append(
          `findings[${index}].completeProcess`,
          finding.completeProcess.toString(),
        );
      }

      formData.append(
        `findings[${index}].isProductConforming`,
        finding.isProductConforming.toString(),
      );

      if (finding.shopOrder) {
        formData.append(`findings[${index}].shopOrder`, finding.shopOrder);
      }
      formData.append(
        `findings[${index}].weldingDefects`,
        finding.weldingDefects.toString(),
      );
      formData.append(`findings[${index}].ppBom`, finding.ppBom.toString());

      if (finding.existingImageUrls) {
        formData.append(
          `findings[${index}].existingImageUrls`,
          finding.existingImageUrls,
        );
      }

      if (finding.imageFiles && finding.imageFiles.length > 0) {
        finding.imageFiles.forEach((file: File) => {
          formData.append(`findings[${index}].imageFiles`, file);
        });
      }
    });

    return formData;
  }

  async getAll(): Promise<AuditACDRead[]> {
    return apiClient.get<AuditACDRead[]>(this.getAllEndpoint);
  }

  async getById(id: number): Promise<AuditACDRead> {
    return apiClient.get<AuditACDRead>(`${this.getByIdEndpoint}${id}`);
  }

  async create(payload: CreateAuditACDPayload): Promise<any> {
    const formData = this.buildFormData(payload);
    return apiClient.post<any>(this.createEndpoint, formData);
  }

  async update(id: number, payload: UpdateAuditACDPayload): Promise<any> {
    const formData = this.buildFormData(payload);
    return apiClient.put<any>(`${this.updateEndpoint}${id}`, formData);
  }

  async delete(id: number): Promise<any> {
    return apiClient.delete(`${this.deleteEndpoint}${id}`);
  }
}

export const auditsACDService = new AuditsACDService();
