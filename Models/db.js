const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Arts",
  password: "Abdallah#123@",
  port: 5432,
});
module.exports = pool; // Export the pool instance
