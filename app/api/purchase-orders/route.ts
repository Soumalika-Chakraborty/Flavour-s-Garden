import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET() {
  try {
    const query = 'SELECT * FROM tblPurchase_Order_HDR';
    const results = await executeQuery(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch purchase orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      PO_ID,
      Purchase_Order_Date,
      Payment_Terms,
      Vendor_ID,
      Delivery_Date,
      Status,
      Total_Amount,
      SGST,
      CGST,
      Discount,
      Net_Amount,
    } = body;

    const query = `
      INSERT INTO tblPurchase_Order_HDR 
      (PO_ID, Purchase_Order_Date, Payment_Terms, Vendor_ID, Delivery_Date, Status, Total_Amount, SGST, CGST, Discount, Net_Amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      PO_ID,
      Purchase_Order_Date,
      Payment_Terms,
      Vendor_ID,
      Delivery_Date,
      Status,
      Total_Amount,
      SGST,
      CGST,
      Discount,
      Net_Amount,
    ]);

    return NextResponse.json(
      { success: true, message: 'Purchase order created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating purchase order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create purchase order' },
      { status: 500 }
    );
  }
}
