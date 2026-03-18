import { Button } from "@/components/ui/button";
import { Mic, Plus, Search, MoreVertical, Play, Edit } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function AgentsPage() {
  const { userId } = await auth();
  
  const agents = await prisma.agent.findMany({
    where: {
      workspace: {
        owner: {
          clerkId: userId || ""
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20 px-4">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-8">
        <div>
          <h2 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter">Neural Agents</h2>
          <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] mt-2">Autonomous Intelligence Management & Deployment</p>
        </div>
        <Link href="/dashboard/agents/create">
          <Button className="gap-3 rounded-[1.5rem] h-14 px-10 bg-black text-white hover:bg-neutral-900 font-black text-[11px] tracking-widest uppercase shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" />
            Provision New Agent
          </Button>
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="col-span-full py-32 border-4 border-dashed border-neutral-100 rounded-[4rem] flex flex-col items-center justify-center text-center space-y-8 bg-neutral-50/30 group hover:bg-white hover:border-primary/20 transition-all duration-700">
            <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-neutral-200 flex items-center justify-center text-neutral-200 shadow-xl group-hover:scale-110 group-hover:text-primary transition-all duration-700">
              <Mic className="w-12 h-12" />
            </div>
            <div className="max-w-md space-y-4">
              <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">No Agents Synchronized</h3>
              <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest opacity-80 leading-relaxed">You haven't initialized any neural instances yet. Start by deploying your first autonomous voice assistant to the stream.</p>
            </div>
            <Link href="/dashboard/agents/create">
              <Button variant="outline" className="mt-6 rounded-2xl px-12 h-14 border-neutral-200 bg-white font-black text-[11px] tracking-widest uppercase hover:bg-neutral-50 shadow-sm transition-all hover:scale-105">
                Initialize First Agent
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {agents.map((agent: any) => (
            <div key={agent.id} className="group p-10 rounded-[3.5rem] bg-white border border-neutral-200 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-700 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-all duration-1000" />
              
              <div className="relative z-10 flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Mic className="w-8 h-8" />
                </div>
                <Button variant="ghost" size="sm" className="h-12 w-12 p-0 rounded-2xl hover:bg-neutral-50 transition-all">
                  <MoreVertical className="w-6 h-6 text-neutral-400" />
                </Button>
              </div>

              <div className="relative z-10 space-y-2 mb-10">
                <h3 className="font-black text-2xl text-neutral-900 tracking-tight uppercase group-hover:text-primary transition-colors">{agent.name}</h3>
                <div className="flex items-center gap-3">
                   <span className="px-3 py-1 rounded-lg bg-neutral-100 text-[9px] font-black text-neutral-500 uppercase tracking-widest">{agent.mode} ENGINE</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                   <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">ACTIVE TELEMETRY</span>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4 border-t border-neutral-50 pt-8">
                <Button className="flex-1 h-14 rounded-2xl bg-neutral-900 text-white hover:bg-black font-black text-[10px] tracking-widest uppercase gap-3 shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                  <Play className="w-4 h-4 fill-white" /> Live Test
                </Button>
                <Link href={`/dashboard/agents/${agent.id}`}>
                  <Button variant="outline" size="sm" className="h-14 w-14 p-0 rounded-2xl border-neutral-200 bg-white text-neutral-400 hover:text-primary hover:border-primary/40 hover:shadow-xl transition-all">
                    <Edit className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
