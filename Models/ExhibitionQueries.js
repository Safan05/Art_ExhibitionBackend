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
    }
    async getMaxId(){
      try{
      const query = 'SELECT MAX(exhibitionid) FROM exhibition';
      const result = await this.db.query(query);
      return result.rows[0].max;
      }
      catch(err){
        console.log(err);
        throw err;
      }
}
    
    // the time has to be in the formate (YYYY-MM-DD HH:MM:SS) eg (2024-11-29 14:30:00)
    // to do --> how to get the IDs to insert them 
    async StartExhibition(exhibitionID,title, theme , startTime , endTime ) {
      
      try{
        const query = `
       INSERT INTO exhibition (exhibitionid ,title , theme, starttime , endtime )
       values($1 , $2 , $3 ,$4 , $5)
       RETURNING *;
       `;
        const values = [exhibitionID ,title , theme , startTime , endTime ];
        const result = await this.db.query(query , values);
        CurrentID++;
        return result.rows[0];
    
      }
    
     catch(err){
        console.error("Error adding Exhibition", err.message);
        throw err;
      }

    }
    async updateExhibition(exhibitionID,startTime , endTime ) {
      try{
        const query = `
        UPDATE exhibition
        SET starttime = $1 , endtime = $2
        WHERE exhibitionid = $3
        RETURNING *;
        `;
        const values = [startTime , endTime , exhibitionID];
        const result = await this.db.query(query , values);
        return result.rows[0];
      }
      catch(err){
        console.error("Error updating Exhibition", err.message);
        throw err;
      }
    }
    async endExhibition(exhibitionID) {
      try{
        const query = `
        DELETE FROM exhibition
        WHERE exhibitionid = $1
        RETURNING *;
        `;
        const values = [exhibitionID];
        const result = await this.db.query(query , values);
        return result.rows[0];
      }
      catch(err){
        console.error("Error ending Exhibition", err.message);
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
  const values = [artID,ExhibitionID];

  
  const result = await this.db.query(query, values);

 
  return result.rows[0];
} catch (err) {
  console.error('Error adding art to exhibition', err.message);
  throw err;
}
}
async RemoveArtFromExhibition(artID , ExhibitionID){
  try {
    const query = `
    DELETE FROM exhibitionarts
    WHERE artid = $1 AND exhibitionid = $2
    RETURNING *

  `;
  const values = [artID,ExhibitionID];

  
  const result = await this.db.query(query, values);

 
  return result.rows[0];
} catch (err) {
  console.error('Error removing art from exhibition', err.message);
  throw err;
}
}
};

  module.exports =new ExhibitionModel(db); // Export an instance of the class