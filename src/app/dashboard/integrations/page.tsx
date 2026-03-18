"use client";

import { useState } from "react";
import { 
  Zap, 
  Users, 
  ShoppingBag, 
  Layers, 
  MessageSquare, 
  Mail, 
  Database, 
  Webhook, 
  Globe, 
  CreditCard, 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  ChevronRight, 
  Settings, 
  ShieldCheck, 
  ExternalLink,
  Loader2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const INTEGRATIONS = [
  { id: "hubspot", name: "HubSpot", category: "CRM", icon: <Users className="text-orange-500" />, status: "Not Connected", desc: "Sync leads and conversation outcomes to HubSpot CRM." },
  { id: "make", name: "Make.com", category: "Automation", icon: <Zap className="text-blue-500" />, status: "Not Connected", desc: "Build complex workflows and connect 1000+ apps via Make." },
  { id: "stripe", name: "Stripe", category: "Payments", icon: <CreditCard className="text-[#635BFF]" />, status: "Not Connected", desc: "Accept payments and manage subscriptions inside WhatsApp." },
  { id: "cal", name: "Cal.com", category: "Scheduling", icon: <Calendar className="text-neutral-900" />, status: "Not Connected", desc: "Allow AI agents to book meetings directly on your calendar." },
  { id: "slack", name: "Slack", category: "Communication", icon: <MessageSquare className="text-[#4A154B]" />, status: "Not Connected", desc: "Send real-time alerts for qualified leads to your Slack channels." },
  { id: "airtable", name: "Airtable", category: "Database", icon: <Database className="text-blue-600" />, status: "Not Connected", desc: "Append conversation logs and lead data to your Airtable bases." },
];

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "connected" | "browse">("all");
  const [selectedIntegration, setSelectedIntegration] = useState<any | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
       setIsConnecting(false);
       // Mock success logic
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-1000 overflow-hidden font-sans">
      
      {/* Marketplace Header */}
      <header className="p-12 pb-8 flex items-center justify-between border-b border-neutral-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[2rem] bg-black flex items-center justify-center text-white shadow-2xl shadow-black/10 transition-transform hover:scale-110 duration-700">
             <Zap className="w-8 h-8" />
          </div>
          <div>
             <h2 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter">Neural Integrations</h2>
             <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] mt-2">Connect your business brain to the global neural stream</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="rounded-[1.5rem] h-14 px-10 border-neutral-200 bg-white hover:bg-neutral-50 font-black text-[11px] tracking-widest uppercase shadow-sm">
              <Webhook className="w-5 h-5 mr-3" />
              WEBHOOK LOGS
           </Button>
           <Button className="rounded-[1.5rem] h-14 px-12 bg-black text-white hover:bg-neutral-900 font-black text-[11px] tracking-widest uppercase shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
              BROWSE PARTNERS
           </Button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="px-12 py-2 border-b border-neutral-100 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-20">
         <div className="flex items-center gap-10">
            {["all", "connected", "browse"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-8 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                  activeTab === tab ? "text-black" : "text-neutral-300 hover:text-neutral-500"
                }`}
              >
                {tab} Connections
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary rounded-t-full shadow-[0_0_10px_rgba(0,102,255,0.4)]" />
                )}
              </button>
            ))}
         </div>
         <div className="flex items-center gap-6">
            <div className="relative group w-80">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-hover:text-primary transition-colors" />
               <Input 
                  placeholder="SEARCH MARKETPLACE..." 
                  className="h-12 pl-12 rounded-2xl border-neutral-100 bg-neutral-50/50 text-[10px] font-black tracking-widest focus:bg-white transition-all ring-0 focus-visible:ring-2 focus-visible:ring-primary/10 border-none shadow-inner"
               />
            </div>
            <Button variant="outline" className="h-12 w-12 p-0 rounded-2xl border-neutral-100 bg-white hover:bg-neutral-50 shadow-sm"><Filter className="w-5 h-5 text-neutral-400" /></Button>
         </div>
      </div>

      <main className="flex-1 overflow-y-auto p-12 custom-scrollbar pb-32">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {INTEGRATIONS.map((tool) => (
              <div 
                key={tool.id} 
                className="bg-white rounded-[4rem] border border-neutral-200 shadow-sm p-12 space-y-10 hover:shadow-2xl hover:border-primary/20 transition-all duration-700 group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[420px]"
                onClick={() => setSelectedIntegration(tool)}
              >
                 <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000 group-hover:scale-125">
                    {tool.icon}
                 </div>
                 
                 <div className="space-y-10">
                    <div className="flex items-center justify-between">
                       <div className="w-16 h-16 rounded-[1.5rem] bg-neutral-50/50 flex items-center justify-center border border-neutral-100 group-hover:scale-110 group-hover:bg-white transition-all duration-700 shadow-inner group-hover:shadow-xl">
                          {tool.icon}
                       </div>
                       <Badge className={`rounded-[1rem] px-5 py-2 text-[9px] font-black uppercase tracking-[0.2em] border-none shadow-sm ${
                         tool.status === 'Connected' || tool.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-neutral-50 text-neutral-400'
                       }`}>
                          {tool.status}
                       </Badge>
                    </div>
                    
                    <div className="space-y-3">
                       <h3 className="text-2xl font-black text-neutral-900 group-hover:text-primary transition-colors uppercase tracking-tight">{tool.name}</h3>
                       <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em]">{tool.category} NATIVE</p>
                    </div>

                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest leading-relaxed opacity-80 min-h-[48px]">
                       {tool.desc}
                    </p>
                 </div>

                 <div className="flex flex-col gap-4 pt-10 border-t border-neutral-50 mt-auto">
                    <Button className={`rounded-[1.5rem] h-16 w-full font-black text-[11px] tracking-[0.2em] uppercase transition-all shadow-xl hover:scale-[1.02] active:scale-95 ${
                      tool.status === 'Connected' || tool.status === 'Active' ? 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200 shadow-none' : 'bg-black text-white hover:bg-neutral-900 shadow-black/20'
                    }`}>
                       {tool.status === 'Connected' || tool.status === 'Active' ? 'CONFIGURE INSTANCE' : 'CONNECT TO STREAM'}
                    </Button>
                 </div>
              </div>
            ))}
         </div>
      </main>

      {/* Integration Setup Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl animate-in fade-in duration-500">
           <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-500 p-2">
              <button 
                onClick={() => setSelectedIntegration(null)}
                className="absolute top-10 right-10 w-12 h-12 rounded-[1.2rem] bg-neutral-50 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-white hover:shadow-xl transition-all duration-500 z-10"
              >
                 <X className="w-6 h-6" />
              </button>

              <div className="p-16 space-y-12">
                 <div className="flex items-center gap-10">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-neutral-50/50 border border-neutral-100 flex items-center justify-center scale-110 shadow-inner">
                       {selectedIntegration.icon}
                    </div>
                    <div>
                       <h3 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter">Sync {selectedIntegration.name}</h3>
                       <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] mt-3">Initializing {selectedIntegration.category} Bridge Connection</p>
                    </div>
                 </div>

                 <div className="space-y-10">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] ml-2">AUTHENTICATION PROTOCOL</label>
                       <div className="p-8 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 border-dashed flex items-center justify-between group hover:bg-white hover:border-primary/20 transition-all duration-500">
                          <div className="flex items-center gap-6">
                             <div className="w-12 h-12 rounded-[1rem] bg-green-50 flex items-center justify-center text-green-500">
                                <ShieldCheck className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">OAuth 2.0 Secure Sync</p>
                                <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mt-1">End-to-End Encryption Active</p>
                             </div>
                          </div>
                          <Button variant="outline" className="rounded-xl h-11 px-8 bg-white font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">AUTHENTICATE</Button>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] ml-2">NEURAL ACCESS TOKEN</label>
                       <div className="relative">
                          <Input 
                            placeholder="HUB-XXXXXXXX-XXXX-XXXX" 
                            className="h-20 rounded-[2rem] bg-neutral-50 border-none text-sm font-black tracking-widest pl-8 placeholder:text-neutral-300 ring-0 focus-visible:ring-4 focus-visible:ring-primary/5 focus:bg-white transition-all duration-500 shadow-inner"
                          />
                          <Settings className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-200 group-hover:text-primary" />
                       </div>
                       <p className="text-[9px] text-neutral-400 font-black uppercase tracking-widest ml-2 italic opacity-60 flex items-center gap-2">
                          <Zap className="w-3 h-3 text-primary" />
                          Located in your {selectedIntegration.name} Developer Console
                       </p>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 pt-10">
                    <Button 
                      onClick={handleConnect}
                      disabled={isConnecting}
                      className="flex-[2] h-20 rounded-[2.5rem] bg-black text-white hover:bg-neutral-900 font-black text-[11px] tracking-[0.3em] transition-all relative overflow-hidden shadow-2xl shadow-black/20 active:scale-[0.95]"
                    >
                       {isConnecting ? <Loader2 className="w-6 h-6 animate-spin" /> : "PERSIST CONNECTION"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 h-20 rounded-[2.5rem] border-neutral-200 font-black text-[11px] tracking-[0.3em] uppercase hover:bg-neutral-50 transition-all active:scale-[0.95]"
                      onClick={() => setSelectedIntegration(null)}
                    >
                       DISCARD
                    </Button>
                 </div>

                 <div className="flex gap-6 p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 shadow-inner">
                    <ExternalLink className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-[10px] text-primary font-black leading-relaxed uppercase tracking-widest opacity-80">
                       Note: PERSISTING CONNECTION ENABLES THE AI ORCHESTRATOR TO INTERACT WITH YOUR {selectedIntegration.category} CLUSTER IN REAL-TIME BASED ON NEURAL INSTRUCTIONS.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}

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
