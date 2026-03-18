"use client";

import { useState, useTransition } from "react";
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Lock, 
  CreditCard,
  Building2,
  Save,
  ChevronRight,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserProfile } from "./actions";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@agency.com",
    organization: "Encoder AI Agency",
    timezone: "UTC-5 (Eastern Time)"
  });

  const tabs = [
    { id: "profile", label: "Account Profile", icon: <User className="w-4 h-4" /> },
    { id: "security", label: "Security & Access", icon: <Lock className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "billing", label: "Usage & Billing", icon: <CreditCard className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    setSaveStatus("idle");
    startTransition(async () => {
      const result = await updateUserProfile({
        name: formData.name,
        email: formData.email
      });
      if (result.success) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 px-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-neutral-100 pb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-neutral-900 uppercase mb-2">Account Engine Configuration</h2>
          <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] flex items-center gap-3">
             <Shield className="w-4 h-4 text-primary animate-pulse" />
             Personalized Security & Global Agency Parameter Management
          </p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isPending}
          className="bg-black hover:bg-neutral-900 text-white rounded-[1.5rem] font-black text-[11px] tracking-widest h-14 px-12 shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95 uppercase min-w-[240px]"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
          ) : saveStatus === "success" ? (
            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400" />
          ) : (
            <Save className="w-5 h-5 mr-3" />
          )}
          {isPending ? "Syncing..." : saveStatus === "success" ? "Synchronized" : "Synchronize Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
        {/* Sidebar Tabs */}
        <div className="space-y-3">
          <p className="text-[9px] font-black text-neutral-300 uppercase tracking-[0.3em] mb-6 ml-4">System Nodes</p>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-8 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative group overflow-hidden ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-2xl ring-1 ring-neutral-200"
                  : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`p-2 rounded-xl transition-colors ${activeTab === tab.id ? "bg-primary/10 text-primary" : "bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200"}`}>
                   {tab.icon}
                </div>
                {tab.label}
              </div>
              {activeTab === tab.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-r-full shadow-[0_0_10px_rgba(0,102,255,0.4)]" />
              )}
              <ChevronRight className={`w-4 h-4 transition-all duration-500 ${activeTab === tab.id ? "text-primary opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="p-16 rounded-[4rem] bg-white border border-neutral-200 shadow-sm space-y-12 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-1000" />
            
            <div className="pb-10 border-b border-neutral-50 flex items-center gap-8 relative z-10">
              <div className="w-20 h-20 rounded-[2rem] bg-neutral-50 border border-neutral-100 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform duration-700">
                {tabs.find(t => t.id === activeTab)?.icon}
              </div>
              <div>
                <h3 className="text-3xl font-black text-neutral-900 uppercase tracking-tighter">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h3>
                <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em] mt-2">Core Identity & Access Matrix</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Full Identity</label>
                <div className="relative group">
                   <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                   <Input 
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     placeholder="John Doe" 
                     className="h-16 bg-neutral-50/50 border-none rounded-[1.5rem] focus:bg-white transition-all duration-500 font-black text-xs tracking-widest px-14 ring-0 focus-visible:ring-4 focus-visible:ring-primary/5 shadow-inner"
                   />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Neural Email Stream</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                  <Input 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@agency.com" 
                    className="h-16 bg-neutral-50/50 border-none rounded-[1.5rem] focus:bg-white transition-all duration-500 font-black text-xs tracking-widest px-14 ring-0 focus-visible:ring-4 focus-visible:ring-primary/5 shadow-inner"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Entity / Organization</label>
                <div className="relative group">
                  <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                  <Input 
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Encoder AI Agency" 
                    className="h-16 bg-neutral-50/50 border-none rounded-[1.5rem] focus:bg-white transition-all duration-500 font-black text-xs tracking-widest px-14 ring-0 focus-visible:ring-4 focus-visible:ring-primary/5 shadow-inner"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Global Temporal Zone</label>
                <Input 
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  placeholder="UTC-5 (Eastern Time)" 
                  className="h-16 bg-neutral-50/50 border-none rounded-[1.5rem] focus:bg-white transition-all duration-500 font-black text-xs tracking-widest px-8 ring-0 focus-visible:ring-4 focus-visible:ring-primary/5 shadow-inner"
                />
              </div>
            </div>

            <div className="mt-12 p-10 rounded-[3rem] bg-neutral-900 text-white flex items-start gap-8 shadow-2xl relative overflow-hidden group/alert">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/alert:opacity-10 transition-all duration-1000 group-hover/alert:scale-110">
                  <Shield className="w-32 h-32" />
               </div>
               <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-primary shadow-2xl shadow-primary/20 border border-white/5 relative z-10">
                  <Shield className="w-8 h-8 animate-pulse" />
               </div>
               <div className="relative z-10 space-y-4">
                  <h4 className="font-black text-xl uppercase tracking-tighter">Neural Guard Protection Enabled</h4>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-relaxed max-w-2xl opacity-80">
                    Your cluster identity is currently encrypted with enterprise-grade RSA-4096. Multi-Factor Authentication (MFA) is recommended for high-volume agency accounts.
                  </p>
                  <Button variant="outline" className="rounded-xl h-10 px-8 border-white/10 bg-white/5 text-white hover:bg-white hover:text-black font-black text-[9px] tracking-[0.2em] uppercase transition-all duration-500">
                    Visit Security Hub
                  </Button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
