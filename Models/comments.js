const db = require('./db.js');
try {
db.connect();
}
catch (error) {
console.error('Error connecting to the database:', error);
}
class commentsmodel{
    constructor(db) {
        this.db = db; // Use the pool instance from `pg`
      }

     // works for updating also
    async addComment(clientid , artid , comments , rate ){
        
        try{
            const query = `
             INSERT INTO reviews (clientid, artid, comments, rate)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (clientid, artid)
             DO UPDATE
             SET comments = EXCLUDED.comments, rate = EXCLUDED.rate
             RETURNING *;
            `;
            const values = [clientid , artid, comments , rate];
            const result = await this.db.query(query , values);
            return result.rows[0];
        }
        catch(err){
            console.error("Error adding new comment", err.message);
            throw err;
        }
    }
    async getCommentsOnArt(artid){
        try{
            const query = `
            SELECT * FROM reviews
            WHERE artid = $1
           ;
            `;
            const values = [artid];
            const result = await this.db.query(query , values);
            return result.rows;
        }
        catch(err){
            console.error("Error loading Comments", err.message);
            throw err;
        }
    }
    
    async deleteCommentsonart(artid){
        try{
            const query = 'DELETE FROM reviews WHERE artid = $1';
            const values = [artid];
            const result = await this.db.query(query , values);
            return result.rows;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    async deleteCommentsByuser(userid){
        try{
            const query = 'DELETE FROM reviews WHERE clientid = $1';
            const values = [userid];
            const result = await this.db.query(query , values);
            return result.rows;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    async deletecomment(artid , clientid){
        try{
            const query = 'DELETE FROM reviews WHERE clientid = $1 and artid =$2';
            const values = [clientid , artid];
            const result = await this.db.query(query , values);
            return result.rows;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}
module.exports=new commentsmodel(db);