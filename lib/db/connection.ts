import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USERNAME || process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function executeQuery(query: string, values?: any[]) {
  try {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.execute(query, values || []);
      return results;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

export default pool;
