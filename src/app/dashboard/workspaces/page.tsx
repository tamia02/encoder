export const dynamic = 'force-dynamic';

import { Building2, Plus, ArrowRight, ShieldCheck, Zap, Globe, Palette, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function WorkspacesPage() {
  const { userId } = await auth();
  
  // Fetch real workspaces from DB
  const workspaces = await prisma.workspace.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-white mb-1">Agency Hub</h2>
          <p className="text-muted-foreground text-sm">Orchestrate multi-tenant client operations and usage quotas.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 rounded-2xl h-11 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <Plus className="w-5 h-5" />
          Provision Client
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {workspaces.map((ws: any, idx: number) => {
          const usagePercent = Math.min(100, (ws.minutesUsed / ws.minutesLimit) * 100);
          const isCritical = usagePercent > 80;

          return (
            <div key={ws.id} className="group p-8 rounded-[2.5rem] bg-neutral-900/50 border border-white/5 hover:border-primary/30 hover:bg-neutral-800/50 transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-2xl">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-5">
                    {ws.logoUrl ? (
                      <img src={ws.logoUrl} alt={ws.name} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors">
                        <Building2 className="w-8 h-8" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-black text-white tracking-tight">{ws.name}</h3>
                        {idx === 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                        <Globe className="w-3 h-3 text-primary/50" />
                        {ws.domain || `${ws.slug}.encoder.ai`}
                      </p>
                    </div>
                  </div>
                  <Link href={`/dashboard/workspaces/${ws.id}/settings`}>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl bg-white/5 border border-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                       <Palette className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-3xl bg-white/5 border border-white/5 flex flex-col gap-1 hover:border-white/10 transition-colors">
                     <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3 h-3 text-primary" /> Active Agents
                     </span>
                     <span className="text-xl font-black text-white text-end">12</span>
                  </div>
                  <div className="p-4 rounded-3xl bg-white/5 border border-white/5 flex flex-col gap-1 hover:border-white/10 transition-colors">
                     <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-3 h-3 text-primary" /> Last Call
                     </span>
                     <span className="text-xl font-black text-white text-end">2m ago</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-muted-foreground">Usage Metering</span>
                    <span className={isCritical ? "text-red-400" : "text-primary"}>
                      {ws.minutesUsed} / {ws.minutesLimit} MINS
                    </span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full transition-all duration-1000 ${isCritical ? "bg-red-500" : "bg-primary"} shadow-[0_0_12px_rgba(34,197,94,0.3)]`} 
                      style={{ width: `${usagePercent}%` }} 
                    />
                  </div>
                  {isCritical && (
                    <p className="text-[10px] text-red-400/80 flex items-center gap-1.5 font-medium animate-pulse">
                      <AlertTriangle className="w-3 h-3" />
                      Usage at critical level. Consider upgrading this client.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-[10px] font-black text-white">
                        {String.fromCharCode(64+i)}
                     </div>
                   ))}
                   <div className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-primary/20 flex items-center justify-center text-[8px] font-black text-primary">
                      +4
                   </div>
                </div>
                <Button variant="outline" className="h-10 rounded-xl border-white/10 hover:bg-white/5 font-bold text-xs gap-3 pr-2 pl-4">
                  LAUNCH DASHBOARD <ArrowRight className="w-4 h-4 text-primary" />
                </Button>
              </div>
            </div>
          );
        })}

        {/* Provision New Client */}
        <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center space-y-6 hover:bg-white/5 transition-all cursor-pointer group min-h-[380px]">
           <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 border border-white/5">
             <Plus className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
           </div>
           <div className="max-w-xs">
             <h4 className="text-xl font-bold text-white mb-2">Deploy New Instance</h4>
             <p className="text-sm text-muted-foreground leading-relaxed">
               Spin up a fully isolated white-labeled environment for a new client with custom quotas.
             </p>
           </div>
        </div>
      </div>

      <div className="p-10 rounded-[2.5rem] bg-neutral-900/50 border border-white/5 relative overflow-hidden group">
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
          <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center border border-primary/20 text-primary shadow-2xl shadow-primary/20">
             <ShieldCheck className="w-10 h-10" />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl font-black text-white mb-3">Enterprise White-Labeling</h3>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Inject your agency's soul into the platform. Configure custom domains, sender IDs, and branded system communications to provide a seamless client experience.
            </p>
          </div>
          <Button className="rounded-2xl h-12 px-8 font-black bg-white text-black hover:bg-white/90 shadow-xl shadow-white/5 transition-transform hover:scale-105 active:scale-95">
             UPGRADE ENGINE
          </Button>
        </div>
      </div>
    </div>
  );
}
