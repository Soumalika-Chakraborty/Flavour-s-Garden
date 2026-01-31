import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

const DEMO_PASSWORD = 'demo123'; // Change this in production

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeId, password } = body;

    if (!employeeId || !password) {
      return NextResponse.json(
        { error: 'Missing credentials' },
        { status: 400 }
      );
    }

    // Query database for employee
    const query = 'SELECT Employee_ID, First_Name, Last_Name, Role, Email FROM tblEmployees WHERE Employee_ID = ?';
    const results = await executeQuery(query, [employeeId]);

    if (!results || (Array.isArray(results) && results.length === 0)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const employee = Array.isArray(results) ? results[0] : results;

    // For demo purposes, accept the demo password
    // In production, use bcrypt to hash and verify passwords
    if (password !== DEMO_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(
      JSON.stringify({
        employeeId: employee.Employee_ID,
        name: `${employee.First_Name} ${employee.Last_Name}`,
        role: employee.Role,
        iat: Date.now(),
      })
    ).toString('base64');

    return NextResponse.json(
      {
        success: true,
        token,
        employeeId: employee.Employee_ID,
        name: `${employee.First_Name} ${employee.Last_Name}`,
        role: employee.Role,
        message: 'Login successful',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Auth Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
