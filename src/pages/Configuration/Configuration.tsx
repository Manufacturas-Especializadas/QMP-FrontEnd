import {
  Settings2,
  Users,
  AlertTriangle,
  FileCheck,
  ArrowRight,
  Trash,
  Cpu,
  MonitorCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const configOptions = [
  {
    title: "Administrar Líneas",
    description: "Configura las líneas de producción y estaciones de trabajo.",
    icon: <Settings2 className="w-8 h-8 text-blue-600" />,
    path: "/config/lineas",
  },
  {
    title: "Administrar Procesos",
    description: "Configura los procesos ligados a la linea de producción.",
    icon: <Cpu className="w-8 h-8 text-blue-600" />,
    path: "/config/procesos",
  },
  {
    title: "Administrar los codigos de maquinas",
    description: "Configura los codigos de maquina ligadas a un proceso.",
    icon: <MonitorCheck className="w-8 h-8 text-blue-600" />,
    path: "/config/codigo-maquinas",
  },
  {
    title: "Clientes",
    description: "Gestión de clientes y especificaciones de proyectos.",
    icon: <Users className="w-8 h-8 text-blue-600" />,
    path: "/config/clientes",
  },
  {
    title: "Defectos",
    description: "Catálogo maestro de tipos de defectos encontrados.",
    icon: <AlertTriangle className="w-8 h-8 text-blue-600" />,
    path: "/config/defectos",
  },
  {
    title: "Condiciones de Defectos",
    description: "Define criterios de aceptación y rechazo para cada defecto.",
    icon: <FileCheck className="w-8 h-8 text-blue-600" />,
    path: "/config/condiciones",
  },
  {
    title: "Scrap",
    description: "Gestión de scrap",
    icon: <Trash className="w-8 h-8 text-blue-600" />,
    path: "/config/scrap",
  },
];

export const Configuration = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">
          Configuración del Sistema
        </h1>
        <p className="text-slate-500 mt-2">
          Gestiona los parámetros base para el control de scrap.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {configOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => navigate(option.path)}
            className="group relative bg-white p-6 rounded-xl border border-slate-200 shadow-sm 
              hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div
                className="mb-4 p-3 bg-blue-50 w-fit rounded-lg group-hover:bg-blue-600 
                group-hover:text-white transition-colors"
              >
                {option.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {option.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {option.description}
              </p>
            </div>

            <div
              className="mt-6 flex items-center text-sm font-medium 
              text-blue-600 group-hover:translate-x-1 transition-transform"
            >
              Configurar <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
