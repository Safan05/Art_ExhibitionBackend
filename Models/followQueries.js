const db = require('./db.js');
try {
db.connect();
}
catch (error) {
console.error('Error connecting to the database:', error);
}

class FollowModel {
    constructor(db) {
      this.db = db; // Use the pool instance from `pg`
    }

    async follow(artistID, clientID) {
        try {
          const query = `
            INSERT INTO following (artistid, clientid)
            VALUES ($1, $2)
            RETURNING *;
          `;
          const values = [artistID, clientID];
          const result = await this.db.query(query, values);
          return result.rows[0]; // Return the newly created follow record
        } catch (err) {
          console.error('Error following artist:', err.message);
          throw err;
        }
      }

      async unfollow(artistID, clientID) {
        try {
          const query = `
            DELETE FROM following
            WHERE artistid = $1 AND clientid = $2;
          `;
          const values = [artistID, clientID];
          const result = await this.db.query(query, values);
          return result.rowCount > 0; // Return true if a row was changed (deleted)
        } catch (err) {
          console.error('Error unfollowing artist:', err.message);
          throw err;
        }
      }

      async countFollowers(artistID) {
        try {
          const query = `
            SELECT COUNT(*) AS follower_count
            FROM following
            WHERE artistid = $1;
          `;
          const values = [artistID];
          const result = await this.db.query(query, values);
          return parseInt(result.rows[0].follower_count, 10); // Return the follower count as a number
        } catch (err) {
          console.error('Error counting followers:', err.message);
          throw err;
        }
      }
 

}

module.exports =new FollowModel(db); // Export an instance of the class