import { NextResponse } from "next/server";

export async function GET() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY;
  
  return NextResponse.json({
    hasPublishable: !!publishableKey,
    hasSecret: !!secretKey,
    publishableStart: publishableKey?.substring(0, 12),
    secretStart: secretKey?.substring(0, 12),
    publishableLength: publishableKey?.length,
    secretLength: secretKey?.length,
  });
}
