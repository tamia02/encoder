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
    const userId = "placeholder_user_id";

    // 1. Get or create the user's default workspace
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { workspaces: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: "placeholder@email.com",
          name: "New User",
          workspaces: {
            create: {
              name: "My Workspace",
              slug: `workspace-${userId.slice(-6)}`,
            },
          },
        },
        include: { workspaces: true },
      });
    }

    if (user.workspaces.length === 0) {
        await prisma.workspace.create({
            data: {
                name: "My Workspace",
                slug: `workspace-${userId.slice(-6)}`,
                userId: user.id
            }
        });
        // Re-fetch user with workspace
        user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: { workspaces: true },
        }) as any;
    }

    const workspaceId = user!.workspaces[0].id;

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
