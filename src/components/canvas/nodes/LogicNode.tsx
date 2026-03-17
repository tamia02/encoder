import { Handle, Position } from "reactflow";
import { GitBranch, Hash } from "lucide-react";

export function LogicNode({ data }: any) {
  return (
    <div className="w-56 p-5 rounded-3xl bg-neutral-900/90 border border-white/10 backdrop-blur-2xl shadow-2xl group hover:border-purple-500/50 transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-purple-400">
          <GitBranch className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Logic Router</span>
        </div>
      </div>

      <div className="space-y-2 relative">
        <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 bg-purple-500 border-none" />
        
        <div className="p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between group/port">
          <span className="text-[9px] text-blue-500/80 font-black uppercase tracking-wider">Condition A</span>
          <Handle type="source" position={Position.Right} id="a" className="w-2 h-2 bg-blue-500 border-none" />
        </div>
        
        <div className="p-2.5 rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-between group/port">
          <span className="text-[9px] text-orange-500/80 font-black uppercase tracking-wider">Condition B</span>
          <Handle type="source" position={Position.Right} id="b" className="w-2 h-2 bg-orange-500 border-none" />
        </div>

        <div className="p-2.5 rounded-xl bg-neutral-500/5 border border-neutral-500/10 flex items-center justify-between group/port">
          <span className="text-[9px] text-neutral-500/80 font-black uppercase tracking-wider">Default</span>
          <Handle type="source" position={Position.Right} id="default" className="w-2 h-2 bg-neutral-500 border-none" />
        </div>
      </div>
    </div>
  );
}
