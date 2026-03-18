import { 
  PhoneCall, 
  Users, 
  Clock, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <PhoneCall className="w-5 h-5" />, label: "Total Voice Traffic", value: "1,284", trend: "+12.5%", positive: true },
          { icon: <Users className="w-5 h-5" />, label: "Active Intelligence", value: "12", trend: "Stable", positive: true },
          { icon: <Clock className="w-5 h-5" />, label: "Avg. Latency Engine", value: "382ms", trend: "-40ms", positive: true },
          { icon: <TrendingUp className="w-5 h-5" />, label: "Conversion Yield", value: "8.4%", trend: "+2.1%", positive: true },
        ].map((stat, idx) => (
          <div key={idx} className="p-8 rounded-[2.5rem] bg-white border border-neutral-200 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className={`flex items-center px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${stat.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {stat.trend}
                {stat.positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <ArrowDownRight className="ml-1 w-3 h-3" />}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-neutral-900 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2 p-10 rounded-[3rem] bg-white border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-10 border-b border-neutral-50 pb-6">
            <h2 className="font-black text-xl text-neutral-900 uppercase tracking-tight">Real-time Stream</h2>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">View all telemetry</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-neutral-100 hover:bg-neutral-50/50 transition-all group/item">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover/item:text-primary transition-colors shadow-inner">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-neutral-900 text-sm tracking-tight">+1 (555) 000-{i}234</p>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Lead Qualification Engine • 2m 45s</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-600 mb-2 border border-green-100">
                    SUCCESS
                  </div>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-tight">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="p-10 rounded-[3rem] bg-white border border-neutral-200 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-1000" />
          <h2 className="font-black text-xl text-neutral-900 uppercase tracking-tight mb-10 relative z-10">Neural Telemetry</h2>
          <div className="space-y-8 relative z-10">
            {[
              { label: "Voice Synthesis", status: "Operational", color: "bg-green-500" },
              { label: "RAG Engine", status: "Operational", color: "bg-green-500" },
              { label: "SIP Trunking", status: "Operational", color: "bg-green-500" },
              { label: "ElevenLabs Mesh", status: "Degraded", color: "bg-yellow-500" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between group/status">
                <div>
                  <p className="text-sm font-black text-neutral-900 uppercase tracking-tight group-hover/status:text-primary transition-colors">{item.label}</p>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{item.status}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${item.color} shadow-xl ${item.color.includes('green') ? 'shadow-green-500/20' : 'shadow-yellow-500/20'} transition-all group-hover/status:scale-125`} />
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 relative z-10 shadow-inner group-hover:bg-white transition-all duration-700">
            <p className="text-[10px] font-black text-primary mb-3 uppercase tracking-[0.2em]">Engine Intel</p>
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest leading-relaxed opacity-80 italic">
              Activate "Neural Filtering" in the White-Label engine to reduce background noise during high-traffic intervals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
