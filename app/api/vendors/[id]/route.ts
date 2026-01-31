import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const query = 'SELECT * FROM tblVendor_Details WHERE Vendor_ID = ?';
    const results = await executeQuery(query, [id]);

    if (!results || (Array.isArray(results) && results.length === 0)) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: results[0] });
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendor' },
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

    const query = `UPDATE tblVendor_Details SET ${updates} WHERE Vendor_ID = ?`;
    await executeQuery(query, [...values, id]);

    return NextResponse.json({
      success: true,
      message: 'Vendor updated successfully',
    });
  } catch (error) {
    console.error('Error updating vendor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update vendor' },
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
    const query = 'DELETE FROM tblVendor_Details WHERE Vendor_ID = ?';
    await executeQuery(query, [id]);

    return NextResponse.json({
      success: true,
      message: 'Vendor deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete vendor' },
      { status: 500 }
    );
  }
}
