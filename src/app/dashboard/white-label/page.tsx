"use client";

import { useState, useTransition } from "react";
import { 
  ShieldCheck, 
  Palette, 
  Globe, 
  Layout, 
  Save, 
  Upload, 
  ExternalLink,
  Info,
  Building2,
  Lock,
  Zap,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBranding } from "./actions";

export default function WhiteLabelPage() {
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    agencyName: "Encoder Digital",
    domain: "app.encoder.ai",
    logoUrl: "",
    primaryColor: "#2563eb"
  });

  const handleSync = () => {
    setSaveStatus("idle");
    startTransition(async () => {
      const result = await updateBranding(formData);
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
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2.5rem] bg-black flex items-center justify-center text-white shadow-2xl shadow-black/10 transition-transform hover:scale-110 duration-700">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-neutral-900 uppercase mb-2">Agency Essence & Branding</h2>
            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <Globe className="w-4 h-4 text-primary animate-pulse" />
              Project your corporate identity across all autonomous neural portals
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSync}
          disabled={isPending}
          className="bg-black hover:bg-neutral-900 text-white rounded-[1.5rem] font-black text-[11px] tracking-widest h-14 px-12 shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95 uppercase min-w-[280px]"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
          ) : saveStatus === "success" ? (
            <CheckCircle2 className="w-5 h-5 mr-3 text-green-400" />
          ) : (
            <Save className="w-5 h-5 mr-3" />
          )}
          {isPending ? "Syncing..." : saveStatus === "success" ? "Branding Synchronized" : "Synchronize Brand Engine"}
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">
        <div className="xl:col-span-2 space-y-12">
          {/* Identity Section */}
          <div className="p-16 rounded-[4.5rem] bg-white border border-neutral-200 shadow-sm space-y-12 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-1000" />
            
            <div className="flex items-center justify-between pb-10 border-b border-neutral-50 relative z-10">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-[1.5rem] bg-neutral-50 flex items-center justify-center text-primary shadow-inner">
                     <Layout className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-2xl text-neutral-900 uppercase tracking-tight">Cortex Visual Identity</h3>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Corporate Designation</label>
                <div className="relative group">
                   <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                   <Input 
                     value={formData.agencyName}
                     onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                     className="h-16 bg-neutral-50/50 border-none rounded-[1.5rem] focus:bg-white transition-all duration-500 font-black text-xs tracking-widest px-14 ring-0 focus-visible:ring-4 focus-visible:ring-primary/5 shadow-inner"
                   />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Neural Portal FQDN</label>
                <div className="relative group">
                   <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                   <Input 
                     value={formData.domain}
                     onChange={(e) => setFormData({...formData, domain: e.target.value})}
                     className="h-16 bg-neutral-50/50 border-none rounded-[1.5rem] focus:bg-white transition-all duration-500 font-black text-xs tracking-widest px-14 ring-0 focus-visible:ring-4 focus-visible:ring-primary/5 shadow-inner"
                   />
                   <ExternalLink className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary cursor-pointer hover:scale-125 transition-all" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4 text-center block">Global Logo Asset</label>
                <div className="aspect-[4/3] rounded-[3rem] border-4 border-dashed border-neutral-100 bg-neutral-50/50 flex flex-col items-center justify-center gap-6 hover:border-primary/20 hover:bg-white transition-all duration-700 cursor-pointer group shadow-inner relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   {formData.logoUrl ? (
                     <img src={formData.logoUrl} className="w-full h-full object-contain p-10 relative z-10" />
                   ) : (
                     <div className="text-center space-y-6 relative z-10">
                       <div className="w-20 h-20 rounded-[2rem] bg-white border border-neutral-100 flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-700 text-neutral-200 group-hover:text-primary">
                          <Upload className="w-8 h-8" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-neutral-900 uppercase tracking-[0.3em]">SELECT ASSET</p>
                          <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mt-2">OPTIMIZED: SVG / WEBP</p>
                       </div>
                     </div>
                   )}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-4">Neural Chromatic engine</label>
                <div className="p-10 rounded-[3rem] bg-neutral-50/50 border border-neutral-100 space-y-8 shadow-inner hover:bg-white transition-all duration-700">
                   <div className="flex items-center justify-between">
                     <span className="text-[11px] font-black text-neutral-900 uppercase tracking-widest">Master Accent</span>
                     <div 
                        className="w-16 h-16 rounded-[1.5rem] border-[6px] border-white shadow-2xl transition-transform hover:scale-110 duration-700" 
                        style={{ backgroundColor: formData.primaryColor, boxShadow: `0 20px 40px ${formData.primaryColor}33` }} 
                     />
                   </div>
                   <div className="relative">
                      <Input 
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                        className="h-16 w-full bg-transparent border-none p-0 cursor-pointer rounded-2xl overflow-hidden"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 rounded-full" />
                   </div>
                   <p className="text-[11px] text-neutral-400 font-bold leading-relaxed uppercase tracking-wider opacity-80 pl-2 border-l-2 border-primary/20 italic">
                     This color initializes the entire UI theme token system for all client interactions.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure Alerts */}
          <div className="p-12 rounded-[4rem] bg-black text-white flex items-start gap-10 shadow-3xl relative overflow-hidden group/security">
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] -mr-32 -mt-32 group-hover/security:bg-primary/20 transition-all duration-1000 group-hover/security:scale-110" />
             <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center border border-white/10 text-primary shadow-2xl shadow-primary/20 relative z-10 group-hover/security:scale-110 transition-transform duration-700">
                <Lock className="w-10 h-10 animate-pulse" />
             </div>
             <div className="relative z-10 space-y-4">
                <h4 className="font-black text-3xl text-white uppercase tracking-tighter">Automatic SSL Encryption</h4>
                <p className="text-[11px] text-neutral-400 font-bold leading-relaxed max-w-2xl uppercase tracking-widest opacity-80">
                   Once your CNAME is broadcast to the global neural stream, our infrastructure automatically provisions an RSA-4096 SSL certificate. All neural communication is end-to-end encrypted.
                </p>
             </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-8">
           <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 ml-8">Real-time Portal Telemetry</label>
           <div className="sticky top-28 p-4 rounded-[4.5rem] bg-neutral-100 border border-neutral-200 shadow-2xl overflow-hidden aspect-[4/5.5] scale-[1.02] shadow-primary/5 group/preview">
              <div className="h-full w-full rounded-[3.8rem] bg-white border border-neutral-200 overflow-hidden flex flex-col shadow-inner relative">
                 <div className="h-16 border-b border-neutral-50 bg-neutral-50/50 flex items-center px-10 justify-between relative z-10">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full bg-red-500/40" />
                       <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                       <div className="w-3 h-3 rounded-full bg-green-500/40" />
                    </div>
                    <div className="text-[9px] font-black text-neutral-300 uppercase tracking-[0.3em] group-hover/preview:text-primary transition-colors">{formData.domain}</div>
                 </div>

                 <div className="flex-1 p-12 space-y-12 flex flex-col items-center justify-center text-center relative z-10">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-neutral-50 flex items-center justify-center mb-6 border border-neutral-100 shadow-sm transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:bg-white group-hover/preview:rotate-3">
                       {formData.logoUrl ? <img src={formData.logoUrl} className="w-14 h-14 object-contain" /> : <Building2 className="w-12 h-12 text-neutral-300" />}
                    </div>
                    <div>
                       <h5 className="font-black text-3xl text-neutral-900 tracking-tighter uppercase mb-4">{formData.agencyName}</h5>
                       <div className="space-y-4 w-full max-w-[240px] opacity-40">
                          <div className="h-2 rounded-full bg-neutral-100 w-full" />
                          <div className="h-2 rounded-full bg-neutral-100 w-2/3 mx-auto" />
                       </div>
                    </div>
                    
                    <div className="w-full space-y-4 pt-4">
                       <div 
                         className="w-full h-16 rounded-[1.8rem] flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                         style={{ backgroundColor: formData.primaryColor, color: '#fff', boxShadow: `0 15px 40px ${formData.primaryColor}55` }}
                       >
                          ENTER PORTAL
                       </div>
                       <div className="flex justify-between gap-6 px-2">
                          <div className="flex-1 h-3 rounded-full bg-neutral-50 border border-neutral-100" />
                          <div className="flex-1 h-3 rounded-full bg-neutral-50 border border-neutral-100" />
                       </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                       <Zap className="w-4 h-4 text-primary opacity-20" />
                       <span className="text-[8px] font-black text-neutral-200 uppercase tracking-[0.4em]">Powered by Encoder</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
);
}
