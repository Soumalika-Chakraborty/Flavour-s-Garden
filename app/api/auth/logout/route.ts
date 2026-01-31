import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );

    // Clear auth token from cookie if using HTTP-only cookies
    response.cookies.set('authToken', '', { maxAge: 0 });

    return response;
  } catch (error) {
    console.error('[Logout Error]:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}
