"use server";

import prisma from "@/lib/prisma";

export async function updateContactStage(contactId: string, stage: string) {
  try {
    const { revalidatePath } = await import("next/cache");
    await prisma.contact.update({
      where: { id: contactId },
      data: { stage }
    });
    revalidatePath("/dashboard/contacts");
    return { success: true };
  } catch (error) {
    console.error("Failed to update contact stage:", error);
    return { success: false, error: "Database error" };
  }
}
