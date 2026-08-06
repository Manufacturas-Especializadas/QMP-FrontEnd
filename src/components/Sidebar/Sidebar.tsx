import { useState, useEffect } from "react";
import Logo from "../../assets/logomesa.png";
import {
  ChevronDown,
  ChevronLeft,
  Circle,
  ClipboardCheck,
  Database,
  LogOut,
  Menu,
  PackageCheck,
  Settings,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface MenuItem {
  name: string;
  icon: any;
  path?: string;
  subMenu?: { name: string; path: string; roles?: string[] }[];
  roles?: string[];
}

const menuItems: MenuItem[] = [
  {
    name: "Auditorias de Proceso",
    icon: ClipboardCheck,
    path: "/auditorias-proceso",
    roles: [
      "Admin",
      "Ingeniero de Calidad",
      "Inspector de Calidad",
      "Analista de Calidad",
    ],
  },
  {
    name: "Auditorias Producto Terminado",
    icon: PackageCheck,
    path: "/auditorias-producto",
    roles: [
      "Admin",
      "Ingeniero de Calidad",
      "Inspector de Calidad",
      "Analista de Calidad",
    ],
  },
  {
    name: "Scrap",
    icon: Trash2,
    subMenu: [
      {
        name: "Registro",
        path: "/scrap",
        roles: [
          "Admin",
          "Calidad Proveedores",
          "Inspector Scrap",
          "Producción",
          "Analista de Calidad",
        ],
      },
      {
        name: "Auditoria",
        path: "/scrap/auditoria",
        roles: [
          "Admin",
          "Ingeniero de Calidad",
          "Calidad Proveedores",
          "Inspector de Calidad",
          "Inspector Scrap",
        ],
      },
    ],
  },
  {
    name: "RDM",
    icon: Database,
    path: "/rechazos",
    roles: [
      "Admin",
      "Analista de Calidad",
      "Calidad Proveedores",
      "Ingeniero de Calidad",
      "Inspector de Calidad",
      "Inspector Scrap",
    ],
  },
  { name: "Usuarios", icon: Users, path: "/usuarios", roles: ["Admin"] },
  {
    name: "Configuraciones",
    icon: Settings,
    path: "/config",
    roles: ["Admin"],
  },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Auditorias de proceso");

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role || "");
  });

  const handleNavigation = (name: string, path?: string) => {
    setActiveTab(name);
    if (path) {
      navigate(path);
      setIsMobileOpen(false);
    }
  };

  const toggleSubMenu = (name: string) => {
    if (isCollapsed && !isMobileOpen) setIsCollapsed(false);
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-xl shadow-md text-secondary hover:bg-gray-50"
      >
        <Menu size={24} />
      </button>

      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:relative z-50 h-screen bg-white border-r border-gray-200 
          transition-all duration-300 flex flex-col
          ${isMobileOpen ? "translate-x-0 w-72 shadow-2xl" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed && !isMobileOpen ? "md:w-20" : "md:w-72"}
        `}
      >
        {/* HEADER DEL SIDEBAR */}
        <div className="p-4 mb-6 flex items-center justify-between">
          {(!isCollapsed || isMobileOpen) && (
            <img src={Logo} alt="MESA Logo" className="h-10 object-contain" />
          )}

          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsMobileOpen(false);
              } else {
                setIsCollapsed(!isCollapsed);
                setOpenSubMenu(null);
              }
            }}
            className="p-2 rounded-lg hover:bg-gray-100 text-secondary hover:cursor-pointer"
          >
            <span className="md:hidden">
              <X size={24} />
            </span>
            <span className="hidden md:block">
              {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
            </span>
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {filteredMenuItems.map((item) => {
            const hasSubMenu = !!item.subMenu;
            const isSubMenuOpen = openSubMenu === item.name;
            const isExpanded = !isCollapsed || isMobileOpen;

            return (
              <div key={item.name} className="flex flex-col">
                <button
                  onClick={() =>
                    hasSubMenu
                      ? toggleSubMenu(item.name)
                      : handleNavigation(item.name, item.path)
                  }
                  title={!isExpanded ? item.name : undefined}
                  className={`
                    w-full flex items-center p-3 rounded-xl transition-all 
                    duration-200 group hover:cursor-pointer
                    ${activeTab === item.name && !hasSubMenu
                      ? "bg-secondary text-white shadow-md"
                      : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                    }
                  `}
                >
                  <item.icon
                    size={22}
                    className={`${activeTab === item.name && !hasSubMenu ? "text-white" : "text-secondary"}`}
                  />

                  {isExpanded && (
                    <>
                      <span className="ml-3 font-medium text-sm flex-1 text-left">
                        {item.name}
                      </span>
                      {hasSubMenu && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${isSubMenuOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </>
                  )}
                </button>

                {isExpanded && hasSubMenu && isSubMenuOpen && (
                  <div
                    className="mt-1 ml-4 pl-4 border-l-2 border-gray-100 space-y-1 
                    animate-in slide-in-from-top-2 duration-200"
                  >
                    {item.subMenu?.map((sub) => {
                      if (sub.roles && !sub.roles.includes(user?.role || ""))
                        return null;

                      return (
                        <button
                          key={sub.name}
                          onClick={() => handleNavigation(sub.name, sub.path)}
                          className={`
                            w-full flex items-center p-2 rounded-lg text-sm transition-colors hover:cursor-pointer
                            ${activeTab === sub.name
                              ? "text-secondary font-bold bg-blue-50"
                              : "text-gray-500 hover:text-primary hover:bg-gray-50"
                            }
                          `}
                        >
                          <Circle
                            size={6}
                            className={`mr-3 ${activeTab === sub.name ? "fill-secondary" : "fill-gray-300"}`}
                          />
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div
            className={`flex items-center ${isCollapsed && !isMobileOpen ? "justify-center" : "gap-3"} mb-4`}
          >
            <div
              className="w-8 h-8 shrink-0 rounded-full bg-blue-100 flex items-center justify-center 
              text-blue-600 font-bold text-xs"
            >
              {user?.unique_name?.substring(0, 2).toUpperCase() || "US"}
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-slate-700 truncate">
                  {user?.unique_name}
                </span>
                <span
                  className="text-[10px] uppercase text-slate-400 font-black
                  tracking-wider truncate"
                >
                  {user?.role}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={logout}
            className={`w-full flex items-center p-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors hover:cursor-pointer
              ${isCollapsed && !isMobileOpen ? "justify-center" : "gap-3"}`}
          >
            <LogOut size={20} />
            {(!isCollapsed || isMobileOpen) && (
              <span className="text-sm font-semibold">Cerrar Sesión</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
