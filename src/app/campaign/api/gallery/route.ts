import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = Math.min(Number(searchParams.get('limit') || 50), 100)
  const offset = Number(searchParams.get('offset') || 0)

  const db = supabaseAdmin()
  const { data, error, count } = await db
    .from('gallery')
    .select('id, image_url, inspiration, inspiration_words, charity_name, charity_logo, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ items: data, total: count }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
