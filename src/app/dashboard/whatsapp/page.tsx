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
    <div className="flex flex-col h-full bg-[#F8F9FA] animate-in fade-in duration-500 overflow-hidden">
      
      {/* Page Header */}
      <header className="p-8 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
               <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">WhatsApp Marketing Hub</h2>
          </div>
          <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mt-2 ml-13">Direct-to-Customer Campaign Orchestration</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-11 border-neutral-200 bg-white hover:bg-neutral-50 font-black text-[10px] tracking-widest gap-2">
              <Settings2 className="w-4 h-4" />
              API SETTINGS
           </Button>
           <Button className="rounded-xl h-11 bg-green-600 hover:bg-green-700 text-white font-black text-[10px] tracking-widest gap-2 shadow-lg shadow-green-500/20">
              <Zap className="w-4 h-4" />
              CONNECT NUMBER
           </Button>
        </div>
      </header>

      {/* Internal Navigation */}
      <div className="px-8 border-b border-neutral-200 flex items-center gap-8">
        {[
          { id: "campaigns", label: "Campaigns", icon: Target },
          { id: "templates", label: "Message Templates", icon: Layout },
          { id: "commerce", label: "WhatsApp Commerce", icon: ShoppingBag },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2.5 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
              activeTab === tab.id
                ? "text-green-600"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? "text-green-600" : "text-neutral-400"}`} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {activeTab === "campaigns" && (
          <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
            {/* Metrics HUD */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[
                 { label: "Total Sent", value: "24.5k", icon: <Send className="w-4 h-4" />, color: "text-blue-500" },
                 { label: "Delivery Rate", value: "98.2%", icon: <CheckCircle className="w-4 h-4" />, color: "text-green-500" },
                 { label: "Open Rate", value: "72.1%", icon: <Eye className="w-4 h-4" />, color: "text-orange-500" },
                 { label: "Total Revenue", value: "$12.4k", icon: <ShoppingBag className="w-4 h-4" />, color: "text-purple-500" },
               ].map((metric, idx) => (
                 <div key={idx} className="p-6 rounded-[2rem] bg-white border border-neutral-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{metric.label}</span>
                       <div className={`${metric.color} opacity-60`}>{metric.icon}</div>
                    </div>
                    <p className="text-2xl font-black text-neutral-900 tracking-tight">{metric.value}</p>
                 </div>
               ))}
            </div>

            {/* Campaign Table */}
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                     <div className="relative group w-64">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600" />
                       <Input 
                          placeholder="Search campaigns..." 
                          className="h-9 pl-9 pr-4 rounded-xl border-neutral-200 bg-neutral-50 text-xs focus:bg-white transition-all outline-none"
                       />
                     </div>
                     <Button variant="outline" className="h-9 rounded-xl border-neutral-200 text-[10px] font-black uppercase tracking-widest gap-2">
                        <Filter className="w-3.5 h-3.5" />
                        FILTER
                     </Button>
                  </div>
                  <Button className="h-10 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-[10px] tracking-widest gap-2 shadow-lg shadow-green-500/10 transition-transform hover:scale-105 active:scale-95">
                     <Plus className="w-4 h-4" />
                     NEW CAMPAIGN
                  </Button>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-neutral-50/50">
                        <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Campaign Name</th>
                        <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Performance</th>
                        <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Sent Date</th>
                        <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-neutral-100">
                     {CAMPAIGNS.map((c) => (
                       <tr key={c.id} className="hover:bg-neutral-50 transition-colors group">
                         <td className="px-8 py-5">
                            <p className="text-sm font-black text-neutral-900 group-hover:text-green-600 transition-colors">{c.name}</p>
                            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">ID: CMP-{c.id}</p>
                         </td>
                         <td className="px-8 py-5">
                            <Badge className={`rounded-xl px-2.5 py-1 text-[9px] font-black uppercase tracking-widest border-0 ${
                              c.status === 'Active' ? 'bg-green-100 text-green-700' :
                              c.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                              'bg-neutral-100 text-neutral-500'
                            }`}>
                               {c.status}
                            </Badge>
                         </td>
                         <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                               <div className="min-w-[80px]">
                                  <div className="flex items-center justify-between mb-1.5">
                                     <span className="text-[9px] font-black text-neutral-500">Read: {c.read}</span>
                                     <span className="text-[9px] font-black text-green-600">{c.cr}</span>
                                  </div>
                                  <Progress value={parseInt(c.cr)} className="h-1 text-green-500 bg-neutral-100" />
                               </div>
                               <div className="h-8 w-px bg-neutral-100 mx-1" />
                               <div className="space-y-0.5">
                                  <p className="text-[10px] font-black text-neutral-900">{c.sent}</p>
                                  <p className="text-[8px] text-neutral-400 uppercase font-black">Total Sent</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-5">
                            <p className="text-[11px] font-bold text-neutral-500 flex items-center gap-2">
                               <Calendar className="w-3 h-3" />
                               {c.date}
                            </p>
                         </td>
                         <td className="px-8 py-5 text-right">
                            <Button variant="ghost" size="sm" className="rounded-lg h-8 w-8 p-0 hover:bg-neutral-100">
                               <MoreVertical className="w-4 h-4 text-neutral-400" />
                            </Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               
               <div className="p-8 bg-neutral-50/50 border-t border-neutral-100 text-center">
                  <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em]">Showing {CAMPAIGNS.length} of 124 campaigns</p>
               </div>
            </div>
          </div>
        )}

        {activeTab === "templates" && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEMPLATES.map((t) => (
                  <div key={t.id} className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-sm p-8 space-y-6 hover:shadow-md transition-all group relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Layout className="w-20 h-20" />
                     </div>
                     <div className="flex items-center justify-between">
                        <Badge className={`rounded-xl px-2.5 py-1 text-[9px] font-black uppercase tracking-widest border-0 ${
                          t.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                           {t.status}
                        </Badge>
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{t.category}</span>
                     </div>
                     <div>
                        <h4 className="text-sm font-black text-neutral-900 group-hover:text-green-600 transition-colors uppercase tracking-tight">{t.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                           <Languages className="w-3 h-3 text-neutral-400" />
                           <span className="text-[10px] text-neutral-500 font-bold uppercase">{t.language}</span>
                        </div>
                     </div>
                     <div className="pt-4 flex items-center gap-3">
                        <Button variant="outline" className="flex-1 rounded-xl h-10 border-neutral-200 text-[10px] font-black tracking-widest gap-2">
                           <Eye className="w-3.5 h-3.5" /> PREVIEW
                        </Button>
                        <Button variant="ghost" className="rounded-xl h-10 w-10 p-0 border border-neutral-200">
                           <MoreVertical className="w-4 h-4 text-neutral-400" />
                        </Button>
                     </div>
                  </div>
                ))}
                
                {/* Create New Template Placeholder */}
                <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-neutral-200 p-8 flex flex-col items-center justify-center text-center space-y-4 hover:bg-neutral-50/50 transition-all cursor-pointer group">
                   <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-300 group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight">New Template</h4>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase mt-1">Submit for Meta approval</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === "commerce" && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-700">
             <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-neutral-200 flex items-center justify-center text-neutral-200 shadow-sm relative group">
                <ShoppingBag className="w-12 h-12 group-hover:scale-110 transition-transform duration-500" />
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white border-0 text-[10px] px-2 py-0.5 font-black uppercase tracking-widest">BETA</Badge>
             </div>
             <div className="max-w-md space-y-4">
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">WhatsApp Commerce</h3>
                <p className="text-sm text-neutral-500 font-bold leading-relaxed">
                   Sync your product catalog directly to WhatsApp. Enable automated order placement, payment collection, and shipping updates within the chat.
                </p>
             </div>
             <div className="flex items-center gap-4">
                <Button className="rounded-xl h-12 px-10 bg-black text-white font-black text-[11px] tracking-widest uppercase shadow-xl shadow-black/10">
                   ACTIVATE STOREFRONT
                </Button>
                <Button variant="outline" className="rounded-xl h-12 px-10 border-neutral-200 font-black text-[11px] tracking-widest uppercase">
                   VIEW DOCS
                </Button>
             </div>
          </div>
        )}
      </main>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}</style>
    </div>
  );
}
