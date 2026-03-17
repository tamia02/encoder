import { db } from "./db"
import { initDb } from "./db-init"

// Export the db as default prisma to minimize code changes
const prisma = db as any

// Trigger async init only if not in build phase
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
  initDb().catch(console.error);
}

export default prisma
