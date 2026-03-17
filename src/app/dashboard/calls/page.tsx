export const dynamic = 'force-dynamic';

import { PhoneIncoming, PhoneOutgoing, User, Calendar, Clock, PlayCircle } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default async function CallsPage() {
  const { userId } = await auth();
  
  // In a real app, we'd filter by workspace via userId
  const calls = await prisma.call.findMany({
    orderBy: { createdAt: 'desc' },
    include: { agent: true, contact: true }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Call Logs</h2>
          <p className="text-muted-foreground text-sm">Review and analyze all inbound and outbound AI voice calls.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Export CSV</Button>
          <Button variant="outline" size="sm">Filters</Button>
        </div>
      </div>

      {calls.length === 0 ? (
        <div className="rounded-2xl bg-neutral-900/50 border border-white/5 overflow-hidden">
          <div className="p-24 text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
               <PhoneIncoming className="w-8 h-8 text-muted-foreground/50" />
             </div>
             <div className="max-w-xs mx-auto">
               <h3 className="text-lg font-semibold">No calls recorded</h3>
               <p className="text-sm text-muted-foreground">When your agents start making or receiving calls, the transcripts and recordings will appear here.</p>
             </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-neutral-900/50 border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium">Direction</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Agent</th>
                  <th className="px-6 py-4 font-medium">Duration</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {calls.map((call: any) => (
                  <tr key={call.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      {call.type === 'INBOUND' ? (
                        <div className="flex items-center gap-2 text-blue-400">
                          <PhoneIncoming className="w-4 h-4" />
                          <span>Inbound</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-purple-400">
                          <PhoneOutgoing className="w-4 h-4" />
                          <span>Outbound</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{call.contact?.name || "Anonymous"}</span>
                        <span className="text-[10px] text-muted-foreground">{call.contact?.phone || call.callSid.substring(0, 10)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-white/5 text-[10px] border border-white/10 uppercase tracking-wider font-bold">
                        {call.agent?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Clock className="w-3 h-3" />
                        {Math.floor((call.duration || 0) / 60)}m {(call.duration || 0) % 60}s
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        call.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      {format(new Date(call.createdAt), 'MMM d, HH:mm')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="w-4 h-4 text-primary" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
