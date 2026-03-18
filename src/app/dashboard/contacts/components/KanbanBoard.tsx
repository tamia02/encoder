"use client";

import { useState, useTransition } from "react";
import { 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronRight, 
  Plus,
  GripVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { updateContactStage } from "../actions";

const STAGES = [
  { id: "NEW", label: "New Lead", color: "bg-blue-500" },
  { id: "QUALIFIED", label: "Qualified", color: "bg-purple-500" },
  { id: "BOOKED", label: "Booked", color: "bg-orange-500" },
  { id: "CLOSED", label: "Closed", color: "bg-green-500" }
];

export default function KanbanBoard({ initialContacts }: { initialContacts: any[] }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [isPending, startTransition] = useTransition();

  const handleMove = async (contactId: string, newStage: string) => {
    // Optimistic update
    const previousContacts = [...contacts];
    setContacts(contacts.map(c => c.id === contactId ? { ...c, stage: newStage } : c));

    startTransition(async () => {
      const result = await updateContactStage(contactId, newStage);
      if (!result.success) {
        setContacts(previousContacts);
        alert("Failed to update stage. Reverting...");
      }
    });
  };

  return (
    <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide min-h-[700px]">
      {STAGES.map((stage) => (
        <div key={stage.id} className="flex-1 min-w-[340px] max-w-[380px] flex flex-col group">
          <div className="flex items-center justify-between mb-5 px-2">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${stage.color} shadow-lg shadow-black/5`} />
              <h3 className="text-xs font-black text-neutral-900 uppercase tracking-[0.2em]">{stage.label}</h3>
              <span className="text-[10px] bg-neutral-100 text-neutral-400 px-2 py-0.5 rounded-lg font-black shadow-inner">
                {contacts.filter(c => c.stage === stage.id).length}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xl bg-neutral-50 border border-neutral-100 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-primary shadow-sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 bg-neutral-50/50 rounded-[2.5rem] border border-neutral-100 p-4 space-y-5 shadow-inner backdrop-blur-sm">
            {contacts.filter(c => c.stage === stage.id).map((contact) => (
              <div 
                key={contact.id} 
                className="group/card p-6 rounded-[2rem] bg-white border border-neutral-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black text-sm border border-primary/10 group-hover/card:scale-110 transition-transform">
                      {contact.name?.[0]?.toUpperCase() || contact.phone?.[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-neutral-900 text-sm group-hover/card:text-primary transition-colors uppercase tracking-tight">
                        {contact.name || "Lead #" + contact.id.substring(0, 4)}
                      </h4>
                      <p className="text-[10px] text-neutral-400 font-black flex items-center gap-1.5 mt-1 uppercase tracking-widest">
                        <Calendar className="w-3 h-3 text-primary" />
                        {format(new Date(contact.createdAt), 'MMM d')}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-all hover:bg-neutral-50">
                    <MoreVertical className="w-4 h-4 text-neutral-400" />
                  </Button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100 shadow-inner">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] text-neutral-600 font-black tracking-tight">{contact.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-neutral-50">
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-neutral-50 flex items-center justify-center shadow-sm">
                       <Mail className="w-3 h-3 text-neutral-400" />
                    </div>
                  </div>
                  
                  <div className="flex gap-1.5">
                    {STAGES.filter(s => s.id !== stage.id).map(s => (
                      <button 
                        key={s.id}
                        onClick={() => handleMove(contact.id, s.id)}
                        disabled={isPending}
                        title={`Move to ${s.label}`}
                        className="w-8 h-8 rounded-xl bg-neutral-50 hover:bg-primary/10 flex items-center justify-center text-neutral-400 hover:text-primary transition-all border border-neutral-100 active:scale-90 disabled:opacity-50"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
