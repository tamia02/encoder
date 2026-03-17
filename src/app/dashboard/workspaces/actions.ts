"use server";

import prisma from "@/lib/prisma";

export async function updateWorkspaceBranding(workspaceId: string, data: {
  logoUrl?: string;
  primaryColor?: string;
  domain?: string;
}) {
  try {
    const { revalidatePath } = await import("next/cache");
    await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        ...data,
      }
    });
    revalidatePath("/dashboard/workspaces");
    return { success: true };
  } catch (error) {
    console.error("Failed to update workspace branding:", error);
    return { success: false, error: "Database error" };
  }
}

export async function createWorkspace(name: string, ownerId: string) {
  try {
    const { revalidatePath } = await import("next/cache");
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const ws = await prisma.workspace.create({
      data: {
        name,
        slug,
        ownerId,
        minutesLimit: 100,
        minutesUsed: 0
      }
    });
    revalidatePath("/dashboard/workspaces");
    return { success: true, workspace: ws };
  } catch (error) {
    console.error("Failed to create workspace:", error);
    return { success: false, error: "Database error" };
  }
}
