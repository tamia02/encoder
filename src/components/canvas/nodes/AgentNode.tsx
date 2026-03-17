import { Handle, Position } from "reactflow";
import { Bot, Settings2, Zap } from "lucide-react";

export function AgentNode({ data }: any) {
  return (
    <div className="w-64 p-5 rounded-3xl bg-neutral-900/90 border border-white/10 backdrop-blur-2xl shadow-2xl group hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Bot className="w-12 h-12" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase text-white tracking-widest">{data.label || 'Agent Node'}</span>
          </div>
          <Settings2 className="w-3.5 h-3.5 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
        </div>
        
        <p className="text-[10px] text-muted-foreground leading-relaxed mb-4">
          {data.description || 'Executes AI instructions and manages conversation state.'}
        </p>

        <div className="space-y-2">
           <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-tight">On Entry</span>
              <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 bg-primary border-none shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
           </div>
           <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-tight">On Success</span>
              <Handle type="source" position={Position.Right} id="success" className="w-2.5 h-2.5 bg-green-500 border-none" />
           </div>
        </div>
      </div>
    </div>
  );
}
