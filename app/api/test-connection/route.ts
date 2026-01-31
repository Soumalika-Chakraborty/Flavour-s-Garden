import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db/connection';

export async function GET(request: NextRequest) {
  try {
    console.log('[v0] Testing database connection...');
    
    // Test the connection by querying the employees table
    const query = 'SELECT COUNT(*) as count FROM tblEmployees LIMIT 1';
    const results = await executeQuery(query);
    
    console.log('[v0] Database connection successful!');
    console.log('[v0] Query result:', results);

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        query: 'SELECT COUNT(*) as count FROM tblEmployees',
        result: results,
      },
    });
  } catch (error: any) {
    console.error('[v0] Database connection failed:', error.message);
    
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      message: error.message,
      details: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
      },
    }, { status: 500 });
  }
}
