const db = require('./db.js');

class AuctionModel {
    constructor(db) {
      this.db = db;
      let CurrentID = 680000; // dummy for now 
    }
  
    async getMaxId(){
      try{
      const query = 'SELECT MAX(auctionid) FROM auction';
      const result = await this.db.query(query);
      return result.rows[0].max;
      }
      catch(err){
        console.log(err);
        throw err;
      }}
    
    // the time has to be in the formate (YYYY-MM-DD HH:MM:SS) eg (2024-11-29 14:30:00)
    // to do --> how to get the IDs to insert them 
    async getAuctionByID(auctionID) {
      try{
        const query=`SELECT * FROM auction WHERE auctionid = $1`;

        const values=[auctionID];
        const result = await this.db.query(query,values);
        return result.rows[0];
      }
      catch(err){
        console.error("Error fetching auction", err.message);
        throw err;
      }
    }
    async RequestAuction(auctionID, artID, startTime, endDTime, startingBid) {
        
        try{
          const query = `
        INSERT INTO auction (auctionid ,artid , starttime , endtime , startingbid , status)
        values($1 , $2 , $3 ,$4 , $5 , 'pending')
        RETURNING *;
        `;
          const values = [auctionID ,artID , startTime , endDTime , startingBid ];
          const result = await this.db.query(query , values);
          return result.rows[0];
      
        }
      
      catch(err){
          console.error("Error adding Auction", err.message);
          throw err;
        }
    }
    
    async StartAuction(auctionID, startTime, endDTime, startingBid) {
      try {
          const query = `
              UPDATE auction
              SET starttime = $2, endtime = $3, startingbid = $4, status = 'approved'
              WHERE auctionid = $1
              RETURNING *;
          `;
          const values = [auctionID, startTime, endDTime, startingBid];
          const result = await this.db.query(query, values);
          return result.rows[0];
      } catch (err) {
          console.error("Error starting Auction", err.message);
          throw err;
      }
  }
  
  async acceptAuction(auctionID) {
    try {
        const query = `
            UPDATE auction
            SET status = 'approved'
            WHERE auctionid = $1
            RETURNING *;
        `;
        const values = [auctionID];
        const result = await this.db.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error approving Auction", err.message);
        throw err;
    }
  } 

  async rejectAuction(auctionID) {
    try {
        const query = `
            UPDATE auction
            SET status = 'cancelled'
            WHERE auctionid = $1
            RETURNING *;
        `;
        const values = [auctionID];
        const result = await this.db.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error rejecting Auction", err.message);
        throw err;
    }
  } 
  
  async deleteAuction(auctionID) {
    try {
        const query = `
            DELETE FROM auction
            WHERE auctionid = $1
            RETURNING *;
        `;
        const values = [auctionID];
        const result = await this.db.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error deleting Auction", err.message);
        throw err;}
  }
    async DisplayAuctions() {
        try {
          const query = `SELECT u.name, u.profilepic , ar.photo , ar.artname , ar.description, au.auctionid , 
          au.startingbid, au.highestbid, au.starttime , au.endtime , au.status
          FROM users AS u , arts AS ar , auction AS au
          Where u.userid = ar.theartistid AND ar.artid = au.artid`;
          const result = await this.db.query(query);
      
          const currentTime = new Date();
          const availableAuctions = result.rows.filter(auction => {
            const startTime = new Date(auction.starttime);
            const endTime = new Date(auction.endtime);
      
            return currentTime >= startTime && currentTime <= endTime && auction.status ==="approved";
          });
      
          return availableAuctions;

        } catch (err) {
          console.error("Error fetching auctions:", err.message);
          throw err;
        }
      }

      async UpdateHighestBid(auctionID, HighestBid) {
        try {
          // getting the previous highest bid
          const query1 = `
            SELECT highestbid
            FROM auction
            WHERE auctionid = $1;
          `;
          const value = [auctionID];
          const result = await this.db.query(query1, value);
      
          
          if (result.rows.length === 0) {
            throw new Error(`Auction with ID ${auctionID} not found.`);
          }
      
          let currentHighest = result.rows[0].highestbid;
      
         
          if (HighestBid > currentHighest) {
            try {

              // trying to update highest bid
              const updateQuery = `   

                UPDATE auction
                SET highestbid = $1
                WHERE auctionid = $2;
              `;
              const updateValues = [HighestBid, auctionID];
              await this.db.query(updateQuery, updateValues);
      
              return { success: true, msg: "Highest bid updated successfully." };
            } catch (err) {
              console.error("Failed to update highest bid:", err);
              throw err;
            }
          } else {
            return {
              success: false,
              msg: "The current bid is smaller than or equal to the highest bid.",
            };
          }
        } catch (err) {
          console.error("Error updating highest bid:", err.message);
          throw err;
        }
      }
      
      async GetAuctionRequests() {
        try {
            const query = `
                SELECT auctionid,startingbid,starttime,endtime,artname,photo,name FROM auction,arts,users
                WHERE auction.status = 'pending' and auction.artid = arts.artid and arts.theartistid = users.userid;
            `;
            
            const result = await this.db.query(query);
            return result.rows;
        } catch (err) {
            console.error("Error getting Auction", err.message);
            throw err;
          }
      }
   async DisplayAuctionsLimit(){
    try {
      const query = `SELECT u.name, u.profilepic , ar.photo , ar.artname , ar.description, au.auctionid , 
      au.startingbid, au.highestbid, au.starttime , au.endtime , au.status
      FROM users AS u , arts AS ar , auction AS au
      Where u.userid = ar.theartistid AND ar.artid = au.artid LIMIT 3`;
      const result = await this.db.query(query);
  
      const currentTime = new Date();
      const availableAuctions = result.rows.filter(auction => {
        const startTime = new Date(auction.starttime);
        const endTime = new Date(auction.endtime);
  
        return currentTime >= startTime && currentTime <= endTime && auction.status ==="approved";
      });
  
      return availableAuctions;

    } catch (err) {
      console.error("Error fetching auctions:", err.message);
      throw err;
    }
  }
    async getAuctionsCount() {
      try {
        const query = `SELECT COUNT(*) FROM auction WHERE status = 'approved';`;
        const result = await this.db.query(query);
        return result.rows[0].count;
      } catch (err) {
        console.error("Error fetching auctions count:", err.message);
        throw err;
      }
    }

    async getWinnerAuction(auctionID) {
      try {
        console.log(auctionID);
        const query = `
          SELECT name
          FROM bids , users
          WHERE auctionid = $1 and biddingclient = userid
          ORDER BY amount DESC
          LIMIT 1;
        `;
        const values = [auctionID];
        const result = await this.db.query(query, values);
        return result.rows[0].name;
      } catch (err) {
        console.error("Error fetching winner auction:", err.message);
        throw err;
      }
    }
    async getWonAuctions(clientID) {
      try {
        const query = `
          SELECT auctionid, auction.artid, starttime, endtime, startingbid, highestbid,photo,artname
          FROM auction, arts
          WHERE auction.artid = arts.artid and auctionid IN (
            SELECT auctionid
            FROM bids
            WHERE biddingclient = $1
            ORDER BY amount DESC
          ); 
          
        `;
        const values = [clientID];
        const result = await this.db.query(query, values);
        const filteredAuctions = result.rows.filter(auction => {
          const currentTime = new Date();
          const endTime = new Date(auction.endtime);
          return currentTime.getTime() > endTime.getTime();
        });
        return filteredAuctions;
      } catch (err) {
        console.error("Error fetching won auctions:", err.message);
        throw err;
      }
    }
};

  module.exports =new AuctionModel(db); // Export an instance of the class