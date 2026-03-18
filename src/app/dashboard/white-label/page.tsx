import prisma from "@/lib/prisma";
import WhiteLabelClient from "./WhiteLabelClient";

export default async function WhiteLabelPage() {
  const userId = "placeholder_user_id";

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { workspaces: true },
  });

  const workspace = user?.workspaces[0];

  const initialData = {
    agencyName: workspace?.name || "Encoder Digital",
    domain: workspace?.domain || "app.encoder.ai",
    logoUrl: workspace?.logoUrl || "",
    primaryColor: workspace?.primaryColor || "#2563eb",
  };

  return <WhiteLabelClient initialData={initialData} />;
}
