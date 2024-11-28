import db from "db"

db.connect();


class ExhibitionModel {
    constructor(db) {
      this.db = db; // Use the pool instance from `pg`
    }
  
    // getting all the arts from an artist
    async getArtsbyArtist(artistId) {
      try {
        const query = 'SELECT * FROM arts WHERE artistid= $1';
        const result = await this.db.query(query, [artistId]);
        return result.rows[0];
      } catch (error) {
        console.error('Error fetching user :', error);
        throw error;
      }
    }

    // getting all the arts with a newer to older ordering (reverse the rows)
    async getArtsNew() {
      try {
        const query = `SELECT * FORM ARTS`;
        const result = await this.db.query(query);
        result.reverse();
        return result;
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    }

  }
  
  export default new ExhibitionModel(db); // Export an instance of the class