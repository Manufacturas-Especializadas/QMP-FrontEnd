import { ChevronRight, Clock, Layers, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ScrapIndex = () => {
  const navigate = useNavigate();

  const registros = [
    {
      linea: "L-12",
      tipoScrap: "Rebaba Excesiva",
      kilos: 28.4,
      hora: "08:30 AM",
      turno: "Día",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 
        bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl text-secondary">
            <TrendingUp size={28} />
          </div>
          <div>
            <h1
              className="text-2xl font-black text-gray-800 tracking-tight
              uppercase"
            >
              Panel de Scrap
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Visualiza y gestiona los desperdicios de hoy.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/scrap/registro")}
          className="flex items-center justify-center gap-2 
          bg-linear-to-r from-secondary to-primary text-white 
          px-4 py-2 rounded-2xl font-bold shadow-lg shadow-blue-200 
          hover:scale-[1.02] active:scale-[0.98] transition-all 
          hover:cursor-pointer"
        >
          <Plus size={20} strokeWidth={3} />
          Nuevo Scrap
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Clock size={16} />
            Historial del Turno
          </h2>
          <span className="text-xs font-bold text-secondary bg-blue-50 px-3 py-1 rounded-full">
            {registros.length} Registros hoy
          </span>
        </div>

        {registros.map((reg, index) => (
          <div
            key={index}
            className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm 
            hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6"
          >
            <div
              className="flex flex-col items-center justify-center bg-gray-50 
              group-hover:bg-blue-50 px-6 py-3 rounded-xl border border-transparent 
              group-hover:border-blue-100 transition-colors min-w-25"
            >
              <span className="text-[10px] font-black text-gray-400 group-hover:text-secondary uppercase">
                Línea
              </span>
              <span className="text-2xl font-black text-gray-600 group-hover:text-secondary">
                {reg.linea}
              </span>
            </div>

            {/* Centro: Info */}
            <div className="flex-1 space-y-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-800">
                {reg.tipoScrap}
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs text-gray-400 font-bold uppercase">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {reg.hora}
                </span>
                <span className="flex items-center gap-1">
                  <Layers size={12} /> {reg.turno}
                </span>
              </div>
            </div>

            {/* Derecha: Kilos */}
            <div className="flex items-center gap-4 pr-4">
              <div className="text-right">
                <span className="block text-2xl font-black text-gray-800">
                  {reg.kilos}{" "}
                  <small className="text-sm text-gray-400">kg</small>
                </span>
                <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md uppercase">
                  Por Verificar
                </span>
              </div>
              <div className="p-2 rounded-full bg-gray-50 text-gray-300 group-hover:text-secondary group-hover:bg-blue-50 transition-colors">
                <ChevronRight size={20} />
              </div>
            </div>

            {/* Línea de acento lateral */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
