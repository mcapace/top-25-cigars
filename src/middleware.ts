import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Secret key for internal preview mode (shows all cigars before reveal)
const PREVIEW_SECRET = 'C!garT!me2025';

export function middleware(request: NextRequest) {
  // PUBLIC ACCESS - No password required for normal visitors
  // The reveal schedule controls what they can see

  // Check for preview mode via URL parameter
  const previewKey = request.nextUrl.searchParams.get('preview');

  if (previewKey === PREVIEW_SECRET) {
    // Valid preview key - set a session cookie for convenience
    // This allows navigating without adding ?preview= to every URL
    const response = NextResponse.next();
    response.cookies.set('ca-preview', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|embed|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|html)).*)',
  ],
};
