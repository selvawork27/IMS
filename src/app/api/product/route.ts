import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {getProduct, prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const products = await getProduct();
 
    return NextResponse.json({ success: true, products: products })
  } catch (error) {
    console.error('Invoices GET API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
