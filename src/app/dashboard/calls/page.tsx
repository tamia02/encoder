export const dynamic = 'force-dynamic';

import { PhoneIncoming, PhoneOutgoing, User, Calendar, Clock, PlayCircle } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function CallsPage() {
  const { userId } = await auth();
  
  // In a real app, we'd filter by workspace via userId
  const calls = await prisma.call.findMany({
    orderBy: { createdAt: 'desc' },
    include: { agent: true, contact: true }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 px-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-neutral-100 pb-12">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2.5rem] bg-black flex items-center justify-center text-white shadow-2xl shadow-black/10 transition-transform hover:scale-110 duration-700">
            <PhoneIncoming className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-neutral-900 uppercase mb-2">Neural Call Telemetry</h2>
            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <Calendar className="w-4 h-4 text-primary animate-pulse" />
              Real-time audit stream of all autonomous voice interactions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-2xl h-14 px-10 font-black text-[11px] uppercase tracking-widest border-neutral-200 hover:bg-neutral-50 transition-all">
            Export Dataset
          </Button>
          <Button className="bg-black hover:bg-neutral-900 text-white rounded-2xl h-14 px-10 font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
             Apply Filters
          </Button>
        </div>
      </div>

      {calls.length === 0 ? (
        <div className="p-32 rounded-[4rem] bg-white border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center space-y-8 group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-1000" />
           <div className="w-24 h-24 rounded-[3rem] bg-neutral-50 flex items-center justify-center border border-neutral-100 shadow-inner group-hover:scale-110 transition-transform duration-700 text-neutral-200 group-hover:text-primary relative z-10">
             <PhoneIncoming className="w-10 h-10" />
           </div>
           <div className="max-w-md space-y-4 relative z-10">
             <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">Zero Transmission Records</h3>
             <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest leading-relaxed opacity-80">
               Your neural agents are currently in standby mode. Once communication sequences are initialized, the audit logs will materialize here.
             </p>
           </div>
        </div>
      ) : (
        <div className="rounded-[3.5rem] bg-white border border-neutral-200 shadow-sm overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-neutral-50/50 border-b border-neutral-100">
                <tr>
                  <th className="px-10 py-8 font-black text-[10px] text-neutral-400 uppercase tracking-[0.25em]">Transmission</th>
                  <th className="px-10 py-8 font-black text-[10px] text-neutral-400 uppercase tracking-[0.25em]">Contact Entity</th>
                  <th className="px-10 py-8 font-black text-[10px] text-neutral-400 uppercase tracking-[0.25em]">Assigned Agent</th>
                  <th className="px-10 py-8 font-black text-[10px] text-neutral-400 uppercase tracking-[0.25em]">Duration</th>
                  <th className="px-10 py-8 font-black text-[10px] text-neutral-400 uppercase tracking-[0.25em]">Neural Status</th>
                  <th className="px-10 py-8 font-black text-[10px] text-neutral-400 uppercase tracking-[0.25em]">Timestamp</th>
                  <th className="px-10 py-8 font-black text-[10px] text-neutral-400 uppercase tracking-[0.25em] text-right">Playback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {calls.map((call: any) => (
                  <tr key={call.id} className="hover:bg-neutral-50/50 transition-colors group/row">
                    <td className="px-10 py-8">
                      {call.type === 'INBOUND' ? (
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm ring-1 ring-blue-100">
                              <PhoneIncoming className="w-4 h-4" />
                           </div>
                           <span className="text-[11px] font-black text-neutral-900 uppercase tracking-widest">Inbound</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shadow-sm ring-1 ring-purple-100">
                              <PhoneOutgoing className="w-4 h-4" />
                           </div>
                           <span className="text-[11px] font-black text-neutral-900 uppercase tracking-widest">Outbound</span>
                        </div>
                      )}
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 font-black text-xs group-hover/row:scale-110 transition-transform shadow-inner">
                            {call.contact?.name?.[0] || <User className="w-4 h-4" />}
                         </div>
                         <div className="flex flex-col">
                           <span className="text-[11px] font-black text-neutral-900 uppercase tracking-widest">{call.contact?.name || "Neural Entity"}</span>
                           <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.15em] mt-1">{call.contact?.phone || call.callSid.substring(0, 12)}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <Badge className="bg-neutral-50 text-neutral-900 border border-neutral-200 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest">
                        {call.agent?.name}
                      </Badge>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2 font-mono text-[11px] font-black text-neutral-500">
                        <Clock className="w-3.5 h-3.5 opacity-50" />
                        {Math.floor((call.duration || 0) / 60)}m {(call.duration || 0) % 60}s
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${call.status === 'COMPLETED' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                          <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${
                            call.status === 'COMPLETED' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {call.status}
                          </span>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest opacity-80 italic">
                          {format(new Date(call.createdAt), 'MMM d, HH:mm')}
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <Button variant="ghost" size="sm" className="w-12 h-12 rounded-2xl bg-neutral-50 text-primary hover:bg-white hover:shadow-xl transition-all scale-90 group-hover/row:scale-100 shadow-inner group-hover/row:rotate-3">
                        <PlayCircle className="w-6 h-6" />
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
