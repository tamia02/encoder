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
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-white mb-1">Billing & Economics</h2>
          <p className="text-muted-foreground text-sm">Manage your agency subscriptions and metered usage.</p>
        </div>
        <Button className="gap-2 bg-white text-black hover:bg-white/90 rounded-2xl h-11 px-6 font-bold">
          <DollarSign className="w-4 h-4" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Usage Stats */}
          <div className="p-10 rounded-[2.5rem] bg-neutral-900/50 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
               <Zap className="w-32 h-32 text-primary" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                    <BarChart3 className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-bold text-white uppercase tracking-tight">Consumption Logic</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Minutes</span>
                    <p className="text-3xl font-black text-white tracking-tighter">4,280 <span className="text-sm font-medium text-muted-foreground">/ 5,000</span></p>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary w-[85%] shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">SMS/WhatsApp</span>
                    <p className="text-3xl font-black text-white tracking-tighter">12k <span className="text-sm font-medium text-muted-foreground">/ 20k</span></p>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-[60%]" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Seats</span>
                    <p className="text-3xl font-black text-white tracking-tighter">8 <span className="text-sm font-medium text-muted-foreground">/ 10</span></p>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-purple-500 w-[80%]" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="p-8 rounded-[2.2rem] bg-neutral-900/30 border border-white/5">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <CreditCard className="w-5 h-5 text-muted-foreground" />
                   <h4 className="font-bold text-white uppercase tracking-tight text-sm">Stored Instruments</h4>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/10">Manage →</Button>
             </div>
             
             <div className="flex items-center justify-between p-6 rounded-3xl bg-neutral-950 border border-white/5 group hover:border-primary/20 transition-all">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                         <div className="w-3 h-3 rounded-full bg-orange-500 blur-[2px]" />
                      </div>
                   </div>
                   <div>
                      <p className="text-sm font-bold text-white tracking-tight">Mastercard ending in 8824</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Expires 12/28 • Primary</p>
                   </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          </div>
        </div>

        {/* Pro Tip Sidebar */}
        <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 space-y-6">
           <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-xl shadow-primary/10">
              <Zap className="w-6 h-6" />
           </div>
           <h4 className="text-xl font-bold text-white">Scale your Margin</h4>
           <p className="text-sm text-neutral-400 leading-relaxed">
              Encoder's metered billing allows you to track usage per workspace. Most agencies charge clients a 2x-3x markup on minutes consumed.
           </p>
           <ul className="space-y-4">
              {[
                { icon: Globe, label: "Custom Domains", color: "text-blue-400" },
                { icon: Users, label: "Client Dashboards", color: "text-purple-400" },
                { icon: MessageSquare, label: "Private Channels", color: "text-green-400" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                  <div className={`p-2 rounded-lg bg-neutral-900 border border-white/5 ${item.color}`}>
                    <item.icon className="w-3.5 h-3.5" />
                  </div>
                  {item.label}
                </li>
              ))}
           </ul>
        </div>
      </div>

      {/* Plan Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
           <h3 className="text-3xl font-black text-white tracking-tighter">Choose your Scale</h3>
           <p className="text-muted-foreground text-sm uppercase font-black tracking-widest">All plans include the Multi-Agent Canvas & CRM</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <div 
              key={i} 
              className={`p-10 rounded-[3rem] transition-all duration-500 relative flex flex-col justify-between ${plan.popular ? 'bg-primary shadow-[0_0_100px_rgba(59,130,246,0.15)] border-none scale-105 z-10' : 'bg-neutral-900/50 border border-white/5 hover:border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-white text-[10px] font-black text-black uppercase tracking-widest shadow-2xl">
                   Most Recommended
                </div>
              )}
              
              <div className="space-y-8">
                 <div>
                    <h4 className={`text-2xl font-black mb-2 tracking-tight ${plan.popular ? 'text-black' : 'text-white'}`}>{plan.name}</h4>
                    <p className={`text-xs font-medium ${plan.popular ? 'text-black/60' : 'text-muted-foreground'}`}>{plan.description}</p>
                 </div>

                 <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-black tracking-tighter ${plan.popular ? 'text-black' : 'text-white'}`}>{plan.price}</span>
                    <span className={`text-sm font-bold tracking-widest ${plan.popular ? 'text-black/40' : 'text-muted-foreground'}`}>/ MO</span>
                 </div>

                 <div className={`h-px w-full ${plan.popular ? 'bg-black/10' : 'bg-white/5'}`} />

                 <ul className="space-y-5">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3">
                         <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-black/10' : 'bg-primary/10'}`}>
                            <CheckCircle2 className={`w-3.5 h-3.5 ${plan.popular ? 'text-black' : 'text-primary'}`} />
                         </div>
                         <span className={`text-xs font-bold uppercase tracking-tight ${plan.popular ? 'text-black/80' : 'text-neutral-300'}`}>{feature}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              <Button className={`w-full h-14 rounded-2xl mt-12 font-black transition-all hover:scale-105 active:scale-95 ${plan.popular ? 'bg-black text-white hover:bg-black/90' : 'bg-white text-black hover:bg-white/90'}`}>
                 {plan.buttonText}
                 <ArrowUpRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
