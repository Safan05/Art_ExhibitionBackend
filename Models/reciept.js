const db = require('./db.js');

class RecieptModel{
    constructor(db) {
        this.db = db; // Use the pool instance from `pg`
      }

    async addReciept(recieptid, clientid ,descrtiption,artistid, artid , amount  ){
        try{
            const query = `
             INSERT INTO reciept (recieptid, buyerid, artistid,artid,price,description,recieptdate)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *;
            `;
            const d = new Date();
            const values = [recieptid, clientid, artistid, artid, amount, descrtiption ,d];
            const result = await this.db.query(query , values);
            return result.rows[0];
        }
        catch(err){
            console.error("Error adding new reciept", err);
            throw err;
        }
    }
    async getMaxId(){
        try{
        const query = 'SELECT MAX(recieptid) FROM reciept';
        const result = await this.db.query(query);
        return result.rows[0].max;
        }
        catch(err){
          console.log(err);
          throw err;
        }}  
    async getRecieptById(recieptid){
        try{
            const query = 'SELECT * FROM reciept WHERE recieptid = $1';
            const values = [recieptid];
            const result = await this.db.query(query , values);
            return result.rows[0];
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
    async getRecieptByArtist(artistid){
        try{
            const query = `
            SELECT * FROM reciept
            WHERE artistid = $1
           ;
            `;
            const values = [artistid];
            const result = await this.db.query(query , values);
            return result.rows;
        }
        catch(err){
            console.error("Error loading reciept", err.message);
            throw err;
        }
    }
    async getRecieptByClient(clientid){
        try{
            const query = `
            SELECT * FROM reciept
            WHERE buyerid = $1
           ;
            `;
            const values = [clientid];
            const result = await this.db.query(query , values);
            return result.rows;
        }
        catch(err){
            console.error("Error loading reciept", err.message);
            throw err;
        }
    }
    async getTotalSalesThisMonth(){
        try{
            const query = `
            SELECT SUM(price) FROM reciept
            WHERE EXTRACT(MONTH FROM recieptdate) = EXTRACT(MONTH FROM CURRENT_DATE)
            AND EXTRACT(YEAR FROM recieptdate) = EXTRACT(YEAR FROM CURRENT_DATE)
            ;
            `;
            const result = await this.db.query(query);
            return result.rows[0].sum;
        }
        catch(err){
            console.error("Error loading reciept", err.message);
            throw err;
        }
    }
    async getRecieptsCountForThisYear() {
        try {
            const query = `
                SELECT EXTRACT(MONTH FROM recieptdate) AS month, COUNT(*) AS count
                FROM reciept
                WHERE EXTRACT(YEAR FROM recieptdate) = EXTRACT(YEAR FROM CURRENT_DATE)
                GROUP BY EXTRACT(MONTH FROM recieptdate)
                ORDER BY month;
            `;
            const result = await this.db.query(query);
            return result.rows;
        } catch (err) {
            console.error("Error loading reciept", err.message);
            throw err;
        }
    }
}
module.exports=new RecieptModel(db);