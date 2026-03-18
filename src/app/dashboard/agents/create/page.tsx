"use client";

import { useState, useTransition } from "react";
import * as React from "react";
import { 
  Bot, 
  Settings, 
  MessageSquare, 
  Volume2, 
  Database, 
  History, 
  BarChart3, 
  Users, 
  Layers, 
  Zap,
  Save,
  Play,
  Languages,
  Thermometer,
  Trophy,
  Cpu,
  Shield,
  Eye,
  Plus,
  Loader2,
  AlertCircle,
  ChevronDown,
  Search,
  Share2,
  CheckCircle,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  Phone,
  Terminal,
  Globe,
  Palette,
  BarChart,
  CheckCircle2,
  Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { createAgent } from "../actions";

const STEPS = [
  { id: 1, title: "Identity", desc: "Basic Info", icon: <Shield className="w-4 h-4" /> },
  { id: 2, title: "Instructions", desc: "AI Behavior", icon: <MessageSquare className="w-4 h-4" /> },
  { id: 3, title: "Knowledge", desc: "Data Training", icon: <Database className="w-4 h-4" /> },
  { id: 4, title: "Voice", desc: "Modality", icon: <Volume2 className="w-4 h-4" /> },
  { id: 5, title: "Tools", desc: "Integrations", icon: <Zap className="w-4 h-4" /> },
  { id: 6, title: "Widget", desc: "Deployment", icon: <Palette className="w-4 h-4" /> },
];

export default function AgentBuilderPage() {
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState(0); // 0 = Template Selection
  const [crawlUrl, setCrawlUrl] = useState("");
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawledPages, setCrawledPages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    systemPrompt: "",
    textScript: "",
    voiceScript: "",
    activeScriptTab: "text",
    voiceId: "alloy",
    voiceProvider: "OpenAI",
    knowledgeEnabled: false,
    maxRetrieve: 3,
    temperature: 0.7,
    primaryColor: "#0066FF",
    greeting: "Hello! How can I help you today?",
    whoStarts: "user", // "user" or "ai"
    aiGreeting: "Hello! I am your AI assistant. How can I help you?",
    language: "en",
  });

  const TEMPLATES = [
    { 
      id: "blank", 
      title: "Blank Agent", 
      desc: "Start from scratch with a clean slate.", 
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-neutral-100 text-neutral-600"
    },
    { 
      id: "sales", 
      title: "Sales Pro", 
      desc: "Optimized for lead qualification and booking.", 
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-600",
      data: { name: "Sales Agent", role: "SDR / Lead Qualification", systemPrompt: "You are a professional sales agent..." }
    },
    { 
      id: "support", 
      title: "Support Bot", 
      desc: "Expert at handling FAQs and troubleshooting.", 
      icon: <Shield className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
      data: { name: "Support Agent", role: "Customer Success", systemPrompt: "You are a helpful support agent..." }
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template && template.data) {
      setFormData(prev => ({ ...prev, ...template.data }));
    }
    setCurrentStep(1);
  };

  const handleCrawl = () => {
    if (!crawlUrl) return;
    setIsCrawling(true);
    setCrawledPages([]);
    
    // Simulate crawling
    setTimeout(() => {
      setCrawledPages(["/index", "/pricing", "/features", "/docs/api", "/docs/setup"]);
      setIsCrawling(false);
    }, 2500);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSave = () => {
    startTransition(async () => {
      try {
        await createAgent(formData);
      } catch (error) {
        console.error("Failed to create agent:", error);
      }
    });
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Premium Header/Progress */}
      <div className="flex flex-col space-y-8 mb-12 border-b border-neutral-200 pb-10">
        <div className="flex items-center justify-between">
          <div>
             <Badge className="bg-primary/10 text-primary border-primary/20 rounded-lg py-1 px-3 mb-4 font-black tracking-widest text-[10px] uppercase">
                Creator Wizard v2.0
             </Badge>
             <h2 className="text-4xl font-black tracking-tight text-neutral-900 uppercase">Create AI Agent</h2>
             <p className="text-neutral-500 mt-2 font-black italic underline decoration-primary/30">
               {currentStep > 0 ? `Step ${currentStep}: ${STEPS[currentStep-1].title} — ${STEPS[currentStep-1].desc}` : "Selecting Template"}
             </p>
          </div>
          <div className="flex items-center gap-4">
             {currentStep > 0 && (
               <Button variant="outline" className="h-12 rounded-xl px-6 border-neutral-200 hover:bg-neutral-50 font-black uppercase text-[10px] tracking-widest text-neutral-600" onClick={() => setCurrentStep(1)}>
                  Reset
               </Button>
             )}
             <Button 
               className="h-12 rounded-xl px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest gap-3 shadow-2xl shadow-primary/20"
               onClick={currentStep === 6 ? handleSave : nextStep}
               disabled={isPending || currentStep === 0 || (currentStep === 1 && !formData.name)}
             >
                {isPending ? (
                   <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                   currentStep === 6 ? <CheckCircle2 className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                )}
                {isPending ? "FINALIZING..." : currentStep === 6 ? "SAVE AGENT" : "CONTINUE"}
             </Button>
          </div>
        </div>

        <div className="relative pt-4">
           <Progress value={progress} className="h-1.5 bg-neutral-100" />
           <div className="flex justify-between mt-8">
              {STEPS.map((step) => (
                 <div 
                   key={step.id} 
                   className={`flex flex-col items-center gap-4 transition-all duration-500 ${currentStep >= step.id ? "opacity-100" : "opacity-30"}`}
                 >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 text-[11px] font-black transition-all ${currentStep >= step.id ? "border-primary bg-primary text-white shadow-xl shadow-primary/20 scale-110" : "border-neutral-200 bg-white text-neutral-400"}`}>
                       {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                    </div>
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">{step.title}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          {currentStep === 0 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <h3 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">Choose Your Foundation</h3>
                  <p className="text-neutral-500 font-medium">Select a pre-configured template to accelerate your deployment or start with a custom architecture.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TEMPLATES.map((tpl) => (
                    <div 
                      key={tpl.id}
                      onClick={() => handleTemplateSelect(tpl.id)}
                      className="p-10 rounded-[3rem] bg-white border border-neutral-200 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all cursor-pointer group flex flex-col items-center text-center space-y-6"
                    >
                       <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center ${tpl.color} group-hover:scale-110 transition-transform`}>
                          {tpl.icon}
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-lg font-black text-neutral-900 uppercase tracking-tight">{tpl.title}</h4>
                          <p className="text-xs text-neutral-400 font-bold leading-relaxed px-4">{tpl.desc}</p>
                       </div>
                       <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                          Select Template <ChevronRight className="w-3 h-3" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {currentStep > 0 && (
            <div className="bg-white border border-neutral-200 rounded-[3rem] p-12 shadow-2xl animate-in zoom-in-95 duration-500">
            
            {/* Step 1: Identity */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                   <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Identity & Role</h3>
                   <p className="text-sm text-neutral-500 font-medium">Define your agent's persona and core expertise.</p>
                </div>
                <div className="grid gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Agent Name</label>
                    <Input 
                      placeholder="e.g. Sarah from Resonance" 
                      className="bg-neutral-50 border-neutral-200 h-16 rounded-2xl text-base font-bold focus:bg-white focus:border-primary/50 transition-all font-sans" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Domain / Expertise</label>
                    <Input 
                      placeholder="e.g. Real Estate Concierge" 
                      className="bg-neutral-50 border-neutral-200 h-16 rounded-2xl text-base font-bold focus:bg-white focus:border-primary/50 transition-all font-sans" 
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Language</label>
                      <div className="relative group">
                         <select 
                           className="w-full bg-neutral-50 border border-neutral-200 h-16 rounded-2xl text-base font-bold focus:bg-white focus:border-primary/50 transition-all outline-none px-6 appearance-none cursor-pointer"
                           value={formData.language}
                           onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                         >
                            <option value="en">English (US)</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="ar">Arabic</option>
                         </select>
                         <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                            <Languages className="w-5 h-5" />
                         </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Status</label>
                      <div className="h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center px-6 gap-3">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Orchestrator Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-10 rounded-[2rem] bg-indigo-50 border border-indigo-100 space-y-8 mt-12">
                   <div className="flex items-center justify-between">
                      <div className="space-y-1">
                         <h4 className="font-black text-indigo-900 uppercase tracking-tighter text-sm">Conversation Logic</h4>
                         <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Who initiates the interaction?</p>
                      </div>
                      <div className="flex bg-white/50 p-1 rounded-xl border border-indigo-200">
                         <button 
                           onClick={() => setFormData({ ...formData, whoStarts: "user" })}
                           className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${formData.whoStarts === "user" ? "bg-indigo-600 text-white shadow-lg" : "text-indigo-400 hover:text-indigo-600"}`}
                         >
                            User Starts
                         </button>
                         <button 
                           onClick={() => setFormData({ ...formData, whoStarts: "ai" })}
                           className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${formData.whoStarts === "ai" ? "bg-indigo-600 text-white shadow-lg" : "text-indigo-400 hover:text-indigo-600"}`}
                         >
                            AI Starts
                         </button>
                      </div>
                   </div>

                   {formData.whoStarts === "ai" && (
                      <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                         <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">AI Greeting Field</label>
                         <Input 
                           placeholder="e.g. Hello! I noticed you were looking at..." 
                           className="bg-white border-indigo-200 h-14 rounded-2xl text-sm font-bold focus:border-indigo-500 transition-all font-sans" 
                           value={formData.aiGreeting}
                           onChange={(e) => setFormData({ ...formData, aiGreeting: e.target.value })}
                         />
                      </div>
                   )}
                </div>
              </div>
            )}

            {/* Step 2: Instructions */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center">
                   <div className="space-y-2">
                      <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">System Prompt</h3>
                      <p className="text-sm text-neutral-500 font-medium">Program the intelligence of your AI orchestrator.</p>
                   </div>
                   <Button variant="outline" size="sm" className="rounded-xl border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 text-[10px] font-black uppercase tracking-widest gap-2">
                      <Wand2 className="w-3.5 h-3.5" /> RE-WRITE PROMPT
                   </Button>
                </div>
                <div className="flex items-center justify-between mb-8">
                   <div className="p-1 bg-neutral-100 rounded-xl flex items-center gap-1">
                      <button 
                        onClick={() => setFormData({ ...formData, activeScriptTab: "text" })}
                        className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-2 ${formData.activeScriptTab === "text" ? "bg-white text-primary shadow-sm" : "text-neutral-500 hover:text-neutral-900"}`}
                      >
                         <Bot className="w-4 h-4" /> Text
                      </button>
                      <button 
                        onClick={() => setFormData({ ...formData, activeScriptTab: "voice" })}
                        className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-2 ${formData.activeScriptTab === "voice" ? "bg-white text-primary shadow-sm" : "text-neutral-500 hover:text-neutral-900"}`}
                      >
                         <Volume2 className="w-4 h-4" /> Voice
                      </button>
                   </div>
                   <Button variant="outline" size="sm" className="rounded-xl border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 text-[10px] font-black uppercase tracking-widest gap-2">
                      <Wand2 className="w-3.5 h-3.5" /> AI RE-WRITE
                   </Button>
                </div>

                <div className="relative group">
                   <textarea 
                     className="w-full min-h-[450px] bg-neutral-50 border border-neutral-200 rounded-[2.5rem] p-10 text-sm leading-relaxed focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-mono text-neutral-800 placeholder:text-neutral-300"
                     placeholder={formData.activeScriptTab === "text" ? "# TEXT SYSTEM PROMPT\n\nYou are a premium AI agent..." : "# VOICE SYSTEM PROMPT (OPTIONAL)\n\nEnter specific instructions for vocal synthesis engine..."}
                     value={formData.activeScriptTab === "text" ? formData.systemPrompt : formData.voiceScript}
                     onChange={(e) => setFormData({ ...formData, [formData.activeScriptTab === "text" ? "systemPrompt" : "voiceScript"]: e.target.value })}
                   />
                   <div className="absolute bottom-6 right-8 opacity-40 group-hover:opacity-100 transition-opacity">
                      <Terminal className="w-5 h-5 text-neutral-500" />
                   </div>
                </div>
              </div>
            )}

            {/* Step 3: Knowledge Base */}
            {currentStep === 3 && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                   <div className="space-y-2">
                      <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Knowledge Ingestion</h3>
                      <p className="text-sm text-neutral-500 font-medium">Feed proprietary data into the agent's RAG memory.</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <Switch 
                        checked={formData.knowledgeEnabled}
                        onCheckedChange={(val: boolean) => setFormData({ ...formData, knowledgeEnabled: val })}
                      />
                      <span className="text-[10px] font-black uppercase text-neutral-500">Sync with RAG</span>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-10 rounded-[3rem] bg-neutral-50 border border-neutral-200 flex flex-col items-center justify-center text-center space-y-6 hover:bg-white transition-all cursor-pointer group hover:shadow-xl hover:border-primary/20">
                      <div className="w-16 h-16 rounded-[2rem] bg-white border border-neutral-200 flex items-center justify-center text-neutral-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm group-hover:shadow-primary/20">
                         <Plus className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight">Upload Docs</h4>
                         <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">PDF, TXT (Max 250MB)</p>
                      </div>
                   </div>

                    <div className="p-10 rounded-[3rem] bg-neutral-50 border border-neutral-200 space-y-8 flex flex-col justify-center relative overflow-hidden">
                       {isCrawling && (
                         <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <div className="text-center">
                               <p className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">Crawling Domain...</p>
                               <p className="text-[9px] text-neutral-400 font-bold mt-1 uppercase">Fetching pages & indexing content</p>
                            </div>
                            <div className="w-48 h-1 bg-neutral-100 rounded-full overflow-hidden mt-2">
                               <div className="h-full bg-primary animate-progress-fast" />
                            </div>
                         </div>
                       )}
                       <div className="flex items-center justify-between px-2">
                          <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Web Scraper / Crawler</h4>
                          <Badge className="bg-blue-500/10 text-blue-600 border-0 rounded-lg text-[9px] font-black tracking-tight">PREMIUM ENGINE</Badge>
                       </div>
                       <div className="flex gap-3">
                          <Input 
                            placeholder="https://resonance.ai/docs" 
                            className="h-14 rounded-2xl bg-white border-neutral-200 text-sm font-bold ring-0 focus-visible:ring-0"
                            value={crawlUrl}
                            onChange={(e) => setCrawlUrl(e.target.value)}
                          />
                          <Button 
                            onClick={handleCrawl}
                            disabled={isCrawling || !crawlUrl}
                            className="h-14 px-8 rounded-2xl bg-neutral-900 text-white font-black text-[10px] tracking-widest uppercase hover:bg-black relative overflow-hidden group"
                          >
                             <span className="relative z-10">{isCrawling ? "CRAWLING..." : "START CRAWL"}</span>
                          </Button>
                       </div>
                       {crawledPages.length > 0 && (
                         <div className="space-y-3 mt-4 animate-in slide-in-from-top-2 duration-500">
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest px-2">Discovered Pages ({crawledPages.length})</p>
                            <div className="grid grid-cols-2 gap-2">
                               {crawledPages.map((page, i) => (
                                 <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-neutral-100 text-[9px] font-bold text-neutral-600">
                                    <CheckCircle2 className="w-3 h-3 text-green-500" /> {page}
                                 </div>
                               ))}
                            </div>
                         </div>
                       )}
                    </div>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 space-y-10 shadow-inner">
                   <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <BarChart className="w-4 h-4 text-primary" />
                            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Retrieval Density (Top-K)</span>
                         </div>
                         <span className="text-xs font-black text-primary uppercase">{formData.maxRetrieve} Blocks</span>
                      </div>
                      <Slider 
                        value={[formData.maxRetrieve]} 
                        max={10} 
                        step={1} 
                        onValueChange={(val: number[]) => setFormData({ ...formData, maxRetrieve: val[0] })}
                      />
                   </div>
                </div>
              </div>
            )}

            {/* Step 4: Voice */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                   <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Modality & Voice</h3>
                   <p className="text-sm text-neutral-500 font-medium">Select the voice synthesis engine for human-like interaction.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "Alloy", provider: "OpenAI", type: "Neutral", gender: "F" },
                    { name: "Echo", provider: "OpenAI", type: "Commanding", gender: "M" },
                    { name: "Sarah", provider: "ElevenLabs", type: "Professional", gender: "F" },
                    { name: "James", provider: "Vapi", type: "Natural", gender: "M" },
                    { name: "Ally", provider: "Deepgram", type: "Low Latency", gender: "F" },
                    { name: "Custom", provider: "External", type: "Cloned", gender: "DNA" }
                  ].map((voice) => (
                    <div 
                      key={voice.name} 
                      onClick={() => setFormData({ ...formData, voiceId: voice.name.toLowerCase(), voiceProvider: voice.provider })}
                      className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer space-y-4 group relative overflow-hidden ${
                        formData.voiceId === voice.name.toLowerCase() 
                          ? "border-primary bg-blue-50/50 shadow-2xl shadow-primary/10" 
                          : "border-neutral-100 bg-neutral-50 hover:bg-white hover:border-neutral-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                           formData.voiceId === voice.name.toLowerCase() ? "bg-primary text-white" : "bg-white text-neutral-400 shadow-sm group-hover:scale-110"
                         }`}>
                           <Volume2 className="w-5 h-5" />
                         </div>
                         {formData.voiceId === voice.name.toLowerCase() && (
                            <div className="bg-primary text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg animate-in zoom-in-50">ACTIVE</div>
                         )}
                      </div>
                      <div>
                        <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{voice.name}</p>
                        <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-1">{voice.provider} • {voice.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Tools & Integrations */}
            {currentStep === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                   <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Functional Integration</h3>
                   <p className="text-sm text-neutral-500 font-medium">Connect external APIs to enable real-world actions.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[
                     { name: "HubSpot", category: "CRM Sync", color: "text-orange-500", icon: <Globe className="w-5 h-5" /> },
                     { name: "Stripe", category: "Payment Terminal", color: "text-blue-500", icon: <Plus className="w-5 h-5" /> },
                     { name: "Make.com", category: "Workflow Automation", color: "text-purple-500", icon: <Zap className="w-5 h-5" /> },
                     { name: "Webhooks", category: "Native POST Triggers", color: "text-green-500", icon: <Terminal className="w-5 h-5" /> },
                   ].map((tool, idx) => (
                     <div key={idx} className="p-8 rounded-[3rem] bg-neutral-50 border border-neutral-200 flex items-center justify-between group hover:bg-white hover:border-primary/20 transition-all opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:shadow-xl">
                        <div className="flex items-center gap-6">
                           <div className={`w-14 h-14 rounded-[1.5rem] bg-white border border-neutral-100 flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform shadow-sm`}>
                              {tool.icon}
                           </div>
                           <div>
                              <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{tool.name}</p>
                              <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-1">{tool.category}</p>
                           </div>
                        </div>
                        <Button variant="outline" className="rounded-xl h-10 border-neutral-200 text-[9px] font-black tracking-widest uppercase text-neutral-400 group-hover:border-primary group-hover:text-primary transition-colors">ENABLE</Button>
                     </div>
                   ))}
                </div>
                <div className="p-10 rounded-[2.5rem] border border-neutral-200 border-dashed flex flex-col items-center justify-center text-center space-y-4 bg-neutral-50/50">
                   <AlertCircle className="w-8 h-8 text-neutral-300" />
                   <div className="space-y-1">
                      <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Custom SDK Tunnel</h4>
                      <p className="text-[9px] text-neutral-300 font-black uppercase tracking-widest">Enterprise API endpoint integration</p>
                   </div>
                   <Button variant="link" className="text-primary font-black text-[10px] uppercase tracking-widest">Read Documentation</Button>
                </div>
              </div>
            )}

            {/* Step 6: Widget & Deployment */}
            {currentStep === 6 && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                   <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Widget Branding</h3>
                   <p className="text-sm text-neutral-500 font-medium">Finalize the visual aesthetics for web deployment.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-8">
                       <div className="space-y-3">
                         <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Default Platform Greeting</label>
                         <Input 
                           placeholder="e.g. Hi there! How can I assist you?" 
                           className="bg-neutral-50 border-neutral-200 h-16 rounded-2xl text-base font-bold focus:bg-white transition-all font-sans" 
                           value={formData.whoStarts === "ai" ? formData.aiGreeting : formData.greeting}
                           onChange={(e) => setFormData({ ...formData, [formData.whoStarts === "ai" ? "aiGreeting" : "greeting"]: e.target.value })}
                         />
                       </div>
                      <div className="space-y-6">
                         <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Primary Brand Color</h4>
                         <div className="grid grid-cols-5 gap-4">
                            {["#0066FF", "#7C3AED", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                               <div 
                                 key={color}
                                 onClick={() => setFormData({ ...formData, primaryColor: color })}
                                 className={`w-full aspect-square rounded-2xl cursor-pointer transition-all ${formData.primaryColor === color ? 'ring-4 ring-primary ring-offset-4 ring-offset-white scale-110 shadow-xl' : 'hover:scale-105 opacity-60'}`}
                                 style={{ backgroundColor: color }}
                               />
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="p-10 rounded-[4rem] bg-neutral-50 border border-neutral-200 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div 
                        className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl transition-all group-hover:scale-110"
                        style={{ backgroundColor: formData.primaryColor }}
                      >
                         <Bot className="w-12 h-12" />
                      </div>
                      <div className="space-y-2 z-10">
                         <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight">{formData.name || "Preview Identity"}</h4>
                         <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">Active Orchestrator</p>
                      </div>
                      <div className="max-w-[200px] p-6 rounded-[2rem] bg-white border border-neutral-100 shadow-sm text-xs text-neutral-600 font-bold italic z-10">
                         "{formData.greeting}"
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="mt-20 pt-10 border-t border-neutral-100 flex items-center justify-between">
               <Button 
                 variant="ghost" 
                 onClick={prevStep}
                 disabled={currentStep === 1 || isPending}
                 className="h-14 px-8 rounded-2xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 font-black uppercase text-[10px] tracking-[0.2em] gap-3"
               >
                  <ChevronLeft className="w-4 h-4" /> BACK
               </Button>
               <div className="flex items-center gap-8">
                  <div className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">
                     Step {currentStep} of 6
                  </div>
                  <Button 
                    className="h-14 rounded-2xl px-12 bg-black hover:bg-neutral-900 text-white font-black uppercase text-xs tracking-widest gap-3 shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95"
                    onClick={currentStep === 6 ? handleSave : nextStep}
                    disabled={isPending || (currentStep === 1 && !formData.name)}
                  >
                     {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                     ) : (
                        currentStep === 6 ? <CheckCircle2 className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                     )}
                     {isPending ? "FINALIZING..." : currentStep === 6 ? "SAVE AGENT" : "CONTINUE"}
                  </Button>
               </div>
            </div>

          </div>
        )}
        </div>

        {/* Right Help Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-10 rounded-[3rem] bg-neutral-50 border border-neutral-200 space-y-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                 <Wand2 className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">Builder Intelligence</h3>
                 <p className="text-xs text-neutral-500 font-bold leading-relaxed">
                    You are in the **High-Fidelity Agent Builder**. This interface is synchronized with the Resonance orchestration engine.
                 </p>
                 <div className="space-y-3 pt-6 border-t border-neutral-200">
                    <div className="flex items-center gap-3 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                       <Shield className="w-3.5 h-3.5 text-green-500" /> Identity Persistence
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                       <Zap className="w-3.5 h-3.5 text-blue-500" /> Latency Optimized
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                       <Database className="w-3.5 h-3.5 text-purple-500" /> Vector Synced
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-10 rounded-[3rem] bg-indigo-600 shadow-2xl shadow-indigo-600/20 text-white space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest">Need Expert Help?</h4>
              <p className="text-xs font-semibold leading-relaxed opacity-80">
                 Our specialized deployment squad can help you wire up complex Enterprise APIs and 3rd party CRMs.
              </p>
              <Button className="w-full h-12 rounded-xl bg-white text-indigo-600 hover:bg-neutral-100 font-black text-[10px] tracking-widest uppercase">
                 TALK TO AN EXPERT
              </Button>
           </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #FFFFFF;
        }
        ::placeholder {
           color: #D1D5DB;
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress-fast {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
