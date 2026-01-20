import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id}=await params;
    console.log("Backend hit for ID:", id);
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clientLicense = await prisma.clientLicense.findUnique({
      where: { id: id },
      include: {
        client: true,
        plan: true,
        invoices:true
      }
    });

    if (!clientLicense) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: clientLicense });
  } catch (error) {
    console.error('API_ERROR:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}