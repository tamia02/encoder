"use client";

import { useState } from "react";
import { 
  Globe, 
  MessageSquare, 
  Instagram, 
  Mail, 
  Phone, 
  Bot, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Activity, 
  Plus, 
  ArrowUpRight,
  Settings,
  Layers,
  Webhook,
  Cloudy,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CHANNELS = [
  { 
    id: "web", 
    name: "Web Widget", 
    icon: <Bot className="w-5 h-5" />, 
    status: "Active", 
    uptime: "99.99%", 
    latency: "12ms", 
    color: "text-blue-500",
    bg: "bg-blue-50",
    metric: "4.2k Active"
  },
  { 
    id: "wa", 
    name: "WhatsApp", 
    icon: <MessageSquare className="w-5 h-5" />, 
    status: "Active", 
    uptime: "99.95%", 
    latency: "450ms", 
    color: "text-green-500",
    bg: "bg-green-50",
    metric: "12.4k Messages"
  },
  { 
    id: "voice", 
    name: "Voice / Phone", 
    icon: <Phone className="w-5 h-5" />, 
    status: "Degraded", 
    uptime: "98.2%", 
    latency: "850ms", 
    color: "text-purple-500",
    bg: "bg-purple-50",
    metric: "452 Calls"
  },
  { 
    id: "ig", 
    name: "Instagram DM", 
    icon: <Instagram className="w-5 h-5" />, 
    status: "Setup Required", 
    uptime: "N/A", 
    latency: "N/A", 
    color: "text-pink-500",
    bg: "bg-pink-50",
    metric: "0 Active"
  },
];

export default function OmniChannelPage() {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in slide-in-from-bottom-6 duration-1000 overflow-hidden font-sans">
      
      {/* HUD Header */}
      <header className="p-10 pb-8 flex items-center justify-between border-b border-neutral-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-2xl shadow-primary/10">
             <Globe className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">Omni-Channel Gateway</h2>
            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] mt-1">Universal Routing & Performance Monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="rounded-2xl h-12 px-8 border-neutral-200 bg-white hover:bg-neutral-50 font-black text-[10px] tracking-widest uppercase shadow-sm">
              <Activity className="w-4 h-4 mr-2" />
              SYSTEM HEALTH
           </Button>
           <Button className="rounded-2xl h-12 px-10 bg-black hover:bg-neutral-900 text-white font-black text-[10px] tracking-widest uppercase shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
              <Plus className="w-4 h-4 mr-2" />
              PROVISION CHANNEL
           </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-12">
        
        {/* Real-time Status HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {CHANNELS.map((channel) => (
             <div 
                key={channel.id} 
                onClick={() => setActiveChannel(channel.id)}
                className={`p-10 rounded-[3rem] border transition-all duration-500 cursor-pointer relative group overflow-hidden ${
                  activeChannel === channel.id 
                    ? "bg-white border-primary shadow-2xl ring-4 ring-primary/5" 
                    : "bg-white border-neutral-200 hover:border-primary/40 shadow-sm hover:shadow-xl"
                }`}
             >
                <div className={`w-14 h-14 rounded-[1.5rem] ${channel.bg} ${channel.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700 shadow-inner`}>
                   {channel.icon}
                </div>
                
                <div className="space-y-6">
                   <div>
                      <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">{channel.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                         <div className={`w-2 h-2 rounded-full ${
                           channel.status === 'Active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 
                           channel.status === 'Degraded' ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'bg-neutral-300'
                         }`} />
                         <span className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em]">{channel.status}</span>
                      </div>
                   </div>

                   <p className="text-2xl font-black text-neutral-900 tracking-tight uppercase">{channel.metric}</p>
                   
                   <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                      <div className="space-y-1">
                         <p className="text-[8px] font-black text-neutral-300 uppercase tracking-widest">Uptime</p>
                         <p className="text-[10px] font-black text-neutral-900 uppercase">{channel.uptime}</p>
                      </div>
                      <div className="space-y-1 text-right">
                         <p className="text-[8px] font-black text-neutral-300 uppercase tracking-widest">Latency</p>
                         <p className="text-[10px] font-black text-neutral-900 uppercase">{channel.latency}</p>
                      </div>
                   </div>
                </div>

                <div className="absolute top-8 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                   <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
             </div>
           ))}
        </div>

        {/* Global Performance Chart Placeholder */}
        <div className="bg-white rounded-[3.5rem] border border-neutral-200 shadow-sm overflow-hidden p-12 relative group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700">
           <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-[2rem] bg-neutral-100 flex items-center justify-center text-neutral-900 shadow-inner">
                    <BarChart3 className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Channel Performance Distribution</h3>
                    <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] mt-1">Global aggregation across all neural endpoints</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <span className="bg-green-50 text-green-700 border border-green-100 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm">99.8% EFFICIENCY YIELD</span>
              </div>
           </div>

           <div className="h-[300px] w-full bg-neutral-50/50 rounded-[2.5rem] border border-neutral-100 border-dashed flex items-center justify-center relative overflow-hidden group/chart cursor-crosshair">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.05),transparent)]" />
              <div className="flex flex-col items-center gap-6 relative z-10 text-neutral-300 group-hover/chart:text-primary transition-colors duration-700">
                 <Cloudy className="w-16 h-16 animate-bounce duration-1000" />
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Synchronizing Data Pipeline...</p>
              </div>
              
              {/* Simulated Chart Bars */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-end gap-5 opacity-10 group-hover/chart:opacity-60 transition-all duration-1000">
                 {[40, 120, 45, 180, 60, 150, 30, 200, 90, 140, 110, 160].map((h, i) => (
                    <div key={i} className="w-10 bg-primary rounded-2xl transition-all duration-1000 delay-[i*50ms] group-hover/chart:scale-y-110" style={{ height: `${h}px` }} />
                 ))}
              </div>
           </div>
        </div>

        {/* Management Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           {/* Webhooks & Cloud Hub */}
           <div className="p-12 rounded-[4rem] bg-white border border-neutral-200 shadow-sm space-y-10 group hover:border-purple-200 transition-all duration-700">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-[2rem] bg-purple-500/10 flex items-center justify-center text-purple-600 shadow-inner">
                    <Webhook className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Incoming Neural Webhooks</h3>
                    <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] mt-1">Provision listening endpoints for external triggers</p>
                 </div>
              </div>
              
              <div className="space-y-6">
                 {[
                   { name: "Order-Created Hook", endpoint: "/V1/WEBHOOK/ORDERS", active: true },
                   { name: "Support-Ticket Hook", endpoint: "/V1/WEBHOOK/TICKETS", active: false },
                 ].map((hook, i) => (
                   <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-neutral-50 border border-neutral-100 group/hook hover:bg-white hover:border-purple-200 hover:shadow-xl transition-all duration-500 cursor-pointer">
                      <div className="flex items-center gap-6">
                         <div className={`w-3 h-3 rounded-full ${hook.active ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]' : 'bg-neutral-300'}`} />
                         <div>
                            <p className="text-sm font-black text-neutral-800 uppercase tracking-tight">{hook.name}</p>
                            <p className="text-[10px] text-neutral-400 font-mono mt-1 group-hover/hook:text-purple-600 transition-colors uppercase tracking-[0.2em]">{hook.endpoint}</p>
                         </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-neutral-100 opacity-0 group-hover/hook:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                        <ChevronRight className="w-5 h-5 text-purple-600" />
                      </div>
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full rounded-[2rem] h-16 border-4 border-dashed border-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 transition-all duration-500">
                    + PROVISION NEW LISTENER INSTANCE
                 </Button>
              </div>
           </div>

           {/* Deployment Rules */}
           <div className="p-12 rounded-[4rem] bg-neutral-900 text-white space-y-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-all duration-1000 group-hover:scale-110">
                 <ShieldCheck className="w-32 h-32" />
              </div>
              <div className="flex items-center gap-6 relative z-10">
                 <div className="w-14 h-14 rounded-[2rem] bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner">
                    <Layers className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Global Routing Engine</h3>
                    <p className="text-[10px] text-neutral-500 font-black uppercase tracking-[0.2em] mt-1">AI decision persistence across channels</p>
                 </div>
              </div>

              <div className="space-y-6 relative z-10">
                 <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 group/rule">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <p className="text-[11px] font-black uppercase tracking-widest text-neutral-300 group-hover/rule:text-white transition-colors">Force Handoff on High Sentiment Negative</p>
                 </div>
                 <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 group/rule">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <p className="text-[11px] font-black uppercase tracking-widest text-neutral-300 group-hover/rule:text-white transition-colors">Auto-Provision WhatsApp Template on Opt-in</p>
                 </div>
                 <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-white/10 border border-primary/40 shadow-[0_0_30px_rgba(0,102,255,0.2)] group/rule">
                    <Zap className="w-5 h-5 text-primary animate-pulse" />
                    <p className="text-[11px] font-black text-white uppercase tracking-widest">Synchronize Identity across DM & Voice</p>
                 </div>
              </div>

              <Button className="w-full rounded-[2rem] h-16 bg-white text-black hover:bg-neutral-100 font-black text-[10px] tracking-widest uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                 ORCHESTRATION ENGINE SETTINGS
              </Button>
           </div>
        </div>

      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f1f1f1;
          border: 2px solid white;
          border-radius: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e5e5e5;
        }
      `}</style>
    </div>
  );
}
