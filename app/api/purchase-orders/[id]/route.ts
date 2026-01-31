import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const query = 'SELECT * FROM tblPurchase_Order_HDR WHERE PO_ID = ?';
    const results = await executeQuery(query, [id]);

    if (!results || (Array.isArray(results) && results.length === 0)) {
      return NextResponse.json(
        { success: false, error: 'Purchase order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: results[0] });
  } catch (error) {
    console.error('Error fetching purchase order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch purchase order' },
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

    const query = `UPDATE tblPurchase_Order_HDR SET ${updates} WHERE PO_ID = ?`;
    await executeQuery(query, [...values, id]);

    return NextResponse.json({
      success: true,
      message: 'Purchase order updated successfully',
    });
  } catch (error) {
    console.error('Error updating purchase order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update purchase order' },
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
    const query = 'DELETE FROM tblPurchase_Order_HDR WHERE PO_ID = ?';
    await executeQuery(query, [id]);

    return NextResponse.json({
      success: true,
      message: 'Purchase order deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting purchase order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete purchase order' },
      { status: 500 }
    );
  }
}
