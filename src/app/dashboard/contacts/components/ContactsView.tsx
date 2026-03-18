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
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-100 pb-10">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-neutral-900 mb-1 uppercase">CRM & Pipelines</h2>
          <p className="text-neutral-500 font-medium text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Orchestrate your sales funnel and customer relationships.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-neutral-100 border border-neutral-200 p-1 rounded-2xl flex items-center gap-1 shadow-inner">
            <Button 
              variant={view === 'pipeline' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setView('pipeline')}
              className={`h-9 px-4 rounded-xl gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                view === 'pipeline' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Pipeline
            </Button>
            <Button 
              variant={view === 'list' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setView('list')}
              className={`h-9 px-4 rounded-xl gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                view === 'list' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              List
            </Button>
          </div>
          <Button className="gap-3 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 rounded-2xl h-12 px-8 transition-all hover:scale-105 active:scale-95">
            <UserPlus className="w-5 h-5" />
            Add Lead
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-6 py-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input 
            placeholder="Search intelligence database..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 bg-white border-neutral-200 focus:ring-primary/20 focus:border-primary/30 rounded-2xl transition-all font-bold shadow-sm"
          />
        </div>
      </div>

      {initialContacts.length === 0 ? (
        <div className="rounded-[3rem] bg-neutral-50 border border-neutral-200 p-32 text-center relative overflow-hidden group shadow-inner">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center mx-auto mb-10 border border-neutral-200 group-hover:scale-110 transition-all duration-700 shadow-sm">
            <Users className="w-12 h-12 text-neutral-200" />
          </div>
          <h3 className="text-3xl font-black mb-4 text-neutral-900 tracking-tight uppercase">Zero Leads Detected</h3>
          <p className="text-sm text-neutral-500 max-w-sm mx-auto font-medium leading-relaxed mb-10">
            Your AI agents haven't identified any leads yet. Connect a voice channel or manual import to begin.
          </p>
          <Button variant="outline" className="rounded-2xl border-neutral-200 hover:bg-white text-neutral-700 font-black uppercase tracking-widest h-12 px-10 gap-3 shadow-sm">
            Import Contacts
            <ArrowRight className="w-4 h-4 text-primary" />
          </Button>
        </div>
      ) : (
        <>
          {view === "pipeline" ? (
            <KanbanBoard initialContacts={filteredContacts} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
              {filteredContacts.map((contact: any) => (
                <div key={contact.id} className="group p-8 rounded-[2.5rem] bg-white border border-neutral-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden flex flex-col justify-between shadow-sm">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all">
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-neutral-50">
                      <MoreVertical className="w-5 h-5 text-neutral-400" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black text-xl border border-primary/10 group-hover:scale-110 transition-transform">
                      {contact.name?.[0]?.toUpperCase() || contact.phone?.[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-neutral-900 group-hover:text-primary transition-colors tracking-tight uppercase">
                        {contact.name || "Lead #" + contact.id.substring(0, 4)}
                      </h3>
                      <p className="text-[10px] text-neutral-400 font-black flex items-center gap-2 mt-1 uppercase tracking-widest">
                        <Calendar className="w-3 h-3 text-primary" />
                        Added {format(new Date(contact.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 group-hover:border-primary/10 transition-all shadow-inner">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm text-neutral-600 font-black tracking-tight">{contact.phone}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-neutral-50">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/20" />
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{contact.stage}</span>
                    </div>
                    <Button variant="link" size="sm" className="h-auto p-0 text-primary font-black text-[10px] uppercase tracking-widest hover:no-underline hover:translate-x-1 transition-transform">
                      View Engine →
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
