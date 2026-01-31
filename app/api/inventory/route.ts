import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET() {
  try {
    const query = 'SELECT * FROM tblInventory';
    const results = await executeQuery(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      Item_ID,
      Outlet_ID,
      Ingredient_Name,
      Current_Qty,
      Unit_of_Measurement,
      Min_Stock_Level,
      Reorder_Level,
      Priority,
    } = body;

    const query = `
      INSERT INTO tblInventory 
      (Item_ID, Outlet_ID, Ingredient_Name, Current_Qty, Unit_of_Measurement, Min_Stock_Level, Reorder_Level, Priority)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      Item_ID,
      Outlet_ID,
      Ingredient_Name,
      Current_Qty,
      Unit_of_Measurement,
      Min_Stock_Level,
      Reorder_Level,
      Priority,
    ]);

    return NextResponse.json(
      { success: true, message: 'Inventory item created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating inventory item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create inventory item' },
      { status: 500 }
    );
  }
}
