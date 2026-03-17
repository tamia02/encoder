import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL?.replace('prisma+postgres://', 'postgres://');

const pool = new Pool(connectionString ? {
  connectionString,
  connectionTimeoutMillis: 5000,
} : {
  // Empty config to prevent crash
  host: 'localhost',
  port: 5432,
});

pool.on('error', (err) => {
  console.error("Unexpected error on idle DB client:", err);
});

export async function initDb() {
  console.log("Initializing database tables...");
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        id TEXT PRIMARY KEY,
        "clerkId" TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS "Workspace" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        "ownerId" TEXT NOT NULL REFERENCES "User"(id),
        "logoUrl" TEXT,
        "primaryColor" TEXT,
        domain TEXT,
        "minutesLimit" INTEGER DEFAULT 100,
        "minutesUsed" INTEGER DEFAULT 0,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS "Agent" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        mode TEXT DEFAULT 'VOICE',
        "workspaceId" TEXT NOT NULL REFERENCES "Workspace"(id),
        "systemPrompt" TEXT,
        "voiceProvider" TEXT,
        "voiceId" TEXT,
        
        -- Advanced Convocore-style fields
        "whoStarts" TEXT DEFAULT 'USER',
        "greeting" TEXT,
        "language" TEXT DEFAULT 'en-US',
        "textScript" TEXT,
        "voiceScript" TEXT,
        "model" TEXT DEFAULT 'gpt-4o',
        "temperature" DOUBLE PRECISION DEFAULT 0.7,
        "maxTokens" INTEGER DEFAULT 1000,
        "leadScoringEnabled" BOOLEAN DEFAULT FALSE,
        "knowledgeEnabled" BOOLEAN DEFAULT FALSE,
        "maxRetrieve" INTEGER DEFAULT 3,
        "kbFilterTags" TEXT,
        "uiEngineFormsEnabled" BOOLEAN DEFAULT FALSE,
        "uiEngineLayoutsEnabled" BOOLEAN DEFAULT FALSE,
        "canvasEnabled" BOOLEAN DEFAULT FALSE,
        "canvasData" JSONB,
        "fillersEnabled" BOOLEAN DEFAULT FALSE,
        "fallbacks" TEXT,

        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Migration for existing Agent records
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Agent' AND column_name='whoStarts') THEN
          ALTER TABLE "Agent" ADD COLUMN "whoStarts" TEXT DEFAULT 'USER';
          ALTER TABLE "Agent" ADD COLUMN "greeting" TEXT;
          ALTER TABLE "Agent" ADD COLUMN "language" TEXT DEFAULT 'en-US';
          ALTER TABLE "Agent" ADD COLUMN "textScript" TEXT;
          ALTER TABLE "Agent" ADD COLUMN "voiceScript" TEXT;
          ALTER TABLE "Agent" ADD COLUMN "model" TEXT DEFAULT 'gpt-4o';
          ALTER TABLE "Agent" ADD COLUMN "temperature" DOUBLE PRECISION DEFAULT 0.7;
          ALTER TABLE "Agent" ADD COLUMN "maxTokens" INTEGER DEFAULT 1000;
          ALTER TABLE "Agent" ADD COLUMN "leadScoringEnabled" BOOLEAN DEFAULT FALSE;
          ALTER TABLE "Agent" ADD COLUMN "knowledgeEnabled" BOOLEAN DEFAULT FALSE;
          ALTER TABLE "Agent" ADD COLUMN "maxRetrieve" INTEGER DEFAULT 3;
          ALTER TABLE "Agent" ADD COLUMN "kbFilterTags" TEXT;
          ALTER TABLE "Agent" ADD COLUMN "uiEngineFormsEnabled" BOOLEAN DEFAULT FALSE;
          ALTER TABLE "Agent" ADD COLUMN "uiEngineLayoutsEnabled" BOOLEAN DEFAULT FALSE;
          ALTER TABLE "Agent" ADD COLUMN "canvasEnabled" BOOLEAN DEFAULT FALSE;
          ALTER TABLE "Agent" ADD COLUMN "canvasData" JSONB;
          ALTER TABLE "Agent" ADD COLUMN "fillersEnabled" BOOLEAN DEFAULT FALSE;
          ALTER TABLE "Agent" ADD COLUMN "fallbacks" TEXT;
        END IF;
      END $$;

      CREATE TABLE IF NOT EXISTS "Contact" (
        id TEXT PRIMARY KEY,
        name TEXT,
        phone TEXT UNIQUE NOT NULL,
        email TEXT,
        notes TEXT,
        stage TEXT DEFAULT 'NEW',
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS "Call" (
        id TEXT PRIMARY KEY,
        "agentId" TEXT NOT NULL REFERENCES "Agent"(id),
        "callSid" TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        duration INTEGER,
        transcript TEXT,
        "recordingUrl" TEXT,
        "contactId" TEXT REFERENCES "Contact"(id),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log("Database tables initialized successfully.");
  } catch (error) {
    console.error("Error initializing database tables:", error);
  }
}
