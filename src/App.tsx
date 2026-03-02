import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { MyRoutes } from "./routes/Routes";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <MyRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};
