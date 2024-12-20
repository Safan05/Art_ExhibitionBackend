const db = require('./db.js');

class FeedBackModel{
    constructor(db) {
        this.db = db; // Use the pool instance from `pg`
      }
      async getMaxId(){
        try{
        const query = 'SELECT MAX(feedid) FROM feedback';
        const result = await this.db.query(query);
        return result.rows[0].max;
        }
        catch(err){
          console.log(err);
          throw err;
        }}
    async getFeedbackById(submitterid){
        try{
            const query = 'SELECT * FROM feedback WHERE submitterid = $1';
            const values = [submitterid];
            const result = await this.db.query(query , values);
            return result.rows[0];
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
    async addFeedback(feedid ,clientid, rate,description,date){
        try{
            const query = `
            INSERT INTO feedback (feedid , submitterid , rating , description , thedate)
            values($1 , $2, $3 , $4 , $5)
            RETURNING *;
            `;
            const values = [feedid , clientid, rate,description,date];
            const result = await this.db.query(query , values);
            return result.rows[0];
        }
        catch(err){
            console.error("Error adding feedback", err.message);
            throw err;
        }
    }
    async updateFeedback(submitterid , rate,description , date){
        try{
            const query = `
            UPDATE feedback
            SET rate = $1 , description = $2 , date = $3
            WHERE submitterid = $4
            RETURNING *;
            `;
            const values = [rate,description,date,submitterid];
            const result = await this.db.query(query , values);
            return result.rows[0];
        }
        catch(err){
            console.error("Error updating feedback", err.message);
            throw err;
        }
    }
    async getFeedbacks(){
        try{
            const query = 'SELECT * FROM feedback';
            const result = await this.db.query(query);
            return result.rows;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
    async deleteFeedback(submitterid){
        try{
            const query = 'DELETE FROM feedback WHERE submitterid = $1';
            const values = [submitterid];
            const result = await this.db.query(query , values);
            return result.rows;
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}
module.exports=new FeedBackModel(db);