const db = require('./db.js');
try {
db.connect();
}
catch (error) {
console.error('Error connecting to the database:', error);
}

class WishlistModel {
    constructor(db) {
      this.db = db; // Use the pool instance from `pg`
    }

    async addToWishlist(artID, clientID) {
        try {
          const query = `
            INSERT INTO wishlist (artid, clientid)
            VALUES ($1, $2)
            RETURNING *;
          `;
          const values = [artID, clientID];
          const result = await this.db.query(query, values);
          return result.rows[0]; // return the inserted row
        } catch (err) {
          console.error('Error adding to wishlist', err.message);
          throw err;
        }
      }

      async RemoveFromWishlst(artID, clientID) {
        try {
          const query = `
            DELETE FROM wishlist
            WHERE artid = $1 AND clientid = $2;
          `;
          const values = [artID, clientID];
          const result = await this.db.query(query, values);
          return result.rowCount > 0; // Return true if a row was changed (deleted)
        } catch (err) {
          console.error('Error unfollowing artist:', err.message);
          throw err;
        }
      }

      async getWishlist(clientID) {
        try {
            const query = `
            SELECT a.*
            FROM wishlist wh
            JOIN arts a ON wh.artid = a.artid
            WHERE wh.clientid = $1;
          `;
          const values = [clientID];
      
          
          const result = await this.db.query(query, values);
      
         
          return result.rows;
        } catch (err) {
          console.error('Error getting arts', err.message);
          throw err;
        }
  
  
  }
      
 

};

module.exports =new WishlistModel(db); // Export an instance of the class