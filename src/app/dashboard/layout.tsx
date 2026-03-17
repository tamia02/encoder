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
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-200 bg-neutral-50 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <div className="bg-primary p-1 rounded-lg">
            <Mic className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight">Encoder</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Main</p>
            {mainItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === item.href 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-neutral-200/50 hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Channels</p>
            {channelItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === item.href 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-neutral-200/50 hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Agency Tools</p>
            {agencyItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === item.href 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-neutral-200/50 hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-neutral-200 space-y-1">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-neutral-200/50 hover:text-foreground transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <div className="flex items-center justify-between px-3 py-4 mt-2 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <div className="flex items-center gap-2">
              <UserButton />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-900">Agency Account</span>
                <span className="text-[10px] text-muted-foreground">Pro Plan</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        <header className="h-16 border-b border-neutral-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md">
          <h1 className="text-lg font-bold text-neutral-900 tracking-tight uppercase">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <Button size="sm" className="gap-2 rounded-xl h-10 px-6 font-black text-[10px] tracking-widest uppercase">
              <Plus className="w-4 h-4" />
              Create Agent
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
