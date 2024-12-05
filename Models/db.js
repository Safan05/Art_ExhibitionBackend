const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Arts_exhibition",
  password: "mine2372004",
  port: 5432,
});
module.exports = pool; // Export the pool instance
