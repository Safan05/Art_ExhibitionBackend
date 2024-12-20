const db = require('./db.js');
const users = require('./userqueries.js')


class BanModel {
    constructor(db) {
      this.db = db; 
    }
  

    async BanUser(userID , adminID , cause) {
      try{
        console.log(userID);
        const query2 = `
        update users
        SET status = $1 
        where userid = $2`;
    
        const values2 = ["banned" , userID];
        await this.db.query(query2 , values2);
      }
    
     catch(err){
        console.error("Error updating user status", err.message);
        throw err;
      }
finally{
      try{
        const time =  new Date(); 

        const query1 = `
        INSERT INTO bannedusers (bannedid , adminid , cause , banneddate)
        values($1 , $2 , $3 , $4)
        RETURNING *;
        `;

        const values = [userID , adminID , cause , time];
        const result = await this.db.query(query1 , values);
        return result.rows[0];

      } catch(err){
        console.error("Error banning the user", err.message);
        throw err;
      }


    }
  }
    async DeleteArt(artID , adminID  , cause){
try{
        const query2 = `
        update arts
        SET status = $1 
        where artid = $2`;
    
        const values2 = ["deleted" , artID];
        const result = await this.db.query(query2 , values2);
    
      }
    
     catch(err){
        console.error("Error updating art status", err.message);
        throw err;
      }

      try{
        const time =  new Date(); 
        const query1 = `
        INSERT INTO deletedarts (artid , adminid , cause , deletedate)
        values($1 , $2 , $3 , $4)
        RETURNING *;
        `;

        const values = [artID , adminID , cause , time];
        const result = await this.db.query(query1 , values);
        return result.rows[0];

      } catch(err){
        console.error("Error banning the user", err.message);
        throw err;
      }
    
    
    };
async getBannedUsers() {
    try {
        const query = `
      SELECT * FROM users
      WHERE status = 'banned';
        `;
        const result = await this.db.query(query);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
  async unBanUser(Username , adminID) {
    const userID = await users.getUserIdByUsername(Username);
    try{
      const query1 = `
      update users
      SET status = $1 
      where userid = $2`;
      const values1 = ["available" , userID];  
      await this.db.query(query1 , values1);
      const query2 = `
      DELETE FROM bannedusers
      WHERE bannedid = $1 AND adminid = $2
      `
      const values2 = [userID , adminID];
      await this.db.query(query2 , values2);
      return "User unbanned successfully";
    }
  
   catch(err){
      console.error("Error updating user status", err.message);
      throw err;
    }
  }
  async removeDeletedArt(artID , adminID){
    try{
      const query1 = `
      DELETE FROM deletedarts
      WHERE artid = $1 AND adminid = $2
      `
      const values = [artID , adminID];
      await this.db.query(query1 , values);
      const query2 = `
      update arts
      SET status = $1 
      where artid = $2`;
  
      const values2 = ["available" , artID];
      await this.db.query(query2 , values2);
      return "Art removed successfully";
    }
  
   catch(err){
      console.error("Error removing the art", err.message);
      throw err;
  }
}
 async getBannedArtById(artID){
    try{
      const query = `
      SELECT * FROM deletedarts
      WHERE artid = $1
      `
      const values = [artID];
      const result = await this.db.query(query , values);
      return result.rows[0];
    }
    catch(err){
      console.log(err);
      throw err;
    }
  }   
 async getBannedArts(){
    try{
      const query = `SELECT * FROM Arts WHERE status = 'deleted' `;
      const result = await this.db.query(query);
      return result.rows;
    }
    catch(err){
      console.log(err);
      throw err;
    }
 } 
};

  module.exports =new BanModel(db); // Export an instance of the class