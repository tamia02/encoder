import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function verify() {
  const connectionString = process.env.DATABASE_URL;
  console.log("Verifying connection to:", connectionString);
  
  const pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 5000,
  });

  try {
    const res = await pool.query('SELECT NOW()');
    console.log("Connection successful:", res.rows[0]);
    
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("Current tables in 'public' schema:");
    tables.rows.forEach(row => console.log(` - ${row.table_name}`));
    
    await pool.end();
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  }
}

verify();
