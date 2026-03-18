import CanvasPro from "@/components/canvas/CanvasPro";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export default async function CanvasPage() {
  const { userId } = await auth();
  
  // Find the most recent agent for this user to bind the canvas to for now
  // In a full implementation, we might navigate to /dashboard/canvas/[agentId]
  const agent = await prisma.agent.findFirst({
    where: {
      workspace: {
        owner: {
          clerkId: userId || ""
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  const initialNodes = (agent?.canvasData as any)?.nodes || [];
  const initialEdges = (agent?.canvasData as any)?.edges || [];

  return (
    <div className="h-[calc(100vh-10rem)] -m-12 relative bg-neutral-50/30 rounded-[3rem] overflow-hidden border border-neutral-100 shadow-inner group">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
      <div className="relative z-10 h-full w-full">
        <CanvasPro 
          agentId={agent?.id} 
          initialNodes={initialNodes} 
          initialEdges={initialEdges} 
        />
      </div>
    </div>
  );
}
