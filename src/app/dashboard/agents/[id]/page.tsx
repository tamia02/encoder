import { notFound } from "next/navigation";
import { getAgent } from "../actions";
import AgentEditor from "./components/AgentEditor";

export const dynamic = 'force-dynamic';

export default async function AgentPage({ params }: { params: { id: string } }) {
  const agent = await getAgent(params.id);

  if (!agent) {
    notFound();
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <AgentEditor agent={agent} />
    </div>
  );
}
