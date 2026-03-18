"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(data: {
  name?: string;
  email?: string;
}) {
  try {
    // Mocking the user ID for consistency with other actions until Clerk is fully synced
    const userId = "placeholder_user_id";

    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        name: data.name,
        email: data.email,
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user profile:", error);
    return { success: false, error: "Database error" };
  }
}
