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
    <div className="h-[calc(100vh-8rem)] -m-8 relative">
      <CanvasPro 
        agentId={agent?.id} 
        initialNodes={initialNodes} 
        initialEdges={initialEdges} 
      />
    </div>
  );
}
