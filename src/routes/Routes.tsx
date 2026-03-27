import { Navigate, Route, Routes } from "react-router-dom";
import { ScrapIndex } from "../pages/Scrap/ScrapIndex";
import { ProcessAudit } from "../pages/ProcessAudit/ProcessAudit";
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

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProcessAudit />} />
          <Route path="/scrap" element={<ScrapIndex />} />
          <Route path="/scrap/registro" element={<ScrapForm />} />
          <Route path="/scrap/reportes" element={<ScrapReports />} />

          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/usuarios" element={<UserIndex />} />
            <Route path="/config" element={<Configuration />} />
            <Route path="/config/lineas" element={<LinesConfig />} />
            <Route path="/config/clientes" element={<ClientConfig />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
