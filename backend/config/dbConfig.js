const { Pool } = require('pg');

// Directly hard-code your database connection details here
const pool = new Pool({
  host: 'aws-0-us-east-1.pooler.supabase.com',           // Database host
  user: 'postgres.mwhhooogxrjjdtnsngts',  // Your database username
  password: 'BullCode2431', // Your database password
  database: 'postgres',       // Your database name
  port: 6543,                  // Database port (default for PostgreSQL)
});

module.exports = pool;
