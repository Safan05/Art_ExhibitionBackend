const { Pool } = require('pg');
const connectionString = 'postgresql://';
const pool = new Pool({
  connectionString
});
pool.query('SELECT 1') // Simple query to test connection
  .then(() => console.log('Database connected successfully ✅'))
  .catch((err) => {console.error('Error connecting to the database ❌:', err.message); throw(err)});
module.exports = pool; // Export the pool instance
