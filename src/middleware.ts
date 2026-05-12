import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Serves the static yacht landing (index.html → public/landing.html via prebuild)
 * at the site root while the Next.js app lives under /campaign.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/landing.html', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
