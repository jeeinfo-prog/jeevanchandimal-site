import { NextResponse } from 'next/server'

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Dashboard"',
    },
  })
}

export function middleware(req) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next()
  }

  const user = process.env.ADMIN_DASHBOARD_USER
  const pass = process.env.ADMIN_DASHBOARD_PASS

  const auth = req.headers.get('authorization')

  if (!auth || !auth.startsWith('Basic ')) {
    return unauthorized()
  }

  const base64 = auth.split(' ')[1]
  const decoded = Buffer.from(base64, 'base64').toString()

  const [username, password] = decoded.split(':')

  if (username !== user || password !== pass) {
    return unauthorized()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}