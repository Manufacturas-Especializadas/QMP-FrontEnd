import { API_CONFIG } from "../../config/api";
import type { LinesCreate } from "../../types/types";
import { apiClient } from "../client";

class LinesService {
  private createEndpoint = API_CONFIG.endpoints.lines.create;

  async create(formData: LinesCreate): Promise<void> {
    await apiClient.post<void>(this.createEndpoint, formData);
  }
}

export const linesService = new LinesService();
