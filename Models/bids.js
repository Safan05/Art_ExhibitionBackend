const db = require('./db.js');

class BidsModel{
    constructor(db) {
        this.db = db; // Use the pool instance from `pg`
      }

     // works for updating also
    async addBid(clientid , auctionid , amount,auctiondate ){
        try{
            let timestamp = new Date()-new Date(auctiondate);
            timestamp=Math.floor(timestamp/1000);
            const query = `
             INSERT INTO bids (biddingclient, auctionid, amount,bidtime)
             VALUES ($1, $2, $3,$4)
             ON CONFLICT (biddingclient, auctionid)
             DO UPDATE
             SET amount = EXCLUDED.amount, bidtime = EXCLUDED.bidtime
             RETURNING *;
            `;
            const values = [clientid, auctionid, amount,timestamp];
            const result = await this.db.query(query, values);
            console.log("q1 done");
    // Get the maximum bid
        const query2 = `SELECT MAX(amount) AS max FROM bids WHERE auctionid = $1`;
        const result2 = await this.db.query(query2, [auctionid]);
        const MaxBid = result2.rows[0].max; // Extract the 'max' value
console.log("q2 done");
        // Update auction with the highest bid
        const query3 = `UPDATE auction SET highestbid = $1 WHERE auctionid = $2`;
        const values3 = [MaxBid, auctionid];
        await this.db.query(query3, values3);
        }
        catch(err){
            console.error("Error adding new bid", err.message);
            throw err;
        }
}
}
module.exports=new BidsModel(db);