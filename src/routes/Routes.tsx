import { Navigate, Route, Routes } from "react-router-dom";
import { ScrapIndex } from "../pages/Scrap/ScrapIndex";
import { ScrapForm } from "../pages/Scrap/ScrapForm";
import { Configuration } from "../pages/Configuration/Configuration";
import { LinesConfig } from "../pages/Configuration/Lines/LinesConfig";
import { ClientConfig } from "../pages/Configuration/Clients/ClientConfig";
import { Register } from "../pages/Auth/Register";
import { Login } from "../pages/Auth/Login";
import { ProtectedRoute } from "../components/Auth/ProtectedRoute";
import { MainLayout } from "../components/Layouts/MainLayout/MainLayout";
import { UserIndex } from "../pages/Users/UserIndex";
import { ScrapReports } from "../pages/Scrap/ScrapReports";
import { RejectionsIndex } from "../pages/Rejections/RejectionsIndex";
import { RejectionReports } from "../pages/Rejections/RejectionReports";
import { ScrapConfig } from "../pages/Configuration/Scrap/ScrapConfig";
import { AuditsFCDS } from "../pages/AuditsFCDS/AuditsFCDS";
import { AuditsReportFCDS } from "../pages/AuditsFCDS/AuditsReportFCDS";
import { AuditsScrap } from "../pages/AuditsScrap/AuditsScrap";
import { AuditsScrapReport } from "../pages/AuditsScrap/AuditsScrapReport";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<AuditsFCDS />} />
          <Route
            path="/auditoriasFCDS/reportes"
            element={<AuditsReportFCDS />}
          />
          <Route path="/scrap" element={<ScrapIndex />} />
          <Route path="/scrap/auditoria" element={<AuditsScrap />} />
          <Route
            path="/scrap/auditoria/reportes"
            element={<AuditsScrapReport />}
          />
          <Route path="/scrap/registro" element={<ScrapForm />} />
          <Route path="/scrap/reportes" element={<ScrapReports />} />
          <Route path="/rechazos" element={<RejectionsIndex />} />
          <Route path="/rechazos/reportes" element={<RejectionReports />} />

          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/usuarios" element={<UserIndex />} />
            <Route path="/config" element={<Configuration />} />
            <Route path="/config/lineas" element={<LinesConfig />} />
            <Route path="/config/clientes" element={<ClientConfig />} />
            <Route path="/config/scrap" element={<ScrapConfig />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
