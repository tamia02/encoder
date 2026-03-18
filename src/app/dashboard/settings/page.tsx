import prisma from "@/lib/prisma";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const userId = "placeholder_user_id";

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  const initialData = {
    name: user?.name || "New User",
    email: user?.email || "placeholder@email.com",
    organization: user?.organization || "My Organization",
    timezone: user?.timezone || "UTC-5 (Eastern Time)",
  };

  return <SettingsClient initialData={initialData} />;
}
