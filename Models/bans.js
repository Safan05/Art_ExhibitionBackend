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
  

    async BanUser(Username , admin , cause) {
      const userID = users.getUserIdByUsername(username);
      const adminID = users.getUserIdByUsername(admin);

      try{
        const query2 = `
        update users
        SET status = $1 
        where userid = $2`;
    
        const values2 = ["banned" , userID];
        const result = await this.db.query(query2 , values2);
    
      }
    
     catch(err){
        console.error("Error updating user status", err.message);
        throw err;
      }

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

   
    
};

  module.exports =new BanModel(db); // Export an instance of the class