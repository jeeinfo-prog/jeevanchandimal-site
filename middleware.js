import { NextResponse } from 'next/server'

function unauthorized() {
  return new NextResponse(null, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Dashboard"',
      'Cache-Control': 'no-store',
    },
  })
}

export function middleware(req) {
  const { pathname } = req.nextUrl

  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi = pathname.startsWith('/api/admin')

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next()
  }

  const expectedUser = process.env.ADMIN_DASHBOARD_USER
  const expectedPass = process.env.ADMIN_DASHBOARD_PASS

  if (!expectedUser || !expectedPass) {
    return new NextResponse(null, {
      status: 500,
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  }

  const authHeader = req.headers.get('authorization') || ''

  if (!authHeader.startsWith('Basic ')) {
    return unauthorized()
  }

  try {
    const base64 = authHeader.slice(6).trim()
    const decoded = Buffer.from(base64, 'base64').toString('utf8')
    const splitIndex = decoded.indexOf(':')

    if (splitIndex === -1) {
      return unauthorized()
    }

    const username = decoded.slice(0, splitIndex)
    const password = decoded.slice(splitIndex + 1)

    if (username !== expectedUser || password !== expectedPass) {
      return unauthorized()
    }

    const res = NextResponse.next()
    res.headers.set('Cache-Control', 'no-store')
    return res
  } catch (err) {
    return unauthorized()
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}