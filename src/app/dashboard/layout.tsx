"use client";

import { UserButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  Users, 
  Mic, 
  Settings, 
  BarChart3, 
  PhoneCall, 
  Plus,
  MessageSquare,
  Globe,
  Layers,
  Zap,
  ShieldCheck,
  Building2,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const mainItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Overview", href: "/dashboard" },
    { icon: <Mic className="w-4 h-4" />, label: "AI Agents", href: "/dashboard/agents" },
    { icon: <Layers className="w-4 h-4" />, label: "Agent Canvas", href: "/dashboard/canvas" },
    { icon: <PhoneCall className="w-4 h-4" />, label: "Call Logs", href: "/dashboard/calls" },
    { icon: <BarChart3 className="w-4 h-4" />, label: "Analytics", href: "/dashboard/analytics" },
  ];

  const channelItems = [
    { icon: <MessageSquare className="w-4 h-4" />, label: "WhatsApp", href: "/dashboard/whatsapp" },
    { icon: <Globe className="w-4 h-4" />, label: "Omni-Channel", href: "/dashboard/omni" },
  ];

  const agencyItems = [
    { icon: <Building2 className="w-4 h-4" />, label: "Workspaces", href: "/dashboard/workspaces" },
    { icon: <Users className="w-4 h-4" />, label: "CRM & Pipelines", href: "/dashboard/contacts" },
    { icon: <CreditCard className="w-4 h-4" />, label: "Billing & Plans", href: "/dashboard/billing" },
    { icon: <Zap className="w-4 h-4" />, label: "Integrations", href: "/dashboard/integrations" },
    { icon: <ShieldCheck className="w-4 h-4" />, label: "White-Label", href: "/dashboard/white-label" },
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[280px] border-r border-neutral-100 bg-white hidden md:flex flex-col relative z-30">
        <div className="p-10 flex items-center gap-4">
          <div className="bg-black p-3 rounded-2xl shadow-xl shadow-black/10 transition-transform hover:rotate-12 duration-500">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-neutral-900 uppercase">Encoder</span>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-10 custom-scrollbar">
          <div className="space-y-4">
            <p className="px-5 text-[9px] font-black text-neutral-300 uppercase tracking-[0.3em]">Core Nodes</p>
            <div className="space-y-1.5">
              {mainItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500 group relative ${
                    pathname === item.href 
                      ? "bg-neutral-50 text-black shadow-sm ring-1 ring-neutral-100" 
                      : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <div className={`transition-colors duration-500 ${pathname === item.href ? "text-primary scale-110" : "group-hover:text-primary"}`}>
                    {item.icon}
                  </div>
                  {item.label}
                  {pathname === item.href && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,102,255,0.4)]" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="px-5 text-[9px] font-black text-neutral-300 uppercase tracking-[0.3em]">Channels</p>
            <div className="space-y-1.5">
              {channelItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500 group relative ${
                    pathname === item.href 
                      ? "bg-neutral-50 text-black shadow-sm ring-1 ring-neutral-100" 
                      : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <div className={`transition-colors duration-500 ${pathname === item.href ? "text-primary scale-110" : "group-hover:text-primary"}`}>
                    {item.icon}
                  </div>
                  {item.label}
                  {pathname === item.href && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,102,255,0.4)]" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="px-5 text-[9px] font-black text-neutral-300 uppercase tracking-[0.3em]">Agency Cluster</p>
            <div className="space-y-1.5">
              {agencyItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500 group relative ${
                    pathname === item.href 
                      ? "bg-neutral-50 text-black shadow-sm ring-1 ring-neutral-100" 
                      : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <div className={`transition-colors duration-500 ${pathname === item.href ? "text-primary scale-110" : "group-hover:text-primary"}`}>
                    {item.icon}
                  </div>
                  {item.label}
                  {pathname === item.href && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,102,255,0.4)]" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-neutral-50 space-y-4">
          <Link href="/dashboard/settings" className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500 group ${
            pathname === "/dashboard/settings" ? "bg-neutral-50 text-black" : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
          }`}>
            <Settings className={`w-4 h-4 transition-colors ${pathname === "/dashboard/settings" ? "text-primary" : "group-hover:text-primary"}`} />
            System Control
          </Link>
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-[2rem] border border-neutral-100 shadow-inner group hover:bg-white transition-all duration-700">
            <div className="flex items-center gap-3">
              <div className="scale-90 hover:scale-110 transition-transform">
                <UserButton />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-neutral-900 uppercase tracking-tighter">Agency Node</span>
                <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">Neural Suite Active</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white relative">
        <header className="h-20 border-b border-neutral-100 flex items-center justify-between px-12 bg-white/80 backdrop-blur-xl z-20 sticky top-0">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(0,102,255,0.8)]" />
             <h1 className="text-sm font-black text-neutral-900 tracking-[0.2em] uppercase">
                {pathname === "/dashboard" ? "Overview Telemetry" : 
                 pathname.split("/").pop()?.replace("-", " ") + " Cluster"}
             </h1>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard/agents/create">
              <Button size="sm" className="gap-3 rounded-2xl h-12 px-8 bg-black text-white hover:bg-neutral-900 font-black text-[10px] tracking-widest uppercase shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
                <Plus className="w-4 h-4" />
                Deploy Instance
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e5e5e5;
        }
      `}</style>
    </div>
  );
}
