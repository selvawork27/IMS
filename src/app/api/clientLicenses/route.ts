import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const clientlicenses = await prisma.clientLicense.findMany({
      include: { plan: true, client: true } 
    });

    return NextResponse.json({ success: true, data: clientlicenses })
  } catch (error) {
    console.error('API GET Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json();
    const { clientId, workspaceId, planId, notes } = body;

    if (!clientId || !workspaceId || !planId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 5);

    const renewalDate = new Date();
    if (plan.billingCycle === 'MONTHLY') {
      renewalDate.setMonth(startDate.getMonth() + 1);
    } else if (plan.billingCycle === 'YEARLY') {
      renewalDate.setFullYear(startDate.getFullYear() + 1);
    }
    const newLicense = await prisma.clientLicense.create({
      data: {
        clientId,
        workspaceId,
        planId,
        notes,
        startDate,
        renewalDate,
        endDate,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, data: newLicense }, { status: 201 });

  } catch (error: any) {
    console.error("POST_ERROR", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "License already exists for this client." }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}