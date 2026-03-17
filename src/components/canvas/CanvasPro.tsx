"use client";

import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  Connection, 
  Edge, 
  Node, 
  useNodesState, 
  useEdgesState,
  Panel,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import { AgentNode } from './nodes/AgentNode';
import { LogicNode } from './nodes/LogicNode';
import { ChannelNode } from './nodes/ChannelNode';
import { ToolNode } from './nodes/ToolNode';

import { 
  Plus, 
  Save, 
  Zap, 
  GitBranch, 
  Bot, 
  Globe, 
  Database,
  Layers,
  MousePointer2,
  Play,
  Share2,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateCanvas } from '@/app/dashboard/agents/actions';

const nodeTypes = {
  agent: AgentNode,
  logic: LogicNode,
  channel: ChannelNode,
  tool: ToolNode,
};

interface CanvasProProps {
  agentId?: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

export default function CanvasPro({ agentId, initialNodes = [], initialEdges = [] }: CanvasProProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes.length > 0 ? initialNodes : [
    {
      id: '1',
      type: 'agent',
      position: { x: 100, y: 100 },
      data: { label: 'Primary Entry', description: 'Main greeting and intent detection.' },
    }
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true,
      style: { stroke: '#22c55e', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' }
    }, eds)),
    [setEdges]
  );

  const onSave = async () => {
    if (!agentId) return;
    setIsSaving(true);
    setSaveStatus('idle');
    
    const res = await updateCanvas(agentId, { nodes, edges });
    if (res.success) {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
    setIsSaving(false);
  };

  const addNode = (type: string) => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      type: type,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
      data: { 
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        toolType: type === 'tool' ? 'crm' : undefined
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 animate-in fade-in duration-700">
      {/* Canvas Header */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-neutral-950/50 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-2xl shadow-primary/20">
              <Layers className="w-5 h-5" />
           </div>
           <div>
              <h2 className="text-xl font-black text-white tracking-tight">Agent Canvas Pro</h2>
              <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 Visual Orchestrator Enabled
              </p>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <Button variant="ghost" className="rounded-xl h-10 px-4 text-muted-foreground hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]">History</Button>
           <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5 rounded-xl h-10 px-5 font-bold text-xs uppercase tracking-widest">
             <Share2 className="w-4 h-4" />
             Deploy Flow
           </Button>
           <Button 
             className="gap-2 bg-white text-black hover:bg-white/90 rounded-xl h-11 px-6 font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5 min-w-[180px]"
             onClick={onSave}
             disabled={isSaving || !agentId}
           >
             {isSaving ? (
               <Loader2 className="w-4 h-4 animate-spin" />
             ) : saveStatus === 'success' ? (
               <CheckCircle2 className="w-4 h-4 text-green-600" />
             ) : (
               <Save className="w-4 h-4" />
             )}
             {isSaving ? 'PERSISTING...' : saveStatus === 'success' ? 'SAVED' : 'SAVE ORCHESTRATION'}
           </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Node Library Sidebar */}
        <aside className="w-72 border-r border-white/5 bg-neutral-950 flex flex-col p-6 space-y-8 z-10">
           <div className="space-y-4">
              <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Node Library</h3>
              <div className="grid grid-cols-1 gap-3">
                 {[
                   { type: 'agent', label: 'AI Agent', icon: Bot, color: 'text-primary', bg: 'bg-primary/10' },
                   { type: 'logic', label: 'Logic Split', icon: GitBranch, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                   { type: 'channel', label: 'Channel aware', icon: Globe, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                   { type: 'tool', label: 'Action Tool', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                 ].map((item) => (
                   <button
                     key={item.type}
                     onClick={() => addNode(item.type)}
                     className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900 border border-white/5 hover:border-white/20 transition-all text-left group active:scale-95"
                   >
                     <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-5 h-5" />
                     </div>
                     <span className="text-[11px] font-bold text-neutral-300 group-hover:text-white">{item.label}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="p-6 rounded-[2rem] bg-neutral-900/50 border border-white/5 border-dashed space-y-4">
              <p className="text-[9px] text-muted-foreground font-medium text-center leading-relaxed">
                 Drag and drop nodes onto the canvas to build complex branching conversation trees.
              </p>
              <Button variant="ghost" className="w-full text-[9px] font-black uppercase tracking-widest text-primary h-8 hover:bg-primary/10">Browse Templates</Button>
           </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 relative bg-neutral-950">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
          >
            <Background color="#333" gap={30} />
            <Controls className="bg-neutral-900 border-white/10 rounded-xl overflow-hidden shadow-2xl" />
            
            <Panel position="top-right" className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl">
               <div className="flex items-center gap-3 pr-4 border-r border-white/10">
                  <Play className="w-4 h-4 text-green-500 fill-green-500/20" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Simulation Mode</span>
               </div>
               <div className="flex items-center gap-2">
                  <MousePointer2 className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Inspect</span>
               </div>
            </Panel>
          </ReactFlow>
        </main>
      </div>
      
      <style jsx global>{`
        .react-flow__handle {
          width: 8px;
          height: 8px;
          border-radius: 2px;
        }
        .react-flow__edge-path {
          stroke-dasharray: 5;
          animation: flow 20s linear infinite;
        }
        @keyframes flow {
          from { stroke-dashoffset: 100 }
          to { stroke-dashoffset: 0 }
        }
        .react-flow__controls button {
          background-color: transparent !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          color: #94a3b8 !important;
        }
        .react-flow__controls button:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
          color: white !important;
        }
        .react-flow__attribution {
          display: none;
        }
      `}</style>
    </div>
  );
}
