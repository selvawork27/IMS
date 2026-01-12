import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {getLicense, prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const licenses = await getLicense()
 
    return NextResponse.json({ success: true, licenses: licenses })
  } catch (error) {
    console.error('Invoices GET API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
