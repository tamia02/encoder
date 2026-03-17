"use client";

import { Button } from "@/components/ui/button";
import { 
  PhoneCall, 
  MessageSquare, 
  Zap, 
  Bot, 
  Calendar, 
  Globe, 
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <main className="min-h-screen selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">Encoder</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#solutions" className="hover:text-primary transition-colors">Solutions</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-sm">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="px-5">Get Started</Button>
              </SignUpButton>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-sm">Dashboard</Button>
              </Link>
              <UserButton />
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span>Introducing V2.0</span>
          <div className="w-1 h-1 rounded-full bg-primary" />
          <span className="text-primary/70">Better Latency, More Languages</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Supercharge Your Business with <br />
          <span className="gradient-text">Human-Like AI Agents</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          The ultimate platform for AI voice markers, appointment schedulers, and multi-channel customer support. Scale your agency with white-label solutions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold group">
            Apply Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold group">
            Watch Demo <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform opacity-50" />
          </Button>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative animate-in zoom-in-95 duration-1000 delay-700">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl opacity-30 -z-10" />
          <div className="glass rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <div className="aspect-video bg-neutral-900/50 flex items-center justify-center border-b border-white/5 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                       <span className="text-xs font-mono">LIVE CALL IN PROGRESS</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">02:45</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 w-full bg-white/5 rounded" />
                    <div className="h-6 w-4/5 bg-white/5 rounded" />
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs font-semibold">Lead Qualified</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-2/3 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-neutral-900/80 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Encoder Dashboard Preview</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Platform Capabilities</h2>
          <p className="text-muted-foreground">Everything you need to automate your communications stack</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <PhoneCall className="w-6 h-6 text-primary" />,
              title: "AI Voice Agents",
              desc: "Handle inbound and outbound calls with <500ms latency. Realistic ElevenLabs voices included."
            },
            {
              icon: <MessageSquare className="w-6 h-6 text-primary" />,
              title: "Multi-Channel Bots",
              desc: "Deploy the same AI across WhatsApp, Instagram, Messenger, SMS, and your website."
            },
            {
              icon: <Zap className="w-6 h-6 text-primary" />,
              title: "Real-Time Intelligence",
              desc: "Deep intent detection, sentiment analysis, and emotional tone adaptation in real-time."
            },
            {
              icon: <Calendar className="w-6 h-6 text-primary" />,
              title: "Auto-Scheduling",
              desc: "AI that books appointments directly into your calendar without human intervention."
            },
            {
              icon: <Globe className="w-6 h-6 text-primary" />,
              title: "50+ Languages",
              desc: "Speak with your customers in their native language across the entire globe."
            },
            {
              icon: <Bot className="w-6 h-6 text-primary" />,
              title: "White-Label Agency",
              desc: "Full resell capabilities with your domain, branding, and own client dashboards."
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-neutral-900/30 border border-white/5 hover:border-primary/20 transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 text-center text-sm text-muted-foreground">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-bold text-foreground">Encoder</span>
        </div>
        <p>© 2026 Encoder Inc. All rights reserved.</p>
        <div className="mt-4 flex items-center justify-center gap-6">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
      </footer>
    </main>
  );
}
