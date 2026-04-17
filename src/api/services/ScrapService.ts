import { API_CONFIG } from "../../config/api";
import type {
  Scrap,
  ScrapList,
  ScrapRead,
  VerifyScrapPayload,
} from "../../types/types";
import { apiClient } from "../client";

class ScrapService {
  private getScrapByIdEndpoint = API_CONFIG.endpoints.scrap.getById;
  private getAllScrapEndpoint = API_CONFIG.endpoints.scrap.getAll;
  private getReportsEndpoint = API_CONFIG.endpoints.scrap.reports;
  private createScrapEndpoint = API_CONFIG.endpoints.scrap.createScrap;
  private verifyScrapEndpoint = API_CONFIG.endpoints.scrap.verify;

  async getScrapById(id: number): Promise<ScrapRead> {
    return apiClient.get<ScrapRead>(`${this.getScrapByIdEndpoint}${id}`);
  }

  async getAllScrap(): Promise<ScrapList[]> {
    return apiClient.get<ScrapList[]>(this.getAllScrapEndpoint);
  }

  async getReports(month?: number, year?: number): Promise<void> {
    const now = new Date();
    const reportMonth = month ?? now.getMonth() + 1;
    const reportYear = year ?? now.getFullYear();

    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const fileName = `Reporte_Scrap_${meses[reportMonth - 1]}_${reportYear}.xlsx`;

    let endpoint = this.getReportsEndpoint;
    if (month && year) {
      endpoint += `?month=${month}&year=${year}`;
    }

    return apiClient.downloadFile(endpoint, fileName);
  }

  async createScrap(data: Scrap): Promise<void> {
    return apiClient.post<void>(this.createScrapEndpoint, data);
  }

  async verifyScrap(data: VerifyScrapPayload): Promise<void> {
    return apiClient.patch<void>(this.verifyScrapEndpoint, data);
  }
}

export const scrapService = new ScrapService();
