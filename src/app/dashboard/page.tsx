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
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <PhoneCall className="w-4 h-4" />, label: "Total Calls", value: "1,284", trend: "+12.5%", positive: true },
          { icon: <Users className="w-4 h-4" />, label: "Live Agents", value: "12", trend: "Stable", positive: true },
          { icon: <Clock className="w-4 h-4" />, label: "Avg. Latency", value: "382ms", trend: "-40ms", positive: true },
          { icon: <TrendingUp className="w-4 h-4" />, label: "Conversion", value: "8.4%", trend: "+2.1%", positive: true },
        ].map((stat, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {stat.icon}
              </div>
              <div className={`flex items-center text-[10px] font-bold ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                {stat.trend}
                {stat.positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <ArrowDownRight className="ml-1 w-3 h-3" />}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-black text-neutral-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 p-8 rounded-[2rem] bg-white border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-black text-xl text-neutral-900 uppercase tracking-tight">Recent Call Activity</h2>
            <button className="text-xs text-primary hover:underline">View all calls</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors p-2 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">+1 (555) 000-{i}234</p>
                    <p className="text-xs text-muted-foreground">Lead Qualification AI • 2m 45s</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-500 mb-1">
                    SUCCESS
                  </div>
                  <p className="text-[10px] text-muted-foreground">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="p-8 rounded-[2rem] bg-white border border-neutral-200 shadow-sm">
          <h2 className="font-black text-xl text-neutral-900 uppercase tracking-tight mb-8">System Health</h2>
          <div className="space-y-8">
            {[
              { label: "Voice Engine", status: "Operational", color: "bg-green-500" },
              { label: "RAG Knowledge Base", status: "Operational", color: "bg-green-500" },
              { label: "Telephony Provider", status: "Operational", color: "bg-green-500" },
              { label: "ElevenLabs API", status: "Degraded", color: "bg-yellow-500" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.status}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_8px_rgba(34,197,94,0.4)]`} />
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-blue-50 border border-blue-100">
            <p className="text-xs font-black text-blue-600 mb-2 uppercase tracking-widest">Agency Tip</p>
            <p className="text-[11px] text-neutral-600 font-medium leading-relaxed">
              Enable "Advanced Transcription" in Settings to improve intent detection for complex accents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
