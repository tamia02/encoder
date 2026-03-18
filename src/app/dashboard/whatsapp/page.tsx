"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  Zap, 
  Target, 
  Layout, 
  Users, 
  BarChart3, 
  Plus, 
  Search, 
  Filter, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Eye,
  Settings2,
  Calendar,
  Layers,
  ShoppingBag,
  Languages
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const CAMPAIGNS = [
  { id: "1", name: "Spring Sale 2026", status: "Active", sent: 1240, delivered: 1220, read: 890, cr: "12.4%", date: "Mar 15, 2026" },
  { id: "2", name: "Re-engagement Blast", status: "Scheduled", sent: 0, delivered: 0, read: 0, cr: "0%", date: "Mar 20, 2026" },
  { id: "3", name: "New User Onboarding", status: "Completed", sent: 8540, delivered: 8490, read: 7200, cr: "24.1%", date: "Feb 28, 2026" },
];

const TEMPLATES = [
  { id: "t1", name: "order_confirmation", category: "Utility", language: "English (US)", status: "Approved" },
  { id: "t2", name: "seasonal_promo_v2", category: "Marketing", language: "Spanish (ES)", status: "Approved" },
  { id: "t3", name: "flash_sale_notice", category: "Marketing", language: "English (US)", status: "Pending" },
];

