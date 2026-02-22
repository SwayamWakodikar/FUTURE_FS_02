

interface StatsSectionProps {
  stats: {
    total: number;
    new: number;
    qualified: number;
    closed: number;
  };
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {[
        { label: "Total Leads", value: stats.total, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", color: "from-blue-500 to-cyan-400", bg: "bg-blue-50", text: "text-blue-700" },
        { label: "New", value: stats.new, icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", color: "from-amber-400 to-orange-500", bg: "bg-amber-50", text: "text-amber-700" },
        { label: "Qualified", value: stats.qualified, icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50", text: "text-emerald-700" },
        { label: "Closed", value: stats.closed, icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "from-purple-500 to-violet-600", bg: "bg-purple-50", text: "text-purple-700" },
      ].map((stat) => (
        <div key={stat.label} className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/80 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col relative overflow-hidden group">
          <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500`}></div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.text}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
              </svg>
            </div>
          </div>
          <p className={`text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
