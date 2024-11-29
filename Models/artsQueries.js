const db = require('./db.js');
const users = require("./userqueries.js");
try {
db.connect();
}
catch (error) {
console.error('Error connecting to the database:', error);
}


class ArtsModel {
    constructor(db) {
      this.db = db; // Use the pool instance from `pg`
    }
   async getArtById( artID){
    try {
      const query = 'SELECT * FROM arts WHERE artid= $1';
      const result = await this.db.query(query, [artID]);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching arts :', error);
      throw error;
    }
   }
    // getting all the arts from an artist
    async getArtsbyArtist(artistId) {
      try {
        const query = 'SELECT * FROM arts WHERE artistid= $1';
        const result = await this.db.query(query, [artistId]);
        return result.rows[0];
      } catch (error) {
        console.error('Error fetching arts :', error);
        throw error;
      }
    }

    // getting all the arts with a newer to older ordering (reverse the rows)
    async getArtsNew() {
      try {
        const query = `SELECT * FORM ARTS`;
        const result = await this.db.query(query);
        result.reverse();
        return result;
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    }

    async RateArt(username ,artID , rate , comment){
    const userid = users.getUserIdByUsername(username);
      try{
        const query = `
        INSERT INTO reviews (clientid , artid , rate , comments)
        values($1 , $2 , $3 ,$4)
        RETURING *`
        const values = [userid , artID , rate , comment];
        const result = await this.db.query(query , values);
        return result.rows[0];
      }
      catch(err){
        console.error('Error adding the rate:', err.message);
        throw err;
      }
    }

  }
  
  module.exports =new ArtsModel(db); // Export an instance of the class