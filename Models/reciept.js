const db = require('./db.js');
try {
db.connect();
}
catch (error) {
console.error('Error connecting to the database:', error);
}
class RecieptModel{
    constructor(db) {
        this.db = db; // Use the pool instance from `pg`
      }

    async addReciept(recieptid, clientid ,descrtiption,artistid, artid , amount ){
        try{
            const query = `
             INSERT INTO reciept (recieptid, buyerid, artistid,artid,price,description,recieptdate)
             VALUES ($1, $2, $3, $4, $5, $6, now())
             RETURNING *;
            `;
            const values = [recieptid, clientid, artistid, artid, amount, descrtiption];
            const result = await this.db.query(query , values);
            return result.rows[0];
        }
        catch(err){
            console.error("Error adding new reciept", err.message);
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
}
module.exports=new RecieptModel(db);