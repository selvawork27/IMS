import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {getPlan, prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const plans = await getPlan()
 
    return NextResponse.json({ success: true, plans: plans })
  } catch (error) {
    console.error('Invoices GET API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
