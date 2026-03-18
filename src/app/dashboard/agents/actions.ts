"use server";

import prisma from "@/lib/prisma";

export async function createAgent(formData: any) {
  // Use dynamic imports for server-only functions to avoid bundle leaks
  const { revalidatePath } = await import("next/cache");
  const { redirect } = await import("next/navigation");
  
  // We'll mock the userId for the build fix
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

  const workspace = user.workspaces[0];
  if (!workspace) throw new Error("No workspace found");

  // 2. Create the agent
  const agent = await prisma.agent.create({
    data: {
      name: formData.name,
      systemPrompt: formData.systemPrompt || "You are a helpful AI assistant.",
      voiceId: formData.voiceId || "alloy",
      voiceProvider: formData.voiceProvider || "OpenAI",
      workspaceId: workspace.id,
      mode: "VOICE",
      greeting: formData.greeting || "Hello! How can I help you today?",
      knowledgeEnabled: formData.knowledgeEnabled || false,
      maxRetrieve: formData.maxRetrieve || 3,
      temperature: formData.temperature || 0.7,
    },
  });

  revalidatePath("/dashboard/agents");
  redirect(`/dashboard/agents/${agent.id}`);
}

export async function getAgent(agentId: string) {
  try {
    return await prisma.agent.findUnique({
      where: { id: agentId },
      include: { knowledgeBase: true }
    });
  } catch (error) {
    console.error("Failed to fetch agent:", error);
    return null;
  }
}

export async function updateAgent(agentId: string, data: any) {
  try {
    const { revalidatePath } = await import("next/cache");
    
    // Explicitly omit fields that shouldn't be updated or cause Prisma errors
    const { 
      id, 
      knowledgeBase, 
      createdAt, 
      updatedAt, 
      workspace, 
      calls,
      workspaceId, // Usually don't want to change workspace via this action
      ...updateData 
    } = data;

    await prisma.agent.update({
      where: { id: agentId },
      data: updateData
    });

    revalidatePath(`/dashboard/agents/${agentId}`);
    revalidatePath("/dashboard/agents");
    return { success: true };
  } catch (error) {
    console.error("Failed to update agent:", error);
    return { success: false, error: "Failed to update agent" };
  }
}

export async function updateCanvas(id: string, canvasData: any) {
  try {
    const { revalidatePath } = await import("next/cache");
    const { db } = await import("@/lib/db");

    await db.agent.update({ where: { id }, data: { canvasData } });
    
    revalidatePath("/dashboard/canvas");
    return { success: true };
  } catch (error) {
    console.error("Failed to update canvas:", error);
    return { success: false, error: "Failed to update canvas" };
  }
}
