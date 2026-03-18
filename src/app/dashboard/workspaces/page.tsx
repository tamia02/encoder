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
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-100 pb-10">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-neutral-900 mb-2 uppercase">Agency Hub</h2>
          <p className="text-neutral-500 font-medium text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Manage all your isolated AI workspace instances from a single command center.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 px-6 rounded-2xl border-neutral-200 text-neutral-700 font-black text-xs uppercase tracking-widest hover:bg-neutral-50 transition-all">
              FILTER
           </Button>
           <Button className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              + PROVISION CLIENT
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {workspaces.map((ws: any, idx: number) => {
          const usagePercent = Math.min(100, (ws.minutesUsed / ws.minutesLimit) * 100);
          const isCritical = usagePercent > 80;

          return (
            <div key={ws.id} className="group p-10 rounded-[3rem] bg-white border border-neutral-200 hover:border-primary/30 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
              
              <div className="relative z-10 space-y-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-6">
                    {ws.logoUrl ? (
                      <img src={ws.logoUrl} alt={ws.name} className="w-20 h-20 rounded-[2rem] object-cover border border-neutral-100 shadow-md" />
                    ) : (
                      <div className="w-20 h-20 rounded-[2rem] bg-neutral-50 border border-neutral-100 flex items-center justify-center text-primary group-hover:scale-105 transition-all shadow-sm">
                        <Building2 className="w-10 h-10" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-black text-neutral-900 tracking-tight">{ws.name}</h3>
                        {idx === 0 && (
                          <span className="px-3 py-1 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 font-black uppercase tracking-widest flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-primary" />
                        {ws.domain || `${ws.slug}.encoder.ai`}
                      </p>
                    </div>
                  </div>
                  <Link href={`/dashboard/workspaces/${ws.id}/settings`}>
                    <Button variant="ghost" size="sm" className="h-12 w-12 p-0 rounded-2xl bg-neutral-50 border border-neutral-200 hover:bg-primary/10 hover:text-primary transition-all">
                       <Palette className="w-6 h-6" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-[2rem] bg-neutral-50 border border-neutral-100 flex flex-col gap-1.5 hover:border-primary/30 transition-all group/stat shadow-inner">
                     <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" /> Agents
                     </span>
                     <span className="text-3xl font-black text-neutral-900 text-end">12</span>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-neutral-50 border border-neutral-100 flex flex-col gap-1.5 hover:border-primary/30 transition-all group/stat shadow-inner">
                     <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" /> Last Call
                     </span>
                     <span className="text-3xl font-black text-neutral-900 text-end">2m ago</span>
                  </div>
                </div>

                <div className="space-y-4 px-1">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.1em]">
                    <span className="text-neutral-400">Usage Metering</span>
                    <span className={isCritical ? "text-red-500 font-black" : "text-primary font-black"}>
                      {ws.minutesUsed} / {ws.minutesLimit} MINS
                    </span>
                  </div>
                  <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 shadow-inner">
                    <div 
                      className={`h-full transition-all duration-1000 shadow-sm ${isCritical ? "bg-red-500" : "bg-primary"}`} 
                      style={{ width: `${usagePercent}%` }} 
                    />
                  </div>
                  {isCritical && (
                    <p className="text-[10px] text-red-500 flex items-center gap-2 font-black uppercase tracking-tight animate-pulse mt-2">
                      <AlertTriangle className="w-4 h-4" />
                      Usage critical. Immediate upgrade recommended.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-neutral-100 flex items-center justify-between relative z-10">
                <div className="flex items-center -space-x-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-neutral-100 flex items-center justify-center text-[11px] font-black text-neutral-400 shadow-sm">
                        {String.fromCharCode(64+i)}
                     </div>
                   ))}
                   <div className="w-12 h-12 rounded-full border-4 border-white bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary shadow-sm">
                      +4
                   </div>
                </div>
                <Link href={`/dashboard/workspaces/${ws.id}`}>
                  <Button className="h-12 px-8 rounded-2xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest gap-3 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
                    LAUNCH <ArrowRight className="w-4 h-4 text-primary" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}

        {/* Provision New Client */}
        <div className="p-10 rounded-[3rem] border-4 border-dashed border-neutral-200 flex flex-col items-center justify-center text-center space-y-8 hover:bg-neutral-50 hover:border-primary/30 transition-all duration-500 cursor-pointer group min-h-[420px] shadow-sm hover:shadow-xl">
           <div className="w-24 h-24 rounded-[2.5rem] bg-neutral-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700 border border-neutral-200 shadow-sm">
             <Plus className="w-12 h-12 text-neutral-400 group-hover:text-primary transition-colors" />
           </div>
           <div className="max-w-xs">
             <h4 className="text-2xl font-black text-neutral-900 mb-2 uppercase tracking-tight">Deploy New Instance</h4>
             <p className="text-xs text-neutral-500 font-bold leading-relaxed uppercase tracking-wider opacity-60">
               Spin up a fully isolated white-labeled environment for a new client with custom quotas.
             </p>
           </div>
        </div>
      </div>

      <div className="p-14 rounded-[4rem] bg-neutral-900 border border-neutral-800 relative overflow-hidden group shadow-2xl mt-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] -mr-32 -mt-32 transition-all duration-1000 group-hover:bg-primary/30" />
        <div className="flex flex-col lg:flex-row items-center gap-14 relative z-10">
          <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center border border-primary/20 text-primary shadow-2xl shadow-primary/20 transition-transform group-hover:scale-110">
             <ShieldCheck className="w-12 h-12" />
          </div>
          <div className="flex-1 text-center lg:text-left space-y-4">
            <h3 className="text-4xl font-black text-white uppercase tracking-tight">Enterprise White-Labeling</h3>
            <p className="text-neutral-400 font-medium text-base leading-relaxed max-w-2xl">
              Inject your agency's soul into the platform. Configure custom domains, sender IDs, and branded system communications to provide a seamless client experience.
            </p>
          </div>
          <Button className="rounded-2xl h-16 px-12 font-black text-sm bg-white text-black hover:bg-neutral-100 shadow-2xl shadow-white/10 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest whitespace-nowrap">
             UPGRADE ENGINE
          </Button>
        </div>
      </div>
    </div>
  );
}
