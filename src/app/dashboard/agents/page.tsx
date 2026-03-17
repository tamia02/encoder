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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">AI Agents</h2>
          <p className="text-sm text-neutral-500 font-medium">Manage and configure your autonomous voice and chat agents.</p>
        </div>
        <Link href="/dashboard/agents/create">
          <Button className="gap-2 rounded-xl h-11 px-6 font-black text-[10px] tracking-widest uppercase">
            <Plus className="w-4 h-4" />
            Create New Agent
          </Button>
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full py-24 border-2 border-dashed border-neutral-200 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6 bg-neutral-50/50">
            <div className="w-20 h-20 rounded-3xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-300 shadow-sm">
              <Mic className="w-10 h-10" />
            </div>
            <div className="max-w-xs space-y-2">
              <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">No agents found</h3>
              <p className="text-xs text-neutral-500 font-medium">You haven't created any AI agents yet. Start by creating your first voice assistant.</p>
            </div>
            <Link href="/dashboard/agents/create">
              <Button variant="outline" className="mt-4 rounded-xl px-10 h-11 border-neutral-200 text-[10px] font-black tracking-widest uppercase">
                Create First Agent
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {agents.map((agent: any) => (
            <div key={agent.id} className="group p-8 rounded-[2.5rem] bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Mic className="w-6 h-6 text-primary" />
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-1 mb-8">
                <h3 className="font-black text-xl text-neutral-900 tracking-tight">{agent.name}</h3>
                <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em]">{agent.mode} AGENT</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="flex-1 h-10 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 font-black text-[10px] tracking-widest uppercase gap-2">
                  <Play className="w-3 h-3" /> Test
                </Button>
                <Link href={`/dashboard/agents/${agent.id}`}>
                  <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-900 transition-all">
                    <Edit className="w-3.5 h-3.5" />
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
