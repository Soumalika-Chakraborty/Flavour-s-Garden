import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET() {
  try {
    const query = 'SELECT * FROM tblProduct';
    const results = await executeQuery(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      Product_ID,
      Product_Name,
      Menu_Category_ID,
      Price_Per_Unit,
      Image_Url,
      Product_Description,
      Allergen,
      Is_Veg,
      Recipe_ID,
      Ref_Key,
      Is_Recommended,
    } = body;

    const query = `
      INSERT INTO tblProduct 
      (Product_ID, Product_Name, Menu_Category_ID, Price_Per_Unit, Image_Url, Product_Description, Allergen, Is_Veg, Recipe_ID, Ref_Key, Is_Recommended)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(query, [
      Product_ID,
      Product_Name,
      Menu_Category_ID,
      Price_Per_Unit,
      Image_Url,
      Product_Description,
      Allergen,
      Is_Veg,
      Recipe_ID,
      Ref_Key,
      Is_Recommended,
    ]);

    return NextResponse.json(
      { success: true, message: 'Product created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
