const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    catalags: {
      getLines: "/api/Catalogs/lines",
      getShifts: "/api/Catalogs/shifts",
      getMaterial: "/api/Catalogs/material",
      getTypeScrap: "/api/Catalogs/typeScrap",
      getProcessByLine: "/api/Catalogs/process/",
      getMachineCodesByProcess: "/api/Catalogs/machineCodes/",
      getDefectByTypeScrap: "/api/Catalogs/defects/",
    },
    scrap: {
      createScrap: "/api/Scrap/CreateScrap",
    },
  },
};
