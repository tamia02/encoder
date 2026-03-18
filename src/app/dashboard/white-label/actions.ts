"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBranding(data: {
  agencyName?: string;
  logoUrl?: string;
  primaryColor?: string;
  domain?: string;
}) {
  try {
    // Mocking the user ID for consistency
    const userId = "placeholder_user_id";

    // Find the user and their first workspace
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { workspaces: true },
    });

    if (!user || user.workspaces.length === 0) {
      return { success: false, error: "No workspace found" };
    }

    const workspaceId = user.workspaces[0].id;

    await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        name: data.agencyName,
        logoUrl: data.logoUrl,
        primaryColor: data.primaryColor,
        domain: data.domain,
      },
    });

    revalidatePath("/dashboard/white-label");
    return { success: true };
  } catch (error) {
    console.error("Failed to update branding:", error);
    return { success: false, error: "Database error" };
  }
}
