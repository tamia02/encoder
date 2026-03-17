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
  { id: "hubspot", name: "HubSpot", category: "CRM", icon: <Users className="text-orange-500" />, status: "Connected", desc: "Sync leads and conversation outcomes to HubSpot CRM." },
  { id: "make", name: "Make.com", category: "Automation", icon: <Zap className="text-blue-500" />, status: "Active", desc: "Build complex workflows and connect 1000+ apps via Make." },
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
    <div className="flex flex-col h-full bg-[#FAFAFA] animate-in fade-in duration-500 overflow-hidden font-sans">
      
      {/* Marketplace Header */}
      <header className="p-10 pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[1.5rem] bg-black flex items-center justify-center text-white shadow-xl shadow-black/10">
               <Zap className="w-6 h-6" />
            </div>
            <div>
               <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">Integrations Marketplace</h2>
               <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em] mt-1 ml-0.5">Connect your business brain to the world</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-12 px-6 border-neutral-200 bg-white hover:bg-neutral-50 font-black text-[10px] tracking-widest gap-2">
              <Webhook className="w-4 h-4" />
              WEBHOOK LOGS
           </Button>
           <Button className="rounded-xl h-12 px-8 bg-black text-white font-black text-[10px] tracking-widest shadow-2xl shadow-black/20 transition-all hover:scale-105 active:scale-95">
              BROWSE PARTNERS
           </Button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="px-10 py-2 border-b border-neutral-200 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-20">
         <div className="flex items-center gap-8">
            {["all", "connected", "browse"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-6 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                  activeTab === tab ? "text-black" : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {tab} Integrations
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full" />
                )}
              </button>
            ))}
         </div>
         <div className="flex items-center gap-4">
            <div className="relative group w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600" />
               <Input 
                  placeholder="Search Marketplace..." 
                  className="h-10 pl-10 rounded-xl border-neutral-200 bg-neutral-50 text-xs focus:bg-white transition-all ring-0 focus-visible:ring-0"
               />
            </div>
            <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-neutral-200"><Filter className="w-4 h-4 text-neutral-400" /></Button>
         </div>
      </div>

      <main className="flex-1 overflow-y-auto p-10 custom-scrollbar pb-24">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INTEGRATIONS.map((tool) => (
              <div 
                key={tool.id} 
                className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-sm p-10 space-y-8 hover:shadow-xl hover:border-black/5 transition-all group cursor-pointer relative overflow-hidden"
                onClick={() => setSelectedIntegration(tool)}
              >
                 <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    {tool.icon}
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center border border-neutral-100 group-hover:scale-110 transition-transform duration-500">
                       {tool.icon}
                    </div>
                    <Badge className={`rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-widest border-0 ${
                      tool.status === 'Connected' || tool.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                       {tool.status}
                    </Badge>
                 </div>
                 
                 <div className="space-y-2">
                    <h3 className="text-xl font-black text-neutral-900 group-hover:text-black transition-colors uppercase tracking-tight">{tool.name}</h3>
                    <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest">{tool.category}</p>
                 </div>

                 <p className="text-xs text-neutral-400 font-medium leading-relaxed min-h-[40px]">
                    {tool.desc}
                 </p>

                 <div className="flex items-center justify-between pt-6 border-t border-neutral-50">
                    <Button variant="ghost" className="rounded-xl h-10 px-0 text-[10px] font-black text-neutral-400 hover:text-black uppercase tracking-widest flex items-center gap-2 group/btn">
                       LEARN MORE <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                    <Button className={`rounded-xl h-10 px-6 font-black text-[10px] tracking-widest uppercase transition-all ${
                      tool.status === 'Connected' || tool.status === 'Active' ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                    }`}>
                       {tool.status === 'Connected' || tool.status === 'Active' ? 'SETTINGS' : 'CONNECT'}
                    </Button>
                 </div>
              </div>
            ))}
         </div>
      </main>

      {/* Integration Setup Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setSelectedIntegration(null)}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
              >
                 <X className="w-5 h-5" />
              </button>

              <div className="p-12 space-y-10">
                 <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-3xl bg-neutral-50 border border-neutral-200 flex items-center justify-center scale-110">
                       {selectedIntegration.icon}
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">Connect {selectedIntegration.name}</h3>
                       <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mt-2">{selectedIntegration.category} Native Sync</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Connect Application Account</label>
                       <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 border-dashed flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <ShieldCheck className="w-5 h-5 text-green-500" />
                             <p className="text-xs font-bold text-neutral-900">OAuth 2.0 Secure Sync active</p>
                          </div>
                          <Button variant="outline" className="rounded-lg h-9 bg-white font-black text-[9px] uppercase tracking-widest">AUTHENTICATE</Button>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Client API Key / Instance Token</label>
                       <div className="relative">
                          <Input 
                            placeholder="Enter Hub-xxxxxxxx-xxxx" 
                            className="h-14 rounded-2xl bg-white border-neutral-200 text-sm font-bold pl-6 ring-0 focus-visible:ring-2 focus-visible:ring-black/5"
                          />
                          <Settings className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                       </div>
                       <p className="text-[10px] text-neutral-400 font-bold italic">You can find this in your {selectedIntegration.name} Developer Settings under API Management.</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 pt-6">
                    <Button 
                      onClick={handleConnect}
                      disabled={isConnecting}
                      className="flex-1 h-14 rounded-2xl bg-black text-white hover:bg-neutral-800 font-black text-xs tracking-[0.2em] transition-all relative overflow-hidden active:scale-[0.98]"
                    >
                       {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : "PERSIST CONNECTION"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 h-14 rounded-2xl border-neutral-200 font-black text-xs tracking-[0.2em] uppercase"
                      onClick={() => setSelectedIntegration(null)}
                    >
                       DISCARD
                    </Button>
                 </div>

                 <div className="flex gap-4 p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <ExternalLink className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <p className="text-[10px] text-blue-800 font-bold leading-relaxed">
                       Note: Integrating {selectedIntegration.name} will allow the AI agent to read and write to your {selectedIntegration.category} data based on the instructions provided in the Agent Editor.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #EAEAEA;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
