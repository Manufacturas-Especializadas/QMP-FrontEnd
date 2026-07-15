interface StatCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  loading: boolean;
  themeColors: {
    badge: string;
    text: string;
  };
}
export const StatCard = ({ label, value, subtitle, loading, themeColors }: StatCardProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl font-black text-xs uppercase tracking-wider ${themeColors.badge}`}>
        {label}
      </div>
      <div>
        <p className={`text-2xl font-black ${themeColors.text}`}>
          {loading ? "..." : value}
        </p>
        <p className="text-[10px] uppercase font-black text-slate-400 tracking-wide">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
