import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma, getAllCLientLicense } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const clientlicenses = await getAllCLientLicense();
 
    return NextResponse.json({ success: true, Clientlicenses: clientlicenses })
  } catch (error) {
    console.error('API GET Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json();
    const { clientId, workspaceId, licenseId, notes } = body;

    if (!clientId || !workspaceId || !licenseId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const newClientLicense = await prisma.clientLicense.create({
      data: {
        clientId,
        workspaceId,
        licenseId,
        notes,
        isActive: true,
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: newClientLicense 
    }, { status: 201 });

  } catch (error: any) {
    console.error("PRISMA_CREATE_ERROR", error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "This client already has this specific license assigned." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}