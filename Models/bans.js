const db = require('./db.js');
const users = require('./userqueries.js')
try {
db.connect();
}
catch (error) {
console.error('Error connecting to the database:', error);
}

class BanModel {
    constructor(db) {
      this.db = db; 
    }
  

    async BanUser(Username , adminID , cause) {
      const userID = users.getUserIdByUsername(Username);

      try{
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
        const time =  new Date().toISOString().split('T')[0]; 

        const query1 = `
        INSERT INTO bannedusers (bannedid , adminid , cause , date)
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
    async DeleteArt(artID , admin  , cause){
        const adminID = users.getUserIdByUsername(admin);
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
        const time =  new Date().toISOString().split('T')[0]; 

        const query1 = `
        INSERT INTO deletedarts (artid , adminid , cause , deleteddate)
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
            SELECT 
                u1.username AS banned_user, 
                u2.username AS admin_user
            FROM 
                bannedusers bu
            JOIN 
                users u1 ON bu.user_id = u1.id
            JOIN 
                users u2 ON bu.admin_id = u2.id;
        `;
        const result = await this.db.query(query);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
  async unBanUser(Username , adminID) {
    const userID = users.getUserIdByUsername(Username);

    try{
      const query1 = `
      update users
      SET status = $1 
      where userid = $2`;
      const values1 = ["active" , userID];  
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
      const query = 'SELECT * FROM deletedarts';
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