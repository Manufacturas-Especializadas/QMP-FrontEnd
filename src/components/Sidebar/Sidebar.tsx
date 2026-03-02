import { useState } from "react";
import Logo from "../../assets/logomesa.png";
import {
  ChevronDown,
  ChevronLeft,
  Circle,
  ClipboardCheck,
  Database,
  Menu,
  PackageCheck,
  Settings,
  Trash2,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  name: string;
  icon: any;
  path?: string;
  subMenu?: { name: string; path: string }[];
}

const menuItems: MenuItem[] = [
  {
    name: "Auditorias de Proceso",
    icon: ClipboardCheck,
    path: "/auditorias-proceso",
  },
  {
    name: "Auditorias Producto Terminado",
    icon: PackageCheck,
    path: "/auditorias-producto",
  },
  {
    name: "Scrap",
    icon: Trash2,
    subMenu: [
      { name: "Registro", path: "/scrap" },
      { name: "Auditoria", path: "/scrap/auditoria" },
    ],
  },
  { name: "ROM", icon: Database, path: "/rom" },
  { name: "Usuarios", icon: Users, path: "/usuarios" },
  { name: "Configuraciones", icon: Settings, path: "/configuraciones" },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Auditorias de proceso");
  const navigate = useNavigate();

  const handleNavigation = (name: string, path?: string) => {
    setActiveTab(name);
    if (path) {
      navigate(path);
    }
  };

  const toggleSubMenu = (name: string) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 
        transition-all duration-300 flex flex-col ${isCollapsed ? "w-20" : "w-72"}`}
    >
      <div className="p-4 mb-6 flex items-center justify-between">
        {!isCollapsed && (
          <img src={Logo} alt="MESA Logo" className="h-10 object-contain" />
        )}
        <button
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            setOpenSubMenu(null);
          }}
          className="p-2 rounded-lg hover:bg-gray-100 text-secondary hover:cursor-pointer"
        >
          {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const hasSubMenu = !!item.subMenu;
          const isSubMenuOpen = openSubMenu === item.name;

          return (
            <div key={item.name} className="flex flex-col">
              <button
                onClick={() =>
                  hasSubMenu
                    ? toggleSubMenu(item.name)
                    : handleNavigation(item.name, item.path)
                }
                className={`
                  w-full flex items-center p-3 rounded-xl transition-all 
                  duration-200 group hover:cursor-pointer
                  ${
                    activeTab === item.name && !hasSubMenu
                      ? "bg-secondary text-white shadow-md"
                      : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                  }
                `}
              >
                <item.icon
                  size={22}
                  className={`${activeTab === item.name && !hasSubMenu ? "text-white" : "text-secondary"}`}
                />

                {!isCollapsed && (
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

              {!isCollapsed && hasSubMenu && isSubMenuOpen && (
                <div
                  className="mt-1 ml-4 pl-4 border-l-2 border-gray-100 space-y-1 
                  animate-in slide-in-from-top-2 duration-200"
                >
                  {item.subMenu?.map((sub) => (
                    <button
                      key={sub.name}
                      onClick={() => handleNavigation(sub.name, sub.path)}
                      className={`
                        w-full flex items-center p-2 rounded-lg text-sm transition-colors hover:cursor-pointer
                        ${
                          activeTab === sub.name
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
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};
