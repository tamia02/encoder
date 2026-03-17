export const dynamic = 'force-dynamic';

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import ContactsView from "./components/ContactsView";

export default async function ContactsPage() {
  const { userId } = await auth();
  
  // Fetch real contacts from the database
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <ContactsView initialContacts={contacts} />;
}
