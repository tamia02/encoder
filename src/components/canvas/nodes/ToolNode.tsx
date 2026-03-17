import { Handle, Position } from "reactflow";
import { Zap, Database, Calendar, Mail } from "lucide-react";

const ICON_MAP: any = {
  crm: Database,
  booking: Calendar,
  email: Mail,
  webhook: Zap
};

export function ToolNode({ data }: any) {
  const Icon = ICON_MAP[data.toolType] || Zap;

  return (
    <div className="w-52 p-5 rounded-3xl bg-neutral-900/90 border border-white/10 backdrop-blur-2xl shadow-2xl hover:border-primary/50 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-white uppercase tracking-widest">{data.label}</span>
          <span className="text-[8px] text-muted-foreground uppercase font-bold tracking-tight">Action Node</span>
        </div>
      </div>

      <div className="relative">
        <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 bg-primary border-none" />
        <Handle type="source" position={Position.Right} className="w-2.5 h-2.5 bg-primary border-none" />
        
        <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
           <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest italic tracking-widest">Auto-Execute</span>
        </div>
      </div>
    </div>
  );
}
