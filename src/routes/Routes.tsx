import { Route, Routes } from "react-router-dom";
import { ScrapIndex } from "../pages/Scrap/ScrapIndex";
import { ProcessAudit } from "../pages/ProcessAudit/ProcessAudit";
import { ScrapForm } from "../pages/Scrap/ScrapForm";
import { Configuration } from "../pages/Configuration/Configuration";
import { LinesConfig } from "../pages/Configuration/Lines/LinesConfig";
import { ClientConfig } from "../pages/Configuration/Clients/ClientConfig";
import { Register } from "../pages/Auth/Register";
import { Login } from "../pages/Auth/Login";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProcessAudit />} />
      <Route path="/scrap" element={<ScrapIndex />} />
      <Route path="/scrap/registro" element={<ScrapForm />} />
      <Route path="/config" element={<Configuration />} />
      <Route path="/config/lineas" element={<LinesConfig />} />
      <Route path="/config/clientes" element={<ClientConfig />} />
    </Routes>
  );
};
