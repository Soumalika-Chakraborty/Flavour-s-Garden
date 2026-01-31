import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const query = 'SELECT * FROM tblEmployees WHERE Employee_ID = ?';
    const results = await executeQuery(query, [id]);

    if (!results || (Array.isArray(results) && results.length === 0)) {
      return NextResponse.json(
        { success: false, error: 'Employee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: results[0] });
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch employee' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updates = Object.keys(body)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(body);

    const query = `UPDATE tblEmployees SET ${updates} WHERE Employee_ID = ?`;
    await executeQuery(query, [...values, id]);

    return NextResponse.json({
      success: true,
      message: 'Employee updated successfully',
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update employee' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const query = 'DELETE FROM tblEmployees WHERE Employee_ID = ?';
    await executeQuery(query, [id]);

    return NextResponse.json({
      success: true,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete employee' },
      { status: 500 }
    );
  }
}
