import { Outlet } from "react-router-dom";
import { Sidebar } from "../../Sidebar/Sidebar";

export const MainLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pt-20 px-4 pb-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};
