const db = require('./db.js');
try {
db.connect();
}
catch (error) {
console.error('Error connecting to the database:', error);
}
class BidsModel{
    constructor(db) {
        this.db = db; // Use the pool instance from `pg`
      }

     // works for updating also
    async addBid(clientid , auctionid , amount,auctiondate ){
        try{
            const timestamp = new Date()-auctiondate;
            const query = `
             INSERT INTO bids (biddingclient, auctionid, amount,timestamp)
             VALUES ($1, $2, $3,$4)
             ON CONFLICT (biddingclient, auctionid)
             DO UPDATE
             SET amount = EXCLUDED.amount, timestamp = EXCLUDED.timestamp
             RETURNING *;
            `;
            // getting the maximum bid
            const values = [clientid , auctionid, amount,timestamp];
            const result = await this.db.query(query , values);
            const query2=`select max(amount) from bids`;
            const result2=await this.db.query(query2);
            const MaxBid= result2.rows[0];
            const query3=`Update auction set highestbid=$1 where auctionid=$2`;
            const values3=[MaxBid,auctionid];
            await this.db.query(query3,values3);
            return result.rows[0];
        }
        catch(err){
            console.error("Error adding new bid", err.message);
            throw err;
        }
}
}
module.exports=new BidsModel(db);