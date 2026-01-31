import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET() {
  try {
    const query = 'SELECT * FROM tblVendor_Details';
    const results = await executeQuery(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendors' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      Vendor_ID,
      Vendor_Address,
      Vendor_Type,
      Vendor_Contact,
      Vendor_GST_No,
    } = body;

    const query = `
      INSERT INTO tblVendor_Details 
      (Vendor_ID, Vendor_Address, Vendor_Type, Vendor_Contact, Vendor_GST_No)
      VALUES (?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      Vendor_ID,
      Vendor_Address,
      Vendor_Type,
      Vendor_Contact,
      Vendor_GST_No,
    ]);

    return NextResponse.json(
      { success: true, message: 'Vendor created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create vendor' },
      { status: 500 }
    );
  }
}
