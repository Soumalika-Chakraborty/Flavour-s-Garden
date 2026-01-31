import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const query = 'SELECT * FROM tblGRN WHERE PO_ID = ? LIMIT 1';
    const results = await executeQuery(query, [id]);

    if (!results || (Array.isArray(results) && results.length === 0)) {
      return NextResponse.json(
        { success: false, error: 'GRN record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: results[0] });
  } catch (error) {
    console.error('Error fetching GRN record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch GRN record' },
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

    const query = `UPDATE tblGRN SET ${updates} WHERE PO_ID = ?`;
    await executeQuery(query, [...values, id]);

    return NextResponse.json({
      success: true,
      message: 'GRN record updated successfully',
    });
  } catch (error) {
    console.error('Error updating GRN record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update GRN record' },
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
    const query = 'DELETE FROM tblGRN WHERE PO_ID = ?';
    await executeQuery(query, [id]);

    return NextResponse.json({
      success: true,
      message: 'GRN record deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting GRN record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete GRN record' },
      { status: 500 }
    );
  }
}
