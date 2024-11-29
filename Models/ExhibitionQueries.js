const db = require('./db.js');
const arts = require('./artsQueries.js')
try {
db.connect();
}
catch (error) {
console.error('Error connecting to the database:', error);
}

class ExhibitionModel {
    constructor(db) {
      this.db = db;
      let CurrentExhibitonID = 780000; // dummy for now 
    }
  
    
    // the time has to be in the formate (YYYY-MM-DD HH:MM:SS) eg (2024-11-29 14:30:00)
    // to do --> how to get the IDs to insert them 
    async StartExhibition(title, theme , startTime , endTime ) {
      
      try{
        const query = `
       INSERT INTO exhibition (exhibitionid ,title , theme, starttime , endtime )
       values($1 , $2 , $3 ,$4 , $5)
       RETURNING *;
       `;
        const values = [CurrentExhibitionID ,title , theme , startTime , endTime ];
        const result = await this.db.query(query , values);
        CurrentID++;
        return result.rows[0];
    
      }
    
     catch(err){
        console.error("Error adding Exhibition", err.message);
        throw err;
      }

    }

   
    async DisplayExhibition() {
        try {
          const query = `SELECT * FROM exhibition`;
          const result = await this.db.query(query);
      
          const currentTime = new Date();
          const availableExhibition = result.rows.filter(exhibition => {
            const startTime = new Date(exhibition.starttime);
            const endTime = new Date(exhibition.endtime);
      
            return currentTime >= startTime && currentTime <= endTime;
          });
      
          return availableExhibition;

        } catch (err) {
          console.error("Error fetching exhibition", err.message);
          throw err;
        }
      }

      async GetArtsInExhibition(exhibitionID) {
        try {
          const query = `
          SELECT a.*
          FROM exhibitionarts ea
          JOIN arts a ON ea.artid = a.artid
          WHERE ea.exhibitionid = $1;
        `;
        const values = [exhibitionID];
    
        
        const result = await this.db.query(query, values);
    
       
        return result.rows;
      } catch (err) {
        console.error('Error getting arts', err.message);
        throw err;
      }


}

async addArtToExhibition(artID , ExhibitionID){
  try {
    const query = `
    INSERT INTO exhibitionarts (artid , exhibitionid)
    VALUES ($1 , $2)
    RETURNING *

  `;
  const values = [artID,exhibitionID];

  
  const result = await this.db.query(query, values);

 
  return result.rows[0];
} catch (err) {
  console.error('Error adding art to exhibition', err.message);
  throw err;
}
}

};

  module.exports =new ExhibitionModel(db); // Export an instance of the class