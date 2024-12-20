const { Pool } = require('pg');
const connectionString = 'postgresql://ArtExh_owner:XBMfUr1Ca4Em@ep-rapid-king-a5yjn894-pooler.us-east-2.aws.neon.tech/ArtExh?sslmode=require';
const pool = new Pool({
  connectionString
});
pool.query('SELECT 1') // Simple query to test connection
  .then(() => console.log('Database connected successfully ✅'))
  .catch((err) => {console.error('Error connecting to the database ❌:', err.message); throw(err)});
module.exports = pool; // Export the pool instance
