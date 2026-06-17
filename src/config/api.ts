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
      update: "/api/Auth/EditUser",
      login: "/api/Auth/Login",
      toogleStatus: "/api/Auth/ToggleStatus/",
    },
    catalags: {
      getRoles: "/api/Catalogs/roles",
      getLines: "/api/Catalogs/lines",
      getClients: "/api/Catalogs/clients",
      getShifts: "/api/Catalogs/shifts",
      getMaterial: "/api/Catalogs/material",
      getDefects: "/api/Catalogs/defects",
      getContainmentActions: "/api/Catalogs/containmentActions",
      getTypeScrap: "/api/Catalogs/typeScrap",
      getScrap: "/api/Catalogs/Scrap",
      getRejections: "/api/Catalogs/Rejections",
      getConditionByDefect: "/api/Catalogs/conditions/",
      getCategoryOperators: "/api/Catalogs/categorys",
      getTypeMeasuringEquipment: "/api/Catalogs/equipments",
      getProcessByLine: "/api/Catalogs/process/",
      getPipeDiameters: "/api/Catalogs/pipeDiameters",
      getMachineCodesByProcess: "/api/Catalogs/machineCodes/",
      getMachinesByLines: "/api/Catalogs/machinesByLines",
      getDefectByTypeScrap: "/api/Catalogs/defects/",
    },
    auditsFCDS: {
      create: "/api/AuditsFcds/Create",
    },
    rejections: {
      getNextFolio: "/api/Rejections/GeNextFolio",
      availableMonths: "/api/Rejections/AvailableMonths",
      exportByMonth: "/api/Rejections/ExportByMonth",
      create: "/api/Rejections/Create",
      update: "/api/Rejections/Edit/",
      delete: "/api/Rejections/Delete/",
    },
    scrap: {
      getById: "/api/Scrap/ById/",
      getAll: "/api/Scrap/GetAllScrap",
      createScrap: "/api/Scrap/CreateScrap",
      deleteScrap: "/api/Scrap/DeleteScrap/",
      verify: "/api/Scrap/Verify",
      reports: "/api/Scrap/ExportExcel",
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
