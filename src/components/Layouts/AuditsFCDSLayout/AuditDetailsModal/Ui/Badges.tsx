export const EvalBadge = ({ val }: { val: number }) => {
  if (val === 1)
    return (
      <span
        className="text-[10px] uppercase font-black px-2 py-0.5 bg-emerald-50 
        text-emerald-700 rounded-md"
      >
        Cumple
      </span>
    );
  if (val === 2)
    return (
      <span
        className="text-[10px] uppercase font-black px-2 py-0.5 bg-rose-50 
        text-rose-700 rounded-md"
      >
        No Cumple
      </span>
    );
  return (
    <span
      className="text-[10px] uppercase font-black px-2 py-0.5 bg-slate-100 
      text-slate-500 rounded-md"
    >
      N/A
    </span>
  );
};

export const PhysicalBadge = ({ val }: { val: number }) => {
  if (val === 1)
    return (
      <span
        className="text-[10px] uppercase font-black px-2 py-0.5 bg-amber-50 
        text-amber-700 rounded-md"
      >
        Detectado
      </span>
    );
  if (val === 2)
    return (
      <span
        className="text-[10px] uppercase font-black px-2 py-0.5 bg-emerald-50 
        text-emerald-700 rounded-md"
      >
        Limpio
      </span>
    );
  return (
    <span
      className="text-[10px] uppercase font-black px-2 py-0.5 bg-slate-100 
      text-slate-500 rounded-md"
    >
      N/A
    </span>
  );
};
