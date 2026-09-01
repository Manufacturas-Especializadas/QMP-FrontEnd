import { Navigate, Route, Routes } from "react-router-dom";

// Auth
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { ProtectedRoute } from "../components/Auth/ProtectedRoute";

// Layout
import { MainLayout } from "../components/Layouts/MainLayout/MainLayout";

// Scrap
import { ScrapIndex } from "../pages/Scrap/ScrapIndex";
import { ScrapForm } from "../pages/Scrap/ScrapForm";
import { ScrapReports } from "../pages/Scrap/ScrapReports";

// Rejections
import { RejectionsIndex } from "../pages/Rejections/RejectionsIndex";
import { RejectionReports } from "../pages/Rejections/RejectionReports";

// Audits
import { AuditsFCDS } from "../pages/AuditsFCDS/AuditsFCDS";
import { AuditsReportFCDS } from "../pages/AuditsFCDS/AuditsReportFCDS";
import { AuditsACDS } from "../pages/AuditsACDS/AuditsACDS";
import { AuditsScrap } from "../pages/AuditsScrap/AuditsScrap";
import { AuditsScrapReport } from "../pages/AuditsScrap/AuditsScrapReport";

// Users
import { UserIndex } from "../pages/Users/UserIndex";

// Configuration
import { Configuration } from "../pages/Configuration/Configuration";
import { LinesConfig } from "../pages/Configuration/Lines/LinesConfig";
import { ClientConfig } from "../pages/Configuration/Clients/ClientConfig";
import { ScrapConfig } from "../pages/Configuration/Scrap/ScrapConfig";
import { ProcesesConfig } from "../pages/Configuration/Processes/ProcesesConfig";
import { MachineCodesConfig } from "../pages/Configuration/MachineCodes/MachineCodesConfig";
import { ACDReport } from "../pages/AuditsACDS/ACDReport";

export const MyRoutes = () => {
  return (
    <Routes>
      {/* =========================
          RUTAS PÚBLICAS
      ========================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* =========================
          RUTAS PROTEGIDAS
      ========================== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<AuditsFCDS />} />
          <Route
            path="/auditoriasFCDS/reportes"
            element={<AuditsReportFCDS />}
          />
          <Route path="/auditorias-producto" element={<AuditsACDS />} />
          <Route path="/auditorias-producto/reportes" element={<ACDReport />} />
          <Route path="/scrap" element={<ScrapIndex />} />
          <Route path="/scrap/registro" element={<ScrapForm />} />
          <Route path="/scrap/reportes" element={<ScrapReports />} />

          <Route path="/scrap/auditoria" element={<AuditsScrap />} />
          <Route
            path="/scrap/auditoria/reportes"
            element={<AuditsScrapReport />}
          />

          {/* =========================
              RECHAZOS
          ========================== */}
          <Route path="/rechazos" element={<RejectionsIndex />} />
          <Route
            path="/rechazos/reportes"
            element={<RejectionReports />}
          />

          {/* =========================
              AUDITORÍAS
          ========================== */}
          <Route path="/auditorias-producto" element={<AuditsACDS />} />

          <Route path="/auditoriasFCDS" element={<AuditsFCDS />} />
          <Route
            path="/auditoriasFCDS/reportes"
            element={<AuditsReportFCDS />}
          />

          {/* =========================
              SOLO ADMIN
          ========================== */}
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            {/* Usuarios */}
            <Route path="/usuarios" element={<UserIndex />} />

            {/* Configuración */}
            <Route path="/config" element={<Configuration />} />
            <Route path="/config/lineas" element={<LinesConfig />} />
            <Route path="/config/procesos" element={<ProcesesConfig />} />
            <Route
              path="/config/codigo-maquinas"
              element={<MachineCodesConfig />}
            />
            <Route path="/config/clientes" element={<ClientConfig />} />
            <Route path="/config/scrap" element={<ScrapConfig />} />
          </Route>

        </Route>
      </Route>

      {/* =========================
          FALLBACK
      ========================== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};