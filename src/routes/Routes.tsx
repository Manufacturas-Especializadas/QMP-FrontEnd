import { Route, Routes } from "react-router-dom";
import { ScrapIndex } from "../pages/Scrap/ScrapIndex";
import { ProcessAudit } from "../pages/ProcessAudit/ProcessAudit";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProcessAudit />} />
      <Route path="/scrap" element={<ScrapIndex />} />
    </Routes>
  );
};
