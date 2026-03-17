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
    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide min-h-[600px]">
      {STAGES.map((stage) => (
        <div key={stage.id} className="flex-1 min-w-[320px] max-w-[350px] flex flex-col group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${stage.color} shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">{stage.label}</h3>
              <span className="text-[10px] bg-white/5 text-muted-foreground px-1.5 py-0.5 rounded-md font-mono">
                {contacts.filter(c => c.stage === stage.id).length}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
          </div>

          <div className="flex-1 bg-neutral-900/30 rounded-2xl border border-white/5 p-3 space-y-4">
            {contacts.filter(c => c.stage === stage.id).map((contact) => (
              <div 
                key={contact.id} 
                className="group/card p-4 rounded-xl bg-neutral-900 border border-white/5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
                      {contact.name?.[0]?.toUpperCase() || contact.phone?.[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover/card:text-primary transition-colors">
                        {contact.name || "Lead #" + contact.id.substring(0, 4)}
                      </h4>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Calendar className="w-2.5 h-2.5" />
                        {format(new Date(contact.createdAt), 'MMM d')}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <Phone className="w-3 h-3 text-primary/60" />
                    <span>{contact.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-neutral-900 flex items-center justify-center">
                       <Mail className="w-2.5 h-2.5 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {STAGES.filter(s => s.id !== stage.id).map(s => (
                      <button 
                        key={s.id}
                        onClick={() => handleMove(contact.id, s.id)}
                        title={`Move to ${s.label}`}
                        className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[10px] text-muted-foreground hover:text-white transition-colors border border-white/5"
                      >
                        <ChevronRight className="w-3 h-3" />
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
