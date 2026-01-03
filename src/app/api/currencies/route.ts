import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currencies = await prisma.currencie.findMany({
      orderBy: { code: "asc" },
    });
    return NextResponse.json({ currencies });
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