export default function WhatsAppPage() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "templates" | "commerce">("campaigns");

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in slide-in-from-bottom-6 duration-1000 overflow-hidden">
      
      {/* Page Header */}
      <header className="p-10 pb-6 flex items-center justify-between border-b border-neutral-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[2rem] bg-green-500/10 flex items-center justify-center text-green-600 shadow-2xl shadow-green-500/10">
             <MessageSquare className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">WhatsApp Marketing Hub</h2>
            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] mt-1">Direct-to-Customer Campaign Orchestration</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="rounded-2xl h-12 px-8 border-neutral-200 bg-white hover:bg-neutral-50 font-black text-[10px] tracking-widest uppercase shadow-sm">
              <Settings2 className="w-4 h-4 mr-2" />
              API SETTINGS
           </Button>
           <Button className="rounded-2xl h-12 px-10 bg-green-600 hover:bg-green-700 text-white font-black text-[10px] tracking-widest uppercase shadow-xl shadow-green-500/20 transition-all hover:scale-105 active:scale-95">
              <Zap className="w-4 h-4 mr-2" />
              CONNECT NUMBER
           </Button>
        </div>
      </header>

      {/* Internal Navigation */}
      <div className="px-10 border-b border-neutral-100 flex items-center gap-10 bg-neutral-50/30">
        {[
          { id: "campaigns", label: "Campaigns", icon: Target },
          { id: "templates", label: "Message Templates", icon: Layout },
          { id: "commerce", label: "WhatsApp Commerce", icon: ShoppingBag },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 py-6 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
              activeTab === tab.id
                ? "text-green-600"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-green-600" : "text-neutral-300"}`} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 rounded-t-full shadow-lg shadow-green-600/20" />
            )}
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-12">
        {activeTab === "campaigns" && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
            {/* Metrics HUD */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {[
                 { label: "Total Sent", value: "24.5k", icon: <Send className="w-5 h-5" />, color: "text-blue-500" },
                 { label: "Delivery Rate", value: "98.2%", icon: <CheckCircle className="w-5 h-5" />, color: "text-green-500" },
                 { label: "Open Rate", value: "72.1%", icon: <Eye className="w-5 h-5" />, color: "text-orange-500" },
                 { label: "Total Revenue", value: "$12.4k", icon: <ShoppingBag className="w-5 h-5" />, color: "text-purple-500" },
               ].map((metric, idx) => (
                 <div key={idx} className="p-8 rounded-[2.5rem] bg-white border border-neutral-200 shadow-sm space-y-3 group hover:border-primary/20 transition-all duration-500">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{metric.label}</span>
                       <div className={`${metric.color} opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all`}>{metric.icon}</div>
                    </div>
                    <p className="text-3xl font-black text-neutral-900 tracking-tight">{metric.value}</p>
                 </div>
               ))}
            </div>

            {/* Campaign Table */}
            <div className="bg-white rounded-[3rem] border border-neutral-200 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-10">
                  <div className="flex items-center gap-6">
                     <div className="relative group w-80">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-hover:text-primary transition-colors" />
                       <Input 
                          placeholder="Search intelligence database..." 
                          className="h-12 pl-12 pr-6 rounded-2xl border-neutral-200 bg-neutral-50 text-xs font-black uppercase tracking-widest focus:bg-white focus:ring-green-500/20 transition-all"
                       />
                     </div>
                     <Button variant="outline" className="h-12 px-6 rounded-2xl border-neutral-200 text-[10px] font-black uppercase tracking-widest gap-2 bg-white hover:bg-neutral-50">
                        <Filter className="w-4 h-4 text-primary" />
                        FILTER ENGINE
                     </Button>
                  </div>
                  <Button className="h-12 px-10 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-[10px] tracking-widest gap-3 shadow-xl shadow-green-500/10 transition-transform hover:scale-105 active:scale-95 uppercase">
                     <Plus className="w-5 h-5" />
                     INITIATE CAMPAIGN
                  </Button>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-neutral-50/50">
                        <th className="px-10 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Campaign Identity</th>
                        <th className="px-10 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Status Engine</th>
                        <th className="px-10 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Optimization Yield</th>
                        <th className="px-10 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Dispatch Date</th>
                        <th className="px-10 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Control</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-neutral-100">
                     {CAMPAIGNS.map((c) => (
                       <tr key={c.id} className="hover:bg-neutral-50/50 transition-colors group">
                         <td className="px-10 py-8">
                            <p className="text-sm font-black text-neutral-900 group-hover:text-green-600 transition-colors uppercase tracking-tight">{c.name}</p>
                            <p className="text-[9px] text-neutral-400 font-black uppercase tracking-widest mt-1">ID: CMP-{c.id}</p>
                         </td>
                         <td className="px-10 py-8">
                            <span className={`inline-flex items-center px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border-0 shadow-sm ${
                              c.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-100' :
                              c.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                              'bg-neutral-100 text-neutral-500'
                            }`}>
                               {c.status}
                            </span>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-6">
                               <div className="min-w-[120px]">
                                  <div className="flex items-center justify-between mb-2">
                                     <span className="text-[9px] font-black text-neutral-400 uppercase">Read: {c.read}</span>
                                     <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">{c.cr} Yield</span>
                                  </div>
                                  <Progress value={parseInt(c.cr)} className="h-1.5 bg-neutral-100" />
                               </div>
                               <div className="h-10 w-px bg-neutral-100" />
                               <div>
                                  <p className="text-sm font-black text-neutral-900">{c.sent}</p>
                                  <p className="text-[8px] text-neutral-400 uppercase font-black tracking-widest">Total Dispatch</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <p className="text-[10px] font-black text-neutral-500 flex items-center gap-2 uppercase tracking-tight">
                               <Calendar className="w-4 h-4 text-primary" />
                               {c.date}
                            </p>
                         </td>
                         <td className="px-10 py-8 text-right">
                            <Button variant="ghost" size="sm" className="rounded-xl h-10 w-10 p-0 hover:bg-neutral-100 transition-all">
                               <MoreVertical className="w-5 h-5 text-neutral-400" />
                            </Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               
               <div className="p-10 bg-neutral-50 border-t border-neutral-100 text-center">
                  <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em]">Telemetry sync complete: {CAMPAIGNS.length} segments analyzed</p>
               </div>
            </div>
          </div>
        )}

        {activeTab === "templates" && (
          <div className="space-y-10 animate-in fade-in duration-700">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                {TEMPLATES.map((t) => (
                  <div key={t.id} className="bg-white rounded-[3rem] border border-neutral-200 shadow-sm p-10 space-y-8 hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-700 group relative overflow-hidden flex flex-col justify-between">
                     <div className="absolute -top-10 -right-10 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-1000 group-hover:scale-110">
                        <Layout className="w-32 h-32" />
                     </div>
                     <div className="relative z-10 space-y-8">
                       <div className="flex items-center justify-between">
                          <span className={`px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-sm ${
                            t.status === 'Approved' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-orange-50 text-orange-700 border border-orange-100'
                          }`}>
                             {t.status}
                          </span>
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{t.category}</span>
                       </div>
                       <div>
                          <h4 className="text-lg font-black text-neutral-900 group-hover:text-green-600 transition-colors uppercase tracking-tight">{t.name}</h4>
                          <div className="flex items-center gap-3 mt-3">
                             <div className="w-8 h-8 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-primary shadow-inner">
                                <Languages className="w-4 h-4" />
                             </div>
                             <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">{t.language}</span>
                          </div>
                       </div>
                     </div>
                     <div className="relative z-10 pt-8 flex items-center gap-4 border-t border-neutral-50">
                        <Button variant="outline" className="flex-1 rounded-2xl h-12 bg-white border-neutral-200 text-[10px] font-black tracking-widest uppercase hover:bg-neutral-50 shadow-sm">
                           <Eye className="w-4 h-4 mr-2" /> PREVIEW
                        </Button>
                        <Button variant="ghost" className="rounded-2xl h-12 w-12 p-0 border border-neutral-200 hover:bg-neutral-50 transition-all">
                           <MoreVertical className="w-5 h-5 text-neutral-400" />
                        </Button>
                     </div>
                  </div>
                ))}
                
                {/* Create New Template Placeholder */}
                <div className="bg-neutral-50 rounded-[3rem] border-4 border-dashed border-neutral-200 p-12 flex flex-col items-center justify-center text-center space-y-6 hover:bg-white hover:border-green-600/30 transition-all duration-700 cursor-pointer group shadow-inner hover:shadow-xl">
                   <div className="w-16 h-16 rounded-[2rem] bg-white flex items-center justify-center text-neutral-300 group-hover:scale-110 group-hover:bg-green-50 group-hover:text-green-600 transition-all duration-700 shadow-sm border border-neutral-100">
                      <Plus className="w-8 h-8" />
                   </div>
                   <div>
                      <h4 className="text-lg font-black text-neutral-900 uppercase tracking-tight">New Template</h4>
                      <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-2 opacity-60">Submit for Meta neural approval</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === "commerce" && (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
             <div className="w-32 h-32 rounded-[3rem] bg-white border border-neutral-200 flex items-center justify-center text-neutral-200 shadow-xl relative group">
                <ShoppingBag className="w-14 h-14 group-hover:scale-110 group-hover:text-green-600 transition-all duration-700" />
                <span className="absolute -top-3 -right-3 bg-green-600 text-white border-4 border-white text-[10px] px-3 py-1.5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-500/20">META BETA</span>
             </div>
             <div className="max-w-xl space-y-6">
                <h3 className="text-4xl font-black text-neutral-900 uppercase tracking-tight">WhatsApp Commerce Engine</h3>
                <p className="text-sm text-neutral-400 font-bold leading-relaxed uppercase tracking-widest opacity-80">
                   Sync your high-yield product catalog directly to WhatsApp. Enable automated order persistence, neural payment processing, and real-time shipping telemetry within the direct interaction stream.
                </p>
             </div>
             <div className="flex items-center gap-6">
                <Button className="rounded-2xl h-16 px-14 bg-black text-white font-black text-[11px] tracking-widest uppercase shadow-2xl shadow-black/20 transition-all hover:scale-105 active:scale-95">
                   ACTIVATE STOREFRONT ENGINE
                </Button>
                <Button variant="outline" className="rounded-2xl h-16 px-12 border-neutral-200 bg-white font-black text-[11px] tracking-widest uppercase hover:bg-neutral-50 shadow-sm">
                   TELEMETRY DOCUMENTATION
                </Button>
             </div>
          </div>
        )}
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
