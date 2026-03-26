const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    user: {
      users: "/api/Auth/Users",
      register: "/api/Auth/Register",
      login: "/api/Auth/Login",
      toogleStatus: "/api/Auth/ToggleStatus/",
    },
    catalags: {
      getLines: "/api/Catalogs/lines",
      getClients: "/api/Catalogs/clients",
      getShifts: "/api/Catalogs/shifts",
      getMaterial: "/api/Catalogs/material",
      getTypeScrap: "/api/Catalogs/typeScrap",
      getScrap: "/api/Catalogs/Scrap",
      getProcessByLine: "/api/Catalogs/process/",
      getMachineCodesByProcess: "/api/Catalogs/machineCodes/",
      getDefectByTypeScrap: "/api/Catalogs/defects/",
    },
    scrap: {
      getById: "/api/Scrap/ById/",
      createScrap: "/api/Scrap/CreateScrap",
      verify: "/api/Scrap/Verify",
    },
    lines: {
      lineById: "/api/Lines/LineById/",
      create: "/api/Lines/CreateLine",
      update: "/api/Lines/UpdateLine/",
      delete: "/api/Lines/DeleteLine/",
    },
    client: {
      clientById: "/api/Clients/ClientById/",
      create: "/api/Clients/CreateClient",
      update: "/api/Clients/UpdateClient/",
      delete: "/api/Clients/DeleteClient/",
    },
  },
};
