"use client";

import { useState, useTransition } from "react";
import { 
  Building2, 
  Globe, 
  Palette, 
  Save, 
  ChevronLeft,
  Upload,
  Layout,
  ExternalLink,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { updateWorkspaceBranding } from "../../actions";
import { useParams, useRouter } from "next/navigation";

export default function WorkspaceSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [formData, setFormData] = useState({
    name: "Default Agency",
    domain: "agency.encoder.ai",
    logoUrl: "",
    primaryColor: "#3b82f6"
  });

  const handleSave = async () => {
    startTransition(async () => {
      const result = await updateWorkspaceBranding(params.id as string, formData);
      if (result.success) {
        alert("Branding updated successfully!");
        router.refresh();
      } else {
        alert("Failed to update branding.");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/workspaces">
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-white/5">
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white">White-Label Settings</h2>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" />
              Configure branding for {formData.name}
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isPending}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-2xl px-8 h-12 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          <Save className="w-5 h-5" />
          {isPending ? "Syncing..." : "Update Engine"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity Section */}
          <div className="p-8 rounded-[2rem] bg-neutral-900/50 border border-white/5 space-y-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 pb-6 border-b border-white/5">
               <Layout className="w-5 h-5 text-primary" />
               <h3 className="font-bold text-lg text-white">Visual Identity</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Workspace Name</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-12 bg-neutral-950/50 border-white/5 rounded-2xl focus:ring-primary/20 focus:border-primary/30 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Custom Domain</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    value={formData.domain}
                    onChange={(e) => setFormData({...formData, domain: e.target.value})}
                    className="pl-12 h-12 bg-neutral-950/50 border-white/5 rounded-2xl focus:ring-primary/20 focus:border-primary/30 transition-all"
                  />
                  <ExternalLink className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 text-center block">Agency Logo</label>
                <div className="aspect-[3/2] rounded-[2rem] border-2 border-dashed border-white/5 bg-neutral-950/50 flex flex-col items-center justify-center gap-4 hover:border-primary/30 transition-all cursor-pointer group">
                   {formData.logoUrl ? (
                     <img src={formData.logoUrl} className="w-full h-full object-contain p-4" />
                   ) : (
                     <div className="text-center space-y-2">
                       <Upload className="w-8 h-8 text-muted-foreground mx-auto group-hover:text-primary transition-colors" />
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">SVG, PNG, JPG</p>
                     </div>
                   )}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Brand Palette</label>
                <div className="p-6 rounded-[2rem] bg-neutral-950/50 border border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-white">Primary Theme</span>
                     <div className="w-10 h-10 rounded-xl bg-primary border-4 border-white/10 shadow-lg" />
                   </div>
                   <Input 
                     type="color"
                     value={formData.primaryColor}
                     onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                     className="h-10 w-full bg-transparent border-none p-0 cursor-pointer"
                   />
                   <p className="text-[10px] text-muted-foreground leading-relaxed">
                     This color will be used for buttons, links, and active states throughout your client's dashboard.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 flex items-start gap-5">
             <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                <Info className="w-5 h-5" />
             </div>
             <div>
                <h4 className="font-bold text-white mb-2">Agency Tip</h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                   White-labeling doesn't just change the look. Once a custom domain is mapped, all system emails and invites sent from this workspace will use your agency's branding.
                </p>
             </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Live Preview</label>
           <div className="sticky top-24 p-1.5 rounded-[2.5rem] bg-neutral-950 border border-white/10 shadow-2xl overflow-hidden aspect-[4/5] scale-[1.02]">
              <div className="h-full w-full rounded-[2.2rem] bg-neutral-900 border border-white/5 overflow-hidden flex flex-col">
                 <div className="h-12 border-b border-white/5 bg-neutral-900/50 flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-400/20" />
                       <div className="w-3 h-3 rounded-full bg-yellow-400/20" />
                       <div className="w-3 h-3 rounded-full bg-green-400/20" />
                    </div>
                    <div className="text-[8px] font-mono text-muted-foreground">app.{formData.domain}</div>
                 </div>

                 <div className="flex-1 p-6 space-y-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                       {formData.logoUrl ? <img src={formData.logoUrl} className="w-10 h-10 object-contain" /> : <Building2 className="w-8 h-8 text-muted-foreground" />}
                    </div>
                    <h5 className="font-black text-xl text-white tracking-tight">{formData.name}</h5>
                    <div className="space-y-2 w-full max-w-[180px]">
                       <div className="h-2 rounded-full bg-white/5 w-full" />
                       <div className="h-2 rounded-full bg-white/5 w-3/4 mx-auto" />
                    </div>
                    <div 
                      className="w-full h-10 rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest shadow-lg"
                      style={{ backgroundColor: formData.primaryColor, color: '#000' }}
                    >
                       Get Started
                    </div>
                    <div className="w-full flex justify-between gap-4 mt-8">
                       <div className="flex-1 h-12 rounded-2xl bg-white/5 border border-white/5" />
                       <div className="flex-1 h-12 rounded-2xl bg-white/5 border border-white/5" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
