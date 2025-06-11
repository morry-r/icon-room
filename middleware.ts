import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: ['/admin/:path*']
}