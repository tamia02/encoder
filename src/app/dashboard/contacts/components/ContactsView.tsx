"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  MoreVertical, 
  Calendar, 
  LayoutGrid, 
  List,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import KanbanBoard from "./KanbanBoard";

export default function ContactsView({ initialContacts }: { initialContacts: any[] }) {
  const [view, setView] = useState<"list" | "pipeline">("pipeline");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = initialContacts.filter(c => 
    (c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     c.phone?.includes(searchQuery))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">CRM & Pipelines</h2>
          <p className="text-muted-foreground text-sm">Orchestrate your sales funnel and customer relationships.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-neutral-900 border border-white/10 p-1 rounded-xl flex items-center gap-1">
            <Button 
              variant={view === 'pipeline' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setView('pipeline')}
              className="h-8 px-3 rounded-lg gap-2 text-xs"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Pipeline
            </Button>
            <Button 
              variant={view === 'list' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setView('list')}
              className="h-8 px-3 rounded-lg gap-2 text-xs"
            >
              <List className="w-3.5 h-3.5" />
              List
            </Button>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 rounded-xl">
            <UserPlus className="w-4 h-4" />
            Add Lead
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 py-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search leads..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-neutral-900/50 border-white/5 focus:ring-primary/20 focus:border-primary/30 rounded-2xl transition-all"
          />
        </div>
      </div>

      {initialContacts.length === 0 ? (
        <div className="rounded-3xl bg-neutral-900/30 border border-white/5 p-24 text-center backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
            <Users className="w-12 h-12 text-muted-foreground/20" />
          </div>
          <h3 className="text-2xl font-black mb-3 text-white tracking-tight">No intelligence found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed mb-8">
            Your AI agents haven't identified any leads yet. Connect a voice channel or manual import to begin.
          </p>
          <Button variant="outline" className="rounded-2xl border-white/10 hover:bg-white/5 gap-2 px-6">
            Import Contacts
            <ArrowRight className="w-4 h-4 text-primary" />
          </Button>
        </div>
      ) : (
        <>
          {view === "pipeline" ? (
            <KanbanBoard initialContacts={filteredContacts} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContacts.map((contact: any) => (
                <div key={contact.id} className="group p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-primary/20 hover:bg-neutral-800/50 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                      {contact.name?.[0]?.toUpperCase() || contact.phone?.[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                        {contact.name || "Lead #" + contact.id.substring(0, 4)}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        Added {format(new Date(contact.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                      <Phone className="w-4 h-4 text-primary/70" />
                      <span className="text-sm text-neutral-300 font-medium">{contact.phone}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{contact.stage}</span>
                    </div>
                    <Button variant="link" size="sm" className="h-auto p-0 text-primary text-xs hover:no-underline">
                      View History →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
