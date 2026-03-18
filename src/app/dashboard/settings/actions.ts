"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(data: {
  name?: string;
  email?: string;
  organization?: string;
  timezone?: string;
}) {
  try {
    // Standard user fetching logic
    const userId = "placeholder_user_id";

    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: data.email || "placeholder@email.com",
          name: data.name || "New User",
        },
      });
    }

    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        name: data.name,
        email: data.email,
        organization: data.organization,
        timezone: data.timezone,
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user profile:", error);
    return { success: false, error: "Database error" };
  }
}
