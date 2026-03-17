export const dynamic = 'force-dynamic';

import { BarChart3, TrendingUp, Filter, PhoneCall, Clock, Zap, Target, ArrowUpRight, ArrowDownRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function AnalyticsPage() {
  const calls = await prisma.call.findMany();
  
  const stats = [
    { label: "Total Call Volume", value: calls.length || "0", trend: "+12.5%", positive: true, icon: <PhoneCall className="w-4 h-4" /> },
    { label: "Completion Rate", value: "98.2%", trend: "+0.4%", positive: true, icon: <Target className="w-4 h-4" /> },
    { label: "Avg. Conversation", value: "4m 12s", trend: "-15s", positive: true, icon: <Clock className="w-4 h-4" /> },
    { label: "Lead Capture ID", value: "24", trend: "+3", positive: true, icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Analytics</h2>
          <p className="text-muted-foreground text-sm">Deep insights into your AI agent performance and ROI.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 rounded-xl border-white/10 hover:bg-white/5">
            <Filter className="w-4 h-4" />
            Time Range
          </Button>
          <Button className="bg-primary hover:bg-primary/90 rounded-xl">Generate Report</Button>
        </div>
      </div>

      {/* Quick Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-full ${
                stat.positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
              }`}>
                {stat.trend}
                {stat.positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <ArrowDownRight className="ml-1 w-3 h-3" />}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Analytics Prototype Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-2xl bg-neutral-900/50 border border-white/5 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-white">Call Traffic Distribution</h3>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map(i => (
                <div key={i} className="w-1.5 h-6 bg-white/5 rounded-full" />
              ))}
            </div>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-4 px-4">
             {[60, 45, 90, 70, 40, 100, 80, 50, 85, 95, 65, 75].map((height, i) => (
                <div key={i} className="flex-1 group relative">
                  <div 
                    className="w-full bg-primary/20 rounded-t-lg group-hover:bg-primary transition-all duration-500" 
                    style={{ height: `${height}%` }}
                  />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Day {i+1}
                  </div>
                </div>
             ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-xs text-muted-foreground">
             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Inbound</div>
             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary/20" /> Outbound</div>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg text-white">Geo Performance</h3>
          </div>
          <div className="space-y-6 flex-1">
            {[
              { region: "North America", share: "62%", color: "bg-primary" },
              { region: "Middle East (GCC)", share: "24%", color: "bg-primary/60" },
              { region: "Europe", share: "14%", color: "bg-primary/30" },
            ].map((reg, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-300">{reg.region}</span>
                  <span className="font-bold text-white">{reg.share}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${reg.color}`} style={{ width: reg.share }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden group">
            <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/10 group-hover:rotate-12 transition-transform duration-500" />
            <p className="text-xs font-bold text-primary mb-2 uppercase tracking-tight">AI ROI Insight</p>
            <p className="text-sm text-neutral-300 leading-relaxed relative z-10">
              Your agents saved <span className="text-white font-bold">142 human-hours</span> this month, resulting in a estimated 22% overhead reduction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
