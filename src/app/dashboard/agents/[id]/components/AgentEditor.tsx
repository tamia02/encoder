"use client";

import { useState, useTransition, ChangeEvent, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { updateAgent } from "../../actions";

const TABS = [
  { id: "prompt", label: "Prompt", icon: Bot },
  { id: "voice", label: "Voice", icon: Volume2 },
  { id: "widget", label: "Widget", icon: Layers },
  { id: "knowledge", label: "Knowledge", icon: Database },
  { id: "chats", label: "Chats", icon: History },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "leads", label: "Leads", icon: Users },
  { id: "channels", label: "Channels", icon: MessageSquare },
  { id: "simulator", label: "Simulator", icon: Eye },
  { id: "settings", label: "Settings", icon: Settings },
];

interface AgentEditorProps {
  agent: {
    id: string;
    name: string;
    mode: string;
    whoStarts: string;
    language: string;
    greeting: string | null;
    systemPrompt: string | null;
    voiceScript: string | null;
    model: string;
    temperature: number;
    leadScoringEnabled: boolean;
    fillersEnabled: boolean;
    knowledgeEnabled: boolean;
    maxRetrieve: number;
    kbFilterTags: string | null;
    uiEngineFormsEnabled: boolean;
    uiEngineLayoutsEnabled: boolean;
    canvasEnabled: boolean;
    fallbacks: string | null;
    [key: string]: any;
  };
}
export default function AgentEditor({ agent: initialAgent }: AgentEditorProps) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "prompt";
  
  const [agent, setAgent] = useState(initialAgent);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeScriptTab, setActiveScriptTab] = useState<"text" | "voice">("text");
  const [isPending, startTransition] = useTransition();
  const [showTest, setShowTest] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, analytics?: any }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMsg = { role: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Dynamic mock response based on agent's personality
    setTimeout(() => {
      let response = "";
      const lowerInput = inputValue.toLowerCase();
      
      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        response = agent.greeting || "Hello! I'm your AI assistant. How can I help you today?";
      } else if (lowerInput.includes("who are you") || lowerInput.includes("identity")) {
        response = `I am ${agent.name}, an autonomous agent powered by the ${agent.model} engine. My purpose is: ${agent.systemPrompt?.slice(0, 100)}...`;
      } else if (lowerInput.includes("help")) {
        response = "I can assist you with various tasks based on my configuration. What specifically do you need help with?";
      } else {
        response = `[SIMULATED ${agent.model} RESPONSE] Based on my system prompt ("${agent.systemPrompt?.slice(0, 50)}..."), I would process your request: "${inputValue}". I am currently in ${agent.mode} mode with a temperature of ${agent.temperature}.`;
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        analytics: {
          latency: "450ms",
          tokens: Math.floor(Math.random() * 50) + 10,
          confidence: 0.98,
          noise_floor: "-54dB"
        }
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const handleUpdate = (updates: Partial<typeof initialAgent>) => {
    setAgent((prev: any) => ({ ...prev, ...updates }));
    if (saveStatus === "success") setSaveStatus("idle");
  };

  const onSave = () => {
    setSaveStatus("saving");
    startTransition(async () => {
      const res = await updateAgent(agent.id, agent);
      if (res.success) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white text-neutral-900 animate-in fade-in duration-1000 overflow-hidden font-sans">
      
      {/* Platform Header */}
      <header className="h-20 border-b border-neutral-100 bg-white/80 backdrop-blur-xl flex items-center justify-between px-10 z-40 sticky top-0">
        <div className="flex items-center gap-6">
           {/* Agent Selector */}
           <div className="flex items-center gap-4 px-5 py-2.5 rounded-[1.5rem] border border-neutral-100 bg-neutral-50/50 hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer group shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-neutral-400 font-black uppercase tracking-widest leading-none mb-1">Active Neural Node</span>
                <span className="text-sm font-black text-neutral-900 uppercase tracking-tight">{agent.name}</span>
              </div>
              <ChevronDown className="w-5 h-5 text-neutral-300 group-hover:text-primary transition-colors ml-4" />
           </div>
        </div>

        <div className="flex items-center gap-6">
           {/* Search Bar */}
           <div className="relative group lg:w-80 hidden lg:block">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
              <Input 
                 placeholder="Search neural parameters..." 
                 className="h-12 pl-12 pr-6 rounded-2xl border-none bg-neutral-50/50 focus:bg-white text-[11px] font-black uppercase tracking-widest transition-all outline-none ring-0 focus-visible:ring-4 focus-visible:ring-primary/5 shadow-inner"
              />
           </div>

           <div className="w-px h-8 bg-neutral-100 mx-2" />

            <Button 
             className={`h-12 px-8 rounded-2xl font-black text-[10px] tracking-[0.2em] gap-3 shadow-2xl transition-all hover:scale-105 active:scale-95 uppercase ${
               saveStatus === "success" ? "bg-green-500 hover:bg-green-600 text-white shadow-green-200" :
               saveStatus === "error" ? "bg-red-500 hover:bg-red-600 text-white shadow-red-200" :
               "bg-black text-white hover:bg-neutral-900 shadow-black/10"
             }`}
             onClick={onSave}
             disabled={saveStatus === "saving"}
            >
               {saveStatus === "saving" ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                saveStatus === "success" ? <CheckCircle className="w-4 h-4" /> : 
                saveStatus === "error" ? <AlertCircle className="w-4 h-4" /> : 
                <Save className="w-4 h-4 text-primary" />}
               {saveStatus === "saving" ? "Synchronizing..." : 
                saveStatus === "success" ? "Synchronized" : 
                saveStatus === "error" ? "Sync Failed" : 
                "Synchronize"}
            </Button>

           <Button className="h-12 px-8 rounded-2xl border border-neutral-100 bg-white hover:bg-neutral-50 text-neutral-900 font-black text-[10px] tracking-[0.2em] gap-3 shadow-sm transition-all hover:scale-105 active:scale-95 uppercase" onClick={() => setActiveTab("simulator")}>
              <Play className="w-4 h-4 text-primary fill-primary/10" />
              Test Core
           </Button>

           <Button 
            className="h-12 px-8 rounded-2xl border border-neutral-100 bg-white hover:bg-neutral-50 text-neutral-900 font-black text-[10px] tracking-[0.2em] gap-3 shadow-sm transition-all hover:scale-105 active:scale-95 uppercase"
            onClick={() => setActiveTab("widget")}
           >
              <Share2 className="w-4 h-4" />
              Broadcast
           </Button>
        </div>
      </header>

      {/* Navigation Tabs (Horizontal) */}
      <nav className="h-16 border-b border-neutral-50 bg-white flex items-center px-10 gap-2 overflow-x-auto no-scrollbar scroll-smooth sticky top-20 z-30 shadow-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 h-full text-[10px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap group ${
              activeTab === tab.id
                ? "text-primary"
                : "text-neutral-400 hover:text-neutral-900"
            }`}
          >
            <tab.icon className={`w-4 h-4 transition-transform duration-500 group-hover:scale-110 ${activeTab === tab.id ? "text-primary scale-110" : "text-neutral-300"}`} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-4 right-4 h-1 bg-primary rounded-t-full shadow-[0_-4px_12px_rgba(0,102,255,0.4)]" />
            )}
          </button>
        ))}
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Workspace */}
        <main className="flex-1 overflow-y-auto bg-white custom-scrollbar pb-32">
           <div className="max-w-7xl mx-auto p-8">
             
             {activeTab === "prompt" && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
                   
                   {/* Instructions Card */}
                   <div className="bg-white rounded-[2rem] border border-neutral-200 shadow-sm overflow-hidden">
                      <div className="p-8 border-b border-neutral-100 flex items-center justify-between group bg-neutral-50/30">
                         <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-[1.25rem] bg-white border border-neutral-100 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-500">
                               <Bot className="w-6 h-6" />
                            </div>
                            <div>
                               <h3 className="text-sm font-black text-neutral-900 uppercase tracking-[0.1em]">Neural Directives</h3>
                               <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Primary instruction set Cluster</p>
                            </div>
                         </div>
                         <ChevronDown className="w-5 h-5 text-neutral-300 group-hover:text-primary transition-colors" />
                      </div>

                      <div className="p-8 space-y-10">
                         {/* Initiator Section */}
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                               <h4 className="text-[13px] font-black text-neutral-900 uppercase tracking-tight">Sequence Initialization</h4>
                               <div className="flex items-center justify-between p-8 rounded-[2rem] bg-neutral-50/50 border border-neutral-100 shadow-inner group/initiator hover:bg-white transition-all duration-700">
                                  <div className="space-y-2">
                                     <p className="text-[11px] font-black text-neutral-900 uppercase tracking-widest">Client Initiated</p>
                                     <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Passive Mode Cluster</p>
                                  </div>
                                  <Switch 
                                     checked={agent.whoStarts === 'USER'}
                                     onCheckedChange={(val: boolean) => handleUpdate({ whoStarts: val ? 'USER' : 'AI' })}
                                     className="data-[state=checked]:bg-primary shadow-xl shadow-primary/20 scale-110"
                                  />
                               </div>
                               <p className="text-[10px] text-neutral-400 font-bold leading-relaxed uppercase tracking-widest opacity-80 pl-2 border-l-2 border-primary/20 italic">
                                  Define the neural trigger for conversation onset. If set to passive, the agent awaits a client signal.
                               </p>
                            </div>

                            <div className="space-y-6">
                               <h4 className="text-[13px] font-black text-neutral-900 uppercase tracking-tight">System Salutation</h4>
                               <div className="relative group">
                                  <Textarea 
                                     value={agent.greeting || ""}
                                     onChange={(e) => handleUpdate({ greeting: e.target.value })}
                                     placeholder="ENTER NEURAL GREETING (OPTIONAL)"
                                     className="h-[120px] rounded-[2rem] bg-neutral-50/50 border-none text-[11px] font-black uppercase tracking-[0.2em] p-8 ring-0 focus-visible:ring-4 focus-visible:ring-primary/5 focus:bg-white transition-all resize-none shadow-inner"
                                  />
                               </div>
                               <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest opacity-80 pl-2 border-l-2 border-primary/20 italic">
                                  Synchronized when AI-Initiated mode is broadcast. System-generated if left Null.
                               </p>
                            </div>
                         </div>

                         {/* Language Selector */}
                         <div className="space-y-4">
                            <div className="p-6 rounded-3xl bg-white border border-neutral-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2">
                               <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Language</span>
                               </div>
                               <select 
                                  value={agent.language}
                                  onChange={(e) => handleUpdate({ language: e.target.value })}
                                  className="w-full bg-transparent text-sm font-bold text-neutral-900 outline-none appearance-none cursor-pointer"
                               >
                                  <option value="en-US">English</option>
                                  <option value="es-ES">Spanish</option>
                                  <option value="fr-FR">French</option>
                                  <option value="de-DE">German</option>
                               </select>
                            </div>
                            <p className="text-[10px] text-neutral-400 font-bold leading-relaxed">
                               Select the language for this node/agent. Runtime tool messages (e.g. One moment...) will follow this language.
                            </p>
                         </div>

                         {/* Base Instructions Section */}
                         <div className="space-y-4">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                  <MessageSquare className="w-4 h-4 text-blue-500" />
                                  <h4 className="text-[12px] font-black text-neutral-900">Base Instructions (Agent Script)</h4>
                               </div>
                               <div className="p-[3px] bg-neutral-100 rounded-lg flex items-center gap-1">
                                  <button 
                                     onClick={() => setActiveScriptTab("text")}
                                     className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tight transition-all flex items-center gap-2 ${activeScriptTab === "text" ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-800"}`}
                                  >
                                     <Bot className="w-3 h-3" /> Text
                                  </button>
                                  <button 
                                     onClick={() => setActiveScriptTab("voice")}
                                     className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tight transition-all flex items-center gap-2 ${activeScriptTab === "voice" ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-800"}`}
                                  >
                                     <Volume2 className="w-3 h-3" /> Voice
                                  </button>
                               </div>
                            </div>
                            <p className="text-[11px] text-neutral-500 font-bold mb-6">
                               This is the script for your AI agent. You can set separate Text and Voice scripts. If Voice is empty, the Text script is used for both text and voice.
                            </p>
                            
                            <div className="relative">
                               <Textarea 
                                  value={activeScriptTab === "text" ? (agent.textScript || "") : (agent.voiceScript || "")}
                                  onChange={(e) => handleUpdate({ [activeScriptTab === "text" ? "textScript" : "voiceScript"]: e.target.value })}
                                  placeholder={activeScriptTab === "text" ? "# **ENTER TEXT SYSTEM PROMPT**" : "# **ENTER VOICE SYSTEM PROMPT (OPTIONAL)**"}
                                  className="min-h-[400px] rounded-[2.5rem] bg-white border-neutral-200 text-sm leading-relaxed p-10 font-mono shadow-sm focus:border-blue-500/50 transition-all outline-none"
                               />
                               <div className="absolute bottom-6 right-8 text-[10px] font-black text-neutral-300 pointer-events-none">
                                  v1.0.4
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Footer Info */}
                   <div className="flex justify-between items-center text-[10px] text-neutral-400 font-bold uppercase tracking-widest px-4">
                      <span>Last edited by Admin</span>
                      <span className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                         Autosave enabled
                      </span>
                   </div>
                </div>
             )}

             {activeTab === "knowledge" && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-20">
                   <div className="flex items-center justify-between border-b border-neutral-200 pb-8">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <Database className="w-5 h-5" />
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Knowledge Base (RAG)</h3>
                            <p className="text-xs text-neutral-500 font-medium mt-1">Provide your agent with specialized context and proprietary data.</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <Switch 
                            checked={agent.knowledgeEnabled}
                            onCheckedChange={(val: boolean) => handleUpdate({ knowledgeEnabled: val })}
                         />
                         <span className="text-[10px] font-black uppercase text-neutral-400">Knowledge active</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      {/* Upload Section */}
                      <div className="lg:col-span-7 space-y-6">
                         <div className="p-10 rounded-[2.5rem] bg-white border border-neutral-200 border-dashed flex flex-col items-center justify-center text-center space-y-4 hover:bg-neutral-50/50 transition-all cursor-pointer group">
                            <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:scale-110 transition-all">
                               <Plus className="w-7 h-7" />
                            </div>
                            <div>
                               <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight">Upload Documents</h4>
                               <p className="text-[10px] text-neutral-500 font-bold mt-1">PDF, TXT, or CSV (Max 250MB per file)</p>
                            </div>
                         </div>

                         <div className="p-8 rounded-[2.5rem] bg-white border border-neutral-200 space-y-4">
                            <div className="flex items-center justify-between">
                               <h4 className="text-[11px] font-black text-neutral-900 uppercase tracking-widest">URL Crawler</h4>
                               <Badge className="bg-blue-100 text-blue-700 border-0 rounded-lg text-[9px] font-black">PRO</Badge>
                            </div>
                            <div className="flex gap-2">
                               <Input 
                                  placeholder="https://example.com/docs" 
                                  className="h-11 rounded-xl bg-neutral-50 border-neutral-200 text-xs font-bold ring-0 focus-visible:ring-0"
                               />
                               <Button className="h-11 px-6 rounded-xl bg-black text-white font-black text-[10px] tracking-widest uppercase">CRAWL</Button>
                            </div>
                         </div>
                      </div>

                      {/* RAG Settings */}
                      <div className="lg:col-span-5 space-y-8">
                         <div className="p-12 rounded-[3.5rem] bg-white border border-neutral-100 shadow-2xl shadow-primary/5 space-y-12">
                            <div className="flex items-center gap-6">
                               <div className="w-14 h-14 rounded-[1.5rem] bg-neutral-50 flex items-center justify-center text-primary shadow-inner">
                                  <Cpu className="w-7 h-7" />
                               </div>
                               <div>
                                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Neural Retrieval Logic</h3>
                                  <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-1">Advanced RAG Parameter Synthesis</p>
                               </div>
                            </div>

                            <div className="space-y-10">
                               <div className="space-y-6">
                                  <div className="flex items-center justify-between px-2">
                                     <span className="text-[11px] font-black text-neutral-900 uppercase tracking-[0.2em]">Semantic Top-K</span>
                                     <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">{agent.maxRetrieve} NODES</Badge>
                                  </div>
                                  <Slider 
                                     value={[agent.maxRetrieve]} 
                                     max={20} 
                                     step={1} 
                                     onValueChange={(val: number[]) => handleUpdate({ maxRetrieve: val[0] })}
                                     className="py-4"
                                  />
                               </div>

                               <div className="space-y-6">
                                  <div className="flex items-center justify-between px-2">
                                     <span className="text-[11px] font-black text-neutral-900 uppercase tracking-[0.2em]">Neural Temperature</span>
                                     <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">{agent.temperature}</Badge>
                                  </div>
                                  <Slider 
                                     value={[agent.temperature * 100]} 
                                     max={100} 
                                     step={1} 
                                     onValueChange={(val: number[]) => handleUpdate({ temperature: val[0] / 100 })}
                                     className="py-4"
                                  />
                               </div>
                            </div>

                            <div className="flex items-start gap-6 p-8 rounded-[2rem] bg-neutral-50/50 border border-neutral-100 shadow-inner group">
                               <AlertCircle className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
                               <p className="text-[10px] text-neutral-500 font-bold leading-relaxed uppercase tracking-widest opacity-80 italic">
                                  Higher Top-K clusters improve synthetic reasoning precision but accelerate token consumption vectors.
                               </p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === "voice" && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-20">
                   <div className="flex items-center justify-between border-b border-neutral-200 pb-8">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 border border-purple-500/20">
                            <Volume2 className="w-5 h-5" />
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Voice Orchestration</h3>
                            <p className="text-xs text-neutral-500 font-medium mt-1">Configure real-time voice synthesis and platform providers.</p>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      {/* Provider Settings */}
                      <div className="lg:col-span-7 space-y-8">
                         <div className="p-8 rounded-[2.5rem] bg-white border border-neutral-200 shadow-sm space-y-8">
                            <div className="flex items-center justify-between">
                               <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">Voice Provider</h3>
                               <Badge className="bg-green-100 text-green-700 border-0 rounded-lg text-[9px] font-black">VAPI / RETELL</Badge>
                            </div>

                            <div className="space-y-6">
                               <div className="space-y-3">
                                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Platform API Key</label>
                                  <Input 
                                     placeholder="vapi-xxxxxxxx-xxxx" 
                                     type="password"
                                     className="h-11 rounded-xl bg-neutral-50 border-neutral-200 text-xs font-bold ring-0 focus-visible:ring-0"
                                  />
                               </div>
                               <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                     <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Voice ID</label>
                                     <select className="w-full h-11 px-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-bold outline-none">
                                        <option>Ally (Deepgram)</option>
                                        <option>James (ElevenLabs)</option>
                                        <option>Sarah (Azure)</option>
                                     </select>
                                  </div>
                                  <div className="space-y-3">
                                     <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Synthesis Speed</label>
                                     <select className="w-full h-11 px-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-bold outline-none">
                                        <option>Normal (1.0x)</option>
                                        <option>Fast (1.2x)</option>
                                        <option>Dynamic</option>
                                     </select>
                                  </div>
                               </div>
                            </div>
                         </div>

                         <div className="p-8 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 text-indigo-900 space-y-6">
                            <div className="flex items-center gap-3">
                               <Zap className="w-4 h-4 text-indigo-600" />
                               <h4 className="text-xs font-black uppercase tracking-widest">Live Listening Settings</h4>
                            </div>
                            <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-indigo-100 shadow-sm">
                               <div>
                                  <p className="text-xs font-bold">Ambient Noise Suppression</p>
                                  <p className="text-[9px] text-indigo-400 mt-1 uppercase">Recommended for warehouse/outdoor calls</p>
                               </div>
                               <Switch className="data-[state=checked]:bg-indigo-600" />
                            </div>
                            <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-indigo-100 shadow-sm">
                               <div>
                                  <p className="text-xs font-bold">Emotion Transfer Logic</p>
                                  <p className="text-[9px] text-indigo-400 mt-1 uppercase">Adjust voice inflection based on user mood</p>
                               </div>
                               <Switch className="data-[state=checked]:bg-indigo-600" />
                            </div>
                         </div>
                      </div>

                      {/* Phone Number Box */}
                      <div className="lg:col-span-5">
                         <div className="p-8 rounded-[2.5rem] bg-white border border-neutral-200 shadow-sm space-y-6 sticky top-24">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                               <Phone className="w-6 h-6" />
                            </div>
                            <div>
                               <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">Deployment Number</h3>
                               <p className="text-[10px] text-neutral-400 font-bold uppercase mt-1">Twilio / Nexmo Provisioning</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 border-dashed text-center space-y-4">
                               <p className="text-xs font-black text-neutral-900">No active number provisioned</p>
                               <Button variant="outline" className="w-full rounded-xl h-10 border-neutral-200 text-[10px] font-black tracking-widest uppercase">BUY NUMBER</Button>
                            </div>
                            <p className="text-[9px] text-neutral-400 font-bold leading-relaxed">
                               Connecting a phone number allows this agent to receive incoming calls and perform outbound AI outreach.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
             )}
             {activeTab === "widget" && (
                <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-20">
                   <div className="flex items-center justify-between border-b border-neutral-200 pb-8">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/20">
                            <Layers className="w-5 h-5" />
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Web Chat Widget</h3>
                            <p className="text-xs text-neutral-500 font-medium mt-1">Deploy this agent directly on your website with a single line of code.</p>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-7 space-y-8">
                         <div className="p-8 rounded-[2.5rem] bg-white border border-neutral-200 shadow-sm space-y-6">
                            <div className="flex items-center justify-between">
                               <h4 className="text-[12px] font-black text-neutral-900 uppercase tracking-widest">Embed Instructions</h4>
                               <div className="flex items-center gap-2">
                                  <Terminal className="w-4 h-4 text-neutral-400" />
                                  <span className="text-[10px] font-black text-neutral-400 uppercase">Production Tag</span>
                               </div>
                            </div>
                            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 text-neutral-600 font-mono text-[11px] leading-relaxed relative group overflow-hidden shadow-inner">
                               <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="sm" className="h-8 rounded-lg bg-white border border-neutral-200 text-neutral-900 hover:bg-neutral-50 shadow-sm text-[9px] font-black tracking-widest uppercase">COPY CODE</Button>
                               </div>
                               <span className="text-neutral-400">{"<script>"}</span><br />
                               &nbsp;&nbsp;window.encoderSettings = {"{"}<br />
                               &nbsp;&nbsp;&nbsp;&nbsp;agentId: <span className="text-blue-600">"{agent.id}"</span>,<br />
                               &nbsp;&nbsp;&nbsp;&nbsp;primaryColor: <span className="text-blue-600">"#0066FF"</span>,<br />
                               &nbsp;&nbsp;{"};"}<br />
                               <span className="text-neutral-400">{"</script>"}</span><br />
                               <span className="text-neutral-400">{"<script src=\"https://cdn.encoder.ai/widget.v1.js\" async></script>"}</span>
                            </div>
                            <p className="text-[10px] text-neutral-400 font-bold leading-relaxed px-2">
                               Paste this code snippet into the header of your website. The widget will automatically sync with the latest agent instructions and knowledge base.
                            </p>
                         </div>

                         <div className="grid grid-cols-2 gap-6">
                            <div className="p-8 rounded-[2.5rem] bg-white border border-neutral-200 shadow-sm space-y-4">
                               <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-1">Brand Color</h4>
                               <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                                  <div className="w-6 h-6 rounded-full bg-blue-600 shadow-sm" />
                                  <span className="text-xs font-bold text-neutral-900">#0066FF</span>
                               </div>
                            </div>
                            <div className="p-8 rounded-[2.5rem] bg-white border border-neutral-200 shadow-sm space-y-4">
                               <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-1">Widget Position</h4>
                               <select className="w-full h-11 px-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-bold outline-none appearance-none">
                                  <option>Bottom Right</option>
                                  <option>Bottom Left</option>
                                  <option>Inline Element</option>
                               </select>
                            </div>
                         </div>
                      </div>

                      <div className="lg:col-span-5">
                         <div className="p-10 rounded-[3rem] bg-neutral-50 border border-neutral-200 border-dashed flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-[2.5rem] bg-white shadow-xl shadow-black/5 flex items-center justify-center text-blue-600 relative">
                               <Layers className="w-10 h-10" />
                               <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-[#F8F9FA] animate-pulse" />
                            </div>
                            <div>
                               <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight">Live Widget Status</h4>
                               <p className="text-[10px] text-neutral-400 font-bold uppercase mt-1">Global Broadcast Active</p>
                            </div>
                            <Button className="rounded-xl h-11 px-10 bg-black text-white font-black text-[10px] tracking-widest uppercase">VIEW PREVIEW</Button>
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {/* Simulator Tab Content (Functional) */}
             {activeTab === "simulator" && (
                <div className="flex flex-col h-[750px] bg-white rounded-[3rem] border border-neutral-200 shadow-sm overflow-hidden animate-in zoom-in-95 duration-500 relative">
                    {/* Simulator Header */}
                    <div className="p-8 border-b border-neutral-100 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-neutral-900 flex items-center justify-center text-white">
                             <Eye className="w-5 h-5" />
                          </div>
                          <div>
                             <h3 className="text-sm font-black text-neutral-900 uppercase tracking-tight">Real-time Simulator</h3>
                             <p className="text-[10px] text-neutral-400 font-bold uppercase mt-1">Debug orchestration reasoning & logic</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <Button variant="outline" className="h-10 rounded-xl border-neutral-200 text-[10px] font-black uppercase tracking-widest gap-2" onClick={() => setMessages([])}>
                             <History className="w-3.5 h-3.5" /> RESET
                          </Button>
                          <Button variant="outline" className="h-10 rounded-xl border-neutral-200 text-[10px] font-black uppercase tracking-widest">
                             WIDGET PREVIEW
                          </Button>
                       </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-neutral-50/30 font-sans">
                       
                       {messages.length === 0 && !isTyping && (
                         <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                            <div className="w-16 h-16 rounded-3xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-300">
                               <Bot className="w-8 h-8" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] max-w-[200px]">Send a message to begin the simulation</p>
                         </div>
                       )}

                       {messages.map((msg, i) => (
                         <div key={i} className={`flex items-start gap-4 animate-in slide-in-from-bottom-2 duration-300 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-sm ${msg.role === 'assistant' ? 'bg-white text-blue-600 border-neutral-200' : 'bg-black text-white border-black'}`}>
                               {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                            </div>
                            <div className={`p-6 rounded-[1.8rem] border shadow-sm max-w-[80%] ${msg.role === 'assistant' ? 'bg-white border-neutral-200 text-neutral-900' : 'bg-blue-600 border-blue-600 text-white'}`}>
                               <p className="text-sm font-medium leading-relaxed">
                                  {msg.content}
                                </p>
                                {msg.analytics && (
                                   <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-3 gap-4">
                                      <div className="flex flex-col">
                                         <span className="text-[7px] font-black text-neutral-400 uppercase tracking-widest">Sentiment</span>
                                         <span className="text-[9px] font-bold text-green-600 uppercase">{msg.analytics.sentiment}</span>
                                      </div>
                                      <div className="flex flex-col">
                                         <span className="text-[7px] font-black text-neutral-400 uppercase tracking-widest">Intent</span>
                                         <span className="text-[9px] font-bold text-blue-600 uppercase">{msg.analytics.intent}</span>
                                      </div>
                                      <div className="flex flex-col">
                                         <span className="text-[7px] font-black text-neutral-400 uppercase tracking-widest">Score</span>
                                         <span className="text-[9px] font-bold text-neutral-900 uppercase">{msg.analytics.score}%</span>
                                      </div>
                                   </div>
                                )}
                                <div className={`mt-3 flex items-center gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                   {msg.role === 'assistant' && <Badge className="bg-blue-50 text-blue-600 border-0 rounded-lg text-[8px] font-black uppercase">REASONING ACTIVE</Badge>}
                                   {msg.analytics && <Badge className="bg-purple-50 text-purple-600 border-0 rounded-lg text-[8px] font-black uppercase">CONTEXTUAL MEMORY</Badge>}
                                   <span className={`text-[8px] font-black uppercase ${msg.role === 'user' ? 'text-blue-200' : 'text-neutral-300'}`}>
                                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                   </span>
                                </div>
                            </div>
                         </div>
                       ))}

                       {isTyping && (
                         <div className="flex items-start gap-4 animate-pulse">
                            <div className="w-9 h-9 rounded-full bg-white text-blue-600 border border-neutral-200 shadow-sm flex items-center justify-center">
                               <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-white p-5 rounded-[1.5rem] border border-neutral-200 shadow-sm">
                               <div className="flex gap-1.5">
                                  <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                  <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                  <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" />
                               </div>
                            </div>
                         </div>
                       )}
                    </div>

                    {/* Input Area */}
                    <div className="p-8 bg-white border-t border-neutral-100 z-10">
                       <div className="relative group max-w-4xl mx-auto">
                          <Input 
                             value={inputValue}
                             onChange={(e) => setInputValue(e.target.value)}
                             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                             placeholder={`Type to test ${agent.name}...`} 
                             className="h-16 pl-6 pr-32 rounded-[1.8rem] bg-neutral-50 border-neutral-200 text-sm font-bold focus:bg-white focus:border-primary/50 transition-all outline-none ring-0 focus-visible:ring-0 shadow-inner"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <Button 
                               onClick={handleSendMessage}
                               className="h-10 px-6 rounded-xl bg-black text-white hover:bg-neutral-800 font-black text-[10px] tracking-widest uppercase transition-transform hover:scale-105 active:scale-95"
                             >
                                SEND
                             </Button>
                          </div>
                       </div>
                    </div>
                </div>
             )}

             {activeTab === "analytics" && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
                   <div className="flex items-center justify-between border-b border-neutral-200 pb-8">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/20">
                            <BarChart3 className="w-5 h-5" />
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">Intelligence Dashboard</h3>
                            <p className="text-xs text-neutral-500 font-medium mt-1">Real-time sentiment, intent classification, and conversation scoring.</p>
                         </div>
                      </div>
                      <Badge className="bg-primary hover:bg-primary/90 text-white border-0 py-1 px-4 rounded-lg font-black tracking-widest text-[9px]">LIVE OPS</Badge>
                   </div>
 
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { label: "Avg Sentiment", value: "Neutral", sub: "No calls yet", icon: <Bot className="text-neutral-400" />, trend: null },
                        { label: "Success Score", value: "--", sub: "Awaiting data", icon: <Trophy className="text-neutral-400" />, trend: null },
                        { label: "Intent Match", value: "0%", sub: "Initializing...", icon: <Target className="text-neutral-400" />, trend: null },
                        { label: "Memory Hits", value: "0", sub: "Profile retrievals", icon: <Database className="text-neutral-400" />, trend: null },
                      ].map((stat, i) => (
                        <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-neutral-200 shadow-sm space-y-4 group hover:border-primary/30 transition-all">
                           <div className="flex items-center justify-between">
                              <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                 {stat.icon}
                              </div>
                              {stat.trend && <span className="text-[10px] font-black text-green-500">{stat.trend}</span>}
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{stat.label}</p>
                              <h4 className="text-2xl font-black text-neutral-900 mt-1">{stat.value}</h4>
                              <p className="text-[9px] text-neutral-400 font-bold uppercase mt-1">{stat.sub}</p>
                           </div>
                        </div>
                      ))}
                   </div>
 
                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
                      <div className="lg:col-span-8 p-10 rounded-[3rem] bg-white border border-neutral-200 shadow-sm space-y-8">
                         <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest">Conversation Funnel (Drop-off)</h4>
                            <div className="flex gap-2">
                               <Badge variant="outline" className="rounded-md text-[9px] font-black">7 DAYS</Badge>
                               <Badge variant="outline" className="rounded-md text-[9px] font-black">30 DAYS</Badge>
                            </div>
                         </div>
                         <div className="space-y-6 pt-4">
                            {[
                               { label: "Initial Greeting", percent: 0, color: "bg-blue-500" },
                               { label: "Context Retrieval", percent: 0, color: "bg-indigo-500" },
                               { label: "Intent Identified", percent: 0, color: "bg-purple-500" },
                               { label: "Lead Qualified", percent: 0, color: "bg-green-500" },
                               { label: "Outcome Finalized", percent: 0, color: "bg-emerald-500" },
                            ].map((row, i) => (
                               <div key={row.label} className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-black uppercase tracking-tight ml-1">
                                     <span className="text-neutral-500">{row.label}</span>
                                     <span className="text-neutral-900">{row.percent}%</span>
                                  </div>
                                  <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                                     <div className={`h-full ${row.color}`} style={{ width: `${row.percent}%` }} />
                                  </div>
                                </div>
                            ))}
                         </div>
                      </div>
                      <div className="lg:col-span-4 p-10 rounded-[3rem] bg-neutral-50 border border-neutral-200 space-y-8 shadow-inner overflow-hidden relative group flex flex-col">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] -mr-10 -mt-10" />
                          <div className="flex items-center gap-3">
                             <Zap className="w-5 h-5 text-yellow-500" />
                             <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest">Top User Intents</h4>
                          </div>
                          
                          <div className="space-y-4 flex-1 flex flex-col items-center justify-center p-10 border border-dashed border-neutral-200 rounded-[2rem] bg-white/50">
                             <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest text-center">No intents detected yet.<br/>Start a conversation to begin classification.</p>
                          </div>
 
                          <Button className="w-full h-12 rounded-xl bg-neutral-900 text-white hover:bg-black font-black text-[10px] tracking-widest uppercase shadow-xl shadow-neutral-900/10 mt-8">
                             EXPORT ANALYSIS
                          </Button>
                      </div>
                   </div>
                </div>
             )}

             {/* Placeholder for other tabs */}
             {!["prompt", "channels", "knowledge", "voice", "simulator", "analytics"].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-40 text-center space-y-6 animate-in fade-in duration-700">
                   <div className="w-20 h-20 rounded-3xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-300 shadow-sm">
                      {TABS.find(t => t.id === activeTab)?.icon && <Bot className="w-10 h-10" />}
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">{activeTab} Panel</h3>
                      <p className="text-sm text-neutral-500 font-medium max-w-sm mx-auto">This section is being synchronized with the visual orchestrator engine. Standard dashboard features remain active.</p>
                   </div>
                   <Button variant="outline" className="rounded-xl px-10 h-11 font-black text-[10px] tracking-widest uppercase" disabled>
                      EXPERIMENTAL
                   </Button>
                </div>
             )}

           </div>
        </main>

        {/* Floating Save Button (Overlay) */}
        {!isPending && (
           <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
              <Button 
                onClick={onSave}
                className="h-14 px-10 rounded-full bg-primary text-white hover:bg-primary/90 font-black text-xs tracking-[0.2em] shadow-2xl shadow-primary/30 gap-4 transition-all hover:scale-105 active:scale-95"
              >
                <Save className="w-4 h-4" />
                PERSIST ORCHESTRATION
              </Button>
           </div>
        )}

        {/* Right Drawer Toggle (Simulator/Test) */}
        <div 
           className="absolute right-0 top-0 bottom-0 w-12 border-l border-neutral-200 bg-white flex flex-col items-center py-4 gap-4 z-20 cursor-pointer hover:bg-neutral-50 transition-colors"
           onClick={() => setShowTest(!showTest)}
        >
           <div className="[writing-mode:vertical-lr] text-[9px] font-black uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-4">
              <span className="rotate-180">Show Test</span>
              {showTest ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
           </div>
        </div>

        {/* Simulator Drawer */}
        {showTest && (
           <aside className="fixed right-0 top-[120px] bottom-0 w-[400px] bg-white border-l border-neutral-200 z-50 shadow-2xl animate-in slide-in-from-right duration-500">
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                 <h3 className="text-sm font-black text-neutral-900 uppercase tracking-widest">Simulator</h3>
                 <Button variant="ghost" size="sm" onClick={() => setShowTest(false)}><Plus className="w-4 h-4 rotate-45" /></Button>
              </div>
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-16 h-16 rounded-3xl bg-neutral-100 flex items-center justify-center text-neutral-300">
                    <Loader2 className="w-8 h-8 animate-spin" />
                 </div>
                 <p className="text-xs font-black text-neutral-900 uppercase tracking-widest">Waking up Agent...</p>
                 <p className="text-[10px] text-neutral-500 font-medium">Initializing orchestration websocket flow.</p>
              </div>
           </aside>
        )}
      </div>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}
