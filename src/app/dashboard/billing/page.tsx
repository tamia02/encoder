export const dynamic = 'force-dynamic';

import { 
  CreditCard, 
  Zap, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  DollarSign, 
  BarChart3,
  Globe,
  Users,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Starter Agency",
    price: "$99",
    description: "Perfect for scaling your first few clients.",
    features: ["5 Workspaces", "1,000 Minutes/mo", "Basic Analytics", "Standard Support"],
    buttonText: "Current Plan",
    current: true
  },
  {
    name: "Pro Agency",
    price: "$299",
    description: "The sweet spot for growing voice agencies.",
    features: ["25 Workspaces", "10,000 Minutes/mo", "White-Labeling", "Priority Support", "API Access"],
    buttonText: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Scale",
    price: "$999",
    description: "Enterprise-grade power for high-volume firms.",
    features: ["Unlimited Workspaces", "100,000 Minutes/mo", "Custom Domains", "24/7 Concierge", "SLA Guarantees"],
    buttonText: "Contact Sales"
  }
];

export default function BillingPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-100 pb-8">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-neutral-900 uppercase mb-1">Billing & Economics</h2>
          <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em] mt-2">Manage your agency subscriptions and metered usage.</p>
        </div>
        <Button className="gap-3 bg-black text-white hover:bg-neutral-900 rounded-[1.5rem] h-14 px-10 font-black text-[11px] tracking-widest uppercase shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
          <DollarSign className="w-5 h-5" />
          Add Payment Instrument
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Usage Stats */}
          <div className="p-12 rounded-[4rem] bg-white border border-neutral-200 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700">
            <div className="absolute -top-10 -right-10 p-10 opacity-5 group-hover:opacity-10 transition-all duration-1000 group-hover:scale-110">
               <Zap className="w-48 h-48 text-primary" />
            </div>
            <div className="relative z-10 space-y-10">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-[1.5rem] bg-primary/5 flex items-center justify-center border border-primary/10 text-primary shadow-inner">
                    <BarChart3 className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Consumption Logic</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 <div className="space-y-3">
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Total Minutes</span>
                    <p className="text-3xl font-black text-neutral-900 tracking-tighter uppercase">4,280 <span className="text-sm font-black text-neutral-300">/ 5,000</span></p>
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden shadow-inner">
                       <div className="h-full bg-primary w-[85%] shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">SMS/WhatsApp</span>
                    <p className="text-3xl font-black text-neutral-900 tracking-tighter uppercase">12k <span className="text-sm font-black text-neutral-300">/ 20k</span></p>
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden shadow-inner">
                       <div className="h-full bg-blue-500 w-[60%]" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Active Seats</span>
                    <p className="text-3xl font-black text-neutral-900 tracking-tighter uppercase">8 <span className="text-sm font-black text-neutral-300">/ 10</span></p>
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden shadow-inner">
                       <div className="h-full bg-purple-500 w-[80%]" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="p-10 rounded-[3.5rem] bg-neutral-50 border border-neutral-100 shadow-inner space-y-8">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-[1.2rem] bg-white flex items-center justify-center text-neutral-400 shadow-sm border border-neutral-100">
                      <CreditCard className="w-5 h-5" />
                   </div>
                   <h4 className="font-black text-neutral-900 uppercase tracking-tight text-sm">Stored Instruments</h4>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-black text-[10px] uppercase tracking-widest hover:bg-neutral-100 rounded-xl px-4 py-2">Manage Portal →</Button>
             </div>
             
             <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-white border border-neutral-200 group hover:border-primary shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center border border-neutral-100 shadow-inner group-hover:bg-primary/5 transition-colors">
                      <div className="flex gap-1">
                         <div className="w-4 h-4 rounded-full bg-red-500 opacity-80" />
                         <div className="w-4 h-4 rounded-full bg-yellow-500 -ml-2 opacity-80" />
                      </div>
                   </div>
                   <div>
                      <p className="text-sm font-black text-neutral-900 tracking-tight uppercase">Mastercard ending in 8824</p>
                      <p className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mt-1">Expires 12/28 • Primary Settlement Engine</p>
                   </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center border border-green-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
             </div>
          </div>
        </div>

        {/* Pro Tip Sidebar */}
        <div className="p-10 rounded-[4rem] bg-black text-white space-y-10 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-all duration-1000 group-hover:scale-110">
              <Zap className="w-24 h-24" />
           </div>
           <div className="w-16 h-16 rounded-[2rem] bg-white/10 flex items-center justify-center text-primary shadow-2xl shadow-primary/20 border border-white/5 relative z-10">
              <Zap className="w-8 h-8 animate-pulse" />
           </div>
           <div className="relative z-10 space-y-4">
              <h4 className="text-2xl font-black uppercase tracking-tight">Scale your Margin</h4>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-relaxed opacity-80">
                 Encoder's neural metered billing allows you to track telemetry per workspace. Most elite agencies mark up intervals by 300%.
              </p>
           </div>
           <ul className="space-y-6 relative z-10">
              {[
                { icon: Globe, label: "Custom Domain Sync", color: "text-blue-400" },
                { icon: Users, label: "White-Label Portals", color: "text-purple-400" },
                { icon: MessageSquare, label: "Private Neural Streams", color: "text-green-400" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-5 text-[10px] font-black text-white uppercase tracking-[0.2em] group/li cursor-pointer">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover/li:bg-primary/20 group-hover/li:border-primary/40 transition-all ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  {item.label}
                </li>
              ))}
           </ul>
        </div>
      </div>

      {/* Plan Grid */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
           <h3 className="text-4xl font-black text-neutral-900 tracking-tighter uppercase">Choose your Scale</h3>
           <p className="text-[10px] text-neutral-400 font-black tracking-[0.3em] uppercase opacity-80">All plans include the Multi-Agent Neural Canvas & CRM</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {PLANS.map((plan, i) => (
            <div 
              key={i} 
              className={`p-12 rounded-[4rem] transition-all duration-700 relative flex flex-col justify-between group overflow-hidden ${plan.popular ? 'bg-primary shadow-[0_40px_100px_rgba(59,130,246,0.3)] border-none scale-105 z-10 hover:translate-y-[-10px]' : 'bg-white border border-neutral-200 shadow-sm hover:shadow-2xl hover:border-primary/20 hover:translate-y-[-10px]'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-12 px-6 py-2 rounded-2xl bg-black text-[9px] font-black text-white uppercase tracking-[0.3em] shadow-2xl z-20">
                   MOST SYNCHRONIZED
                </div>
              )}

              <div className="absolute top-0 right-0 w-48 h-48 bg-black/5 blur-3xl -mr-20 -mt-20 group-hover:bg-black/10 transition-all duration-1000" />
              
              <div className="space-y-10 relative z-10">
                 <div>
                    <h4 className={`text-3xl font-black mb-2 tracking-tight uppercase ${plan.popular ? 'text-black' : 'text-neutral-900'}`}>{plan.name}</h4>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${plan.popular ? 'text-black/60' : 'text-neutral-400'}`}>{plan.description}</p>
                 </div>

                 <div className="flex items-baseline gap-2">
                    <span className={`text-6xl font-black tracking-tighter ${plan.popular ? 'text-black' : 'text-neutral-900'}`}>{plan.price}</span>
                    <span className={`text-[10px] font-black tracking-[0.3em] ${plan.popular ? 'text-black/40' : 'text-neutral-400'}`}>/ MO</span>
                 </div>

                 <div className={`h-1 w-20 rounded-full ${plan.popular ? 'bg-black/10' : 'bg-primary/10'}`} />

                 <ul className="space-y-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-4">
                         <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${plan.popular ? 'bg-black/10 border-black/10' : 'bg-primary/5 border-primary/10'}`}>
                            <CheckCircle2 className={`w-4 h-4 ${plan.popular ? 'text-black' : 'text-primary'}`} />
                         </div>
                         <span className={`text-[10px] font-black uppercase tracking-widest ${plan.popular ? 'text-black/80' : 'text-neutral-500'}`}>{feature}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              <Button className={`w-full h-16 rounded-[2rem] mt-16 font-black text-[11px] tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl uppercase ${plan.current ? 'bg-neutral-100 text-neutral-400' : plan.popular ? 'bg-black text-white hover:bg-neutral-900 shadow-black/20' : 'bg-neutral-900 text-white hover:bg-black shadow-black/10'}`}>
                 {plan.buttonText}
                 {!plan.current && <ArrowUpRight className="ml-3 w-5 h-5" />}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
