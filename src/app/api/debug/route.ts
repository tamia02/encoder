import { NextResponse } from "next/server";

export async function GET() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY;
  
  let dbStatus = "unknown";
  let dbError = null;

  try {
     const { db } = await import("@/lib/db");
     // Just a simple query to check connection
     // @ts-ignore
     await db.workspace.findMany({});
     dbStatus = "connected";
  } catch (e: any) {
     dbStatus = "failed";
     dbError = e.message;
  }

  return NextResponse.json({
    hasPublishable: !!publishableKey,
    hasSecret: !!secretKey,
    publishableStart: publishableKey?.substring(0, 12),
    secretStart: secretKey?.substring(0, 12),
    publishableLength: publishableKey?.length,
    secretLength: secretKey?.length,
    dbStatus,
    dbError,
    env: process.env.NODE_ENV,
  });
}
