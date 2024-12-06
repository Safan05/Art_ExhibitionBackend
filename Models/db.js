const { Pool } = require('pg');
const connectionString = 'postgresql://ArtExh_owner:XBMfUr1Ca4Em@ep-bitter-heart-a5vu3nii-pooler.us-east-2.aws.neon.tech/ArtExh?sslmode=require';
const pool = new Pool({
  connectionString
});
module.exports = pool; // Export the pool instance
