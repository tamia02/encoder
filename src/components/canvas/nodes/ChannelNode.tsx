import { Handle, Position } from "reactflow";
import { Globe, Smartphone, MessageSquare } from "lucide-react";

export function ChannelNode({ data }: any) {
  return (
    <div className="w-60 p-5 rounded-3xl bg-neutral-900/90 border border-white/10 backdrop-blur-2xl shadow-2xl hover:border-orange-500/50 transition-all duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
          <Globe className="w-4 h-4" />
        </div>
        <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Channel Aware</h4>
      </div>

      <div className="space-y-2 relative">
        <Handle type="target" position={Position.Top} className="w-2.5 h-2.5 bg-orange-500 border-none" />
        
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
           <div className="flex items-center gap-2">
             <Smartphone className="w-3.5 h-3.5 text-green-400" />
             <span className="text-[9px] font-bold text-neutral-300">WhatsApp</span>
           </div>
           <Handle type="source" position={Position.Right} id="whatsapp" className="w-2 h-2 bg-green-500 border-none" />
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
           <div className="flex items-center gap-2">
             <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
             <span className="text-[9px] font-bold text-neutral-300">Web Chat</span>
           </div>
           <Handle type="source" position={Position.Right} id="web" className="w-2 h-2 bg-blue-500 border-none" />
        </div>
      </div>
    </div>
  );
}
