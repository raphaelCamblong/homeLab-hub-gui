import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {    // Get the pathname of the request
    const path = request.nextUrl.pathname


    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    const publicPaths = ['/', '/auth/login']
    const isPublicPath = publicPaths.includes(path)

    if (isPublicPath && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (!isPublicPath && !session) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const roleBasedPaths = {
        '/monitoring': ['admin', 'operator'],
        '/monitoring/cluster': ['admin'],
        '/monitoring/nas': ['admin', 'operator']
    }

    const requiredRoles = Object.entries(roleBasedPaths).find(([route]) =>
        path.startsWith(route)
    )?.[1]

    if (requiredRoles && !requiredRoles.includes(session?.role as string)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/monitoring/:path*',
        '/service/:path*',
        '/notifications/:path*',
    ]
} 