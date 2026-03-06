import { API_CONFIG } from "../../config/api";
import type { LineRead, LinesCreate } from "../../types/types";
import { apiClient } from "../client";

class LinesService {
  private getLineByIdEndpoint = API_CONFIG.endpoints.lines.lineById;
  private createEndpoint = API_CONFIG.endpoints.lines.create;

  async getLineById(id: number): Promise<LineRead> {
    return apiClient.get<LineRead>(`${this.getLineByIdEndpoint}${id}`);
  }

  async create(formData: LinesCreate): Promise<void> {
    await apiClient.post<void>(this.createEndpoint, formData);
  }
}

export const linesService = new LinesService();
