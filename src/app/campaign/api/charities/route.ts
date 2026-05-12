import { NextResponse } from 'next/server'
import { INSPIRED_CHARITIES } from '@/lib/charities-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(INSPIRED_CHARITIES, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
