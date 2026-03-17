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
    <div className="flex flex-col h-full bg-[#FDFDFD] animate-in fade-in duration-500 overflow-hidden font-sans">
      
      {/* HUD Header */}
      <header className="p-8 pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
               <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">Omni-Channel Gateway</h2>
          </div>
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em] mt-2 ml-1">Universal Routing & Performance Monitoring</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-11 border-neutral-200 bg-white hover:bg-neutral-50 font-black text-[10px] tracking-widest gap-2">
              <Activity className="w-4 h-4" />
              SYSTEM HEALTH
           </Button>
           <Button className="rounded-xl h-11 bg-[#0066FF] hover:bg-[#0052CC] text-white font-black text-[10px] tracking-widest gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
              <Plus className="w-4 h-4" />
              PROVISION CHANNEL
           </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
        
        {/* Real-time Status HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           {CHANNELS.map((channel) => (
             <div 
               key={channel.id} 
               onClick={() => setActiveChannel(channel.id)}
               className={`p-8 rounded-[2.5rem] border transition-all cursor-pointer relative group overflow-hidden ${
                 activeChannel === channel.id 
                   ? "bg-white border-primary shadow-xl ring-4 ring-primary/5" 
                   : "bg-white border-neutral-200 hover:border-primary/40 shadow-sm"
               }`}
             >
                <div className={`w-12 h-12 rounded-2xl ${channel.bg} ${channel.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                   {channel.icon}
                </div>
                
                <div className="space-y-4">
                   <div>
                      <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">{channel.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                         <div className={`w-1.5 h-1.5 rounded-full ${
                           channel.status === 'Active' ? 'bg-green-500' : 
                           channel.status === 'Degraded' ? 'bg-orange-500' : 'bg-neutral-300'
                         }`} />
                         <span className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.1em]">{channel.status}</span>
                      </div>
                   </div>

                   <p className="text-xl font-black text-neutral-900 tracking-tight">{channel.metric}</p>
                   
                   <div className="pt-4 border-t border-neutral-100 flex items-center justify-between opacity-60">
                      <div className="space-y-0.5">
                         <p className="text-[8px] font-black text-neutral-400 uppercase">Uptime</p>
                         <p className="text-[10px] font-bold text-neutral-900">{channel.uptime}</p>
                      </div>
                      <div className="space-y-0.5 text-right">
                         <p className="text-[8px] font-black text-neutral-400 uppercase">Latency</p>
                         <p className="text-[10px] font-bold text-neutral-900">{channel.latency}</p>
                      </div>
                   </div>
                </div>

                <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
             </div>
           ))}
        </div>

        {/* Global Performance Chart Placeholder */}
        <div className="bg-white rounded-[3rem] border border-neutral-200 shadow-sm overflow-hidden p-10 relative group">
           <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                    <BarChart3 className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">Channel Performance Distribution</h3>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase mt-1">Global aggregation across all active endpoints</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <Badge className="bg-green-100 text-green-700 border-0 rounded-lg text-[9px] font-black">99.8% EFFICIENCY</Badge>
              </div>
           </div>

           <div className="h-[250px] w-full bg-neutral-50/50 rounded-[2rem] border border-neutral-100 border-dashed flex items-center justify-center relative overflow-hidden group/chart">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.03),transparent)]" />
              <div className="flex flex-col items-center gap-4 relative z-10 text-neutral-300">
                 <Cloudy className="w-12 h-12 animate-pulse" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">Connecting Data Pipeline...</p>
              </div>
              
              {/* Simulated Chart Bars */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-3 opacity-20 group-hover/chart:opacity-40 transition-opacity duration-1000">
                 {[40, 70, 45, 90, 60, 85, 30, 75].map((h, i) => (
                    <div key={i} className="w-8 bg-primary rounded-t-lg transition-all duration-700" style={{ height: `${h}px` }} />
                 ))}
              </div>
           </div>
        </div>

        {/* Management Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Webhooks & Cloud Hub */}
           <div className="p-10 rounded-[3rem] bg-white border border-neutral-200 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                    <Webhook className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">Incoming Webhooks</h3>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase mt-1">Provision listeners for external triggers</p>
                 </div>
              </div>
              
              <div className="space-y-4">
                 {[
                   { name: "Order-Created Hook", endpoint: "/v1/webhook/orders", active: true },
                   { name: "Support-Ticket Hook", endpoint: "/v1/webhook/tickets", active: false },
                 ].map((hook, i) => (
                   <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-neutral-50 border border-neutral-100 group hover:border-purple-200 transition-all">
                      <div className="flex items-center gap-4">
                         <div className={`w-2 h-2 rounded-full ${hook.active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-neutral-300'}`} />
                         <div>
                            <p className="text-xs font-black text-neutral-800">{hook.name}</p>
                            <p className="text-[9px] text-neutral-400 font-mono mt-0.5 group-hover:text-purple-600 transition-colors uppercase tracking-widest">{hook.endpoint}</p>
                         </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-purple-600 transition-colors" />
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full rounded-xl h-12 border-2 border-dashed border-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-purple-600 hover:border-purple-200 transition-all">
                    + PROVISION NEW LISTENER
                 </Button>
              </div>
           </div>

           {/* Deployment Rules */}
           <div className="p-10 rounded-[3rem] bg-[#000814] text-white space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                 <ShieldCheck className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                 <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Layers className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-sm font-black uppercase tracking-tight">Global Routing Engine</h3>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase mt-1">AI decision persistence across channels</p>
                 </div>
              </div>

              <div className="space-y-4 relative z-10">
                 <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <p className="text-[11px] font-bold text-neutral-300">Force Handoff on High Sentiment Negative</p>
                 </div>
                 <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <p className="text-[11px] font-bold text-neutral-300">Auto-Provision WhatsApp Template on Opt-in</p>
                 </div>
                 <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 border border-primary/40 shadow-[0_0_20px_rgba(0,102,255,0.2)]">
                    <Zap className="w-4 h-4 text-primary" />
                    <p className="text-[11px] font-black text-white uppercase tracking-tight">Synchronize Identity across DM & Voice</p>
                 </div>
              </div>

              <Button className="w-full rounded-xl h-12 bg-white text-black hover:bg-neutral-100 font-black text-[10px] tracking-widest uppercase transition-transform hover:scale-105 active:scale-95">
                 ORCHESTRATION SETTINGS
              </Button>
           </div>
        </div>

      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
