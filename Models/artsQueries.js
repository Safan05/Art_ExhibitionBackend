const db = require('./db.js');
const users = require("./userqueries.js");
class ArtsModel {
    constructor(db) {
      this.db = db; // Use the pool instance from `pg`
    }
  async getmaxId(){
    try{
    const query = 'SELECT MAX(artid) FROM arts';
    const result = await this.db.query(query);
    return result.rows[0].max;
    }
    catch(err){
      console.log(err);
      throw err;
    }
    }
   async getArtById(artID){
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
        const query = `SELECT * FROM arts WHERE theartistid= $1 AND status='available'`;
        const result = await this.db.query(query, [artistId]);
        return result.rows;
      } catch (error) {
        console.error('Error fetching arts :', error);
        throw error;
      }
    }

    // getting all the arts with a newer to older ordering (reverse the rows)
    async getArtsNew() {
      try {
        const query = `SELECT * FROM ARTS WHERE status='available' ORDER BY releasedate DESC`;
        const result = await this.db.query(query);
        return result.rows;
      } 
      catch (error) {
        
      console.error('Error getting arts:', error);
      throw error;
      }
    }
    async getArtsLimit(){
      try{
        const query = 'SELECT * FROM arts LIMIT 5';
        const result = await this.db.query(query);
        return result.rows;
      }
      catch(err){
        console.log(err);
        throw err;
      }
    }
    async getMaxRateId(){
      try{
        const query = 'SELECT MAX(rateid) FROM reviews';
        const result = await this.db.query(query);
        return result.rows[0].max;
      }
      catch(err){
        console.log(err);
        throw err;
      }
    }
    async RateArt(userid ,artID , rate , comment){
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

    async AddArt(artID , theartistId , photo , artname , baseprice , releasedate  , description){

      try{
        console.log('Adding art');
        const query= 
        `INSERT INTO arts (artid , theartistid , photo , artname , baseprice , releasedate , description )
        values($1 ,$2 ,$3 ,$4 ,$5 , $6 ,$7)
        RETURNING *`

        const values = [artID , theartistId , photo , artname , baseprice , releasedate , description]
        const result = await this.db.query(query , values);
        return result.rows[0];

      }
      catch(err){
        console.error("error adding art" ,err.message );
      }
    }

    async UpdateArt(artID, artname, baseprice, description) {
      try {
        console.log('Updating art');
        const query = `
          UPDATE arts
          SET artname = $1, baseprice = $2, description = $3
          WHERE artid = $4
          RETURNING *`;
        
        const values = [artname, baseprice, description, artID];
        const result = await this.db.query(query, values);
        
        return result.rows[0];
      } catch (err) {
        console.error("Error updating art", err.message);
      }
    }
async getArtsCount(){
  try{
    const query = 'SELECT COUNT(*) FROM arts WHERE status = $1';
    const result = await this.db.query(query , ['available']);
    return result.rows[0].count;
  }
  catch(err){
    console.log(err);
    throw err;
  }
}
async deleteArt(artID){
  try{
    const query = 'DELETE FROM arts WHERE artid = $1';
    const result = await this.db.query(query , [artID]);
    return result.rows;
  }
  catch(err){
    console.error('Error deleting the art:', err.message);
    throw err;
  }
}
  }
  
  module.exports =new ArtsModel(db); // Export an instance of the class