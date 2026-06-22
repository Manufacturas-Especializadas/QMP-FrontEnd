import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              background: "#363636",
              color: "#fff",
              zIndex: 9999,
            },
            success: {
              duration: 10000,
              position: "top-right",
              style: {
                background: "#10B981",
                color: "#fff",
              },
            },
            error: {
              duration: 5000,
              position: "top-right",
              style: {
                background: "#EF4444",
                color: "#fff",
              },
            },
            loading: {
              duration: Infinity,
              position: "top-right",
              style: {
                background: "#3B82F6",
                color: "#fff",
              },
            },
          }}
        />
        <div className="flex min-h-screen bg-gray-50">
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <MyRoutes />
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};
