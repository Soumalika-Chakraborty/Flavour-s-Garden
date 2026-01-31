import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';
import type { Employee } from '@/lib/entities/types';

export async function GET() {
  try {
    const query = 'SELECT * FROM tblEmployees';
    const results = await executeQuery(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      Employee_ID,
      First_Name,
      Last_Name,
      Role,
      Address,
      Outlet_ID,
      Date_of_Joining,
      Is_Active,
      Contact_No,
      Email,
      password,
    } = body;

    const query = `
      INSERT INTO tblEmployees 
      (Employee_ID, First_Name, Last_Name, Role, Address, Outlet_ID, Date_of_Joining, Is_Active, Contact_No, Email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      Employee_ID,
      First_Name,
      Last_Name,
      Role,
      Address,
      Outlet_ID,
      Date_of_Joining,
      Is_Active,
      Contact_No,
      Email,
      password,
    ]);

    return NextResponse.json(
      { success: true, message: 'Employee created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create employee' },
      { status: 500 }
    );
  }
}
