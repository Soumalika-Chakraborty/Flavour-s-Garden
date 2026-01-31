import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    // Decode token (in production, use JWT verification)
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
      return NextResponse.json(
        { success: true, user: decoded },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('[Auth Verify Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
