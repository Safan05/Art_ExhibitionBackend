const db = require('./db.js');

class UserModel {
    constructor(db) {
      this.db = db; // Use the pool instance from `pg`
    }
  
    // Get a user by username 
    // todo: --> need to check for password during auth stage
    async getUsers(){
      try {
        const query = 'SELECT * FROM users WHERE status=$1';
        const values = ['available'];
        const result = await this.db.query(query,values);
        return result.rows;
      } catch (error) {
        console.error('Error fetching user :', error);
        throw error;
      }
    }
    async getUserById(Id){
      try {
        const query = 'SELECT username FROM users WHERE userid= $1';
        const result = await this.db.query(query, [Id]);
        return result.rows[0];
      } catch (error) {
        console.error('Error fetching user :', error);
        throw error;
      }
    }
    async getArtistById(Id){
      try {
        const query = 'SELECT * FROM users WHERE userid= $1';
        const result = await this.db.query(query, [Id]);
        return result.rows[0];
      } catch (error) {
        console.error('Error fetching user :', error);
        throw error;
      }
    }
    async getUserByusername(Username) {
      try {
        const query = 'SELECT * FROM users WHERE username= $1';
        console.log("Database connection:", this.db);
        const result = await this.db.query(query, [Username]);
        console.log("logging !!!");
        return result.rows[0];
      } catch (error) {
        console.error('Error fetching user :', error);
        throw error;
      }
    }
    // check email existance
    async checkEmailExists(email){
      try {
        const query = "SELECT 1 FROM users WHERE email = $1";    
        const result = await this.db.query(query, [email]);
    
        if (result.rows.length > 0) {
          console.log("Email exists in the database.");
          return true;
        } else {
          console.log("Email does not exist in the database.");
          return false;
        }
      } catch (error) {
        console.error("Error checking email existence:", error.message);
        throw error; 
      }
    };
    // check username existance
    async checkUsernameExists(username) {
      try {
        const query = "SELECT * FROM users WHERE username = $1";    
        const result = await this.db.query(query, [username]);
    
        if (result.rows.length > 0) {
          console.log("Username exists in the database.");
          return result.rows[0]; // Return the whole user object (first user found)
        } else {
          console.log("Username does not exist in the database.");
          return null; // Return null if no user found
        }
      } catch (error) {
        console.error("Error checking username existence:", error.message);
        throw error; 
      }
    };
    
    // get max id
    async getMaxId(){
      try {
        const query = "SELECT MAX(userid) FROM users";    
        const result = await this.db.query(query);
        return result.rows[0];
      } catch (error) {
        console.error("Error getting max id:", error.message);
        throw error; 
      }
    };
    // check unique card number
    async checkCardNumberExists(cardnumber){
      try {
        const query = "SELECT 1 FROM users WHERE cardnumber = $1";    
        const result = await this.db.query(query, [cardnumber]);
    
        if (result.rows.length > 0) {
          console.log("Card number exists in the database.");
          return true;
        } else {
          console.log("Card number does not exist in the database.");
          return false;
        }
      } catch (error) {
        console.error("Error checking card number existence:", error.message);
        throw error; 
      }
    };
    // Create a new user
    async createUser(userid , username, email, password, role ,name , address , age , gender , phonenumber, cardnumber , cardexpiredate,profilePic) {
      try {
        const query = `
          INSERT INTO users (userid , username, email, password, role ,name , address , age , gender , phonenumber, cardnumber , expiredate,profilepic )
          VALUES ($1, $2, $3, $4 , $5 , $6 , $7 , $8 , $9 , $10 ,$11, $12, $13)
          RETURNING *;
        `;
        const values = [userid , username, email, password, role ,name , address , age , gender , phonenumber, cardnumber , cardexpiredate,profilePic];
        const result = await this.db.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    };
    // update user password
    async updatePassword(userid,password){
      try{
        const query =`
        UPDATE users
        SET password = $1 
        where userid = $2
        RETURNING *`
        ;

        const values =  [password  , userid];
        const result = await this.db.query(query , values);
        return result.rows[0];
      }
      catch(err){
        console.error('error updating password');
        throw err;
      }
    }

    
    async updateProfilepic(userid,profilepic){
      try{
        const query =`
        UPDATE users
        SET profilepic=$1
        where userid = $2
        RETURNING *`
        ;

        const values =  [profilepic  , userid];
        const result = await this.db.query(query , values);
        return result.rows[0];
      }
      catch(err){
        console.error('error updating profile picure');
        throw err;
      }
    }
    
    async updateuser  (userid ,email, address , phonenumber, cardnumber , cardexpiredate) {
      try {
        const query = `
          UPDATE users
          SET email = $2,
              address = $3,
              phonenumber = $4,
              cardnumber = $5,
              expiredate = $6
              WHERE userid = $1
              RETURNING *;
          `;
          const values = [userid, email , address, phonenumber, cardnumber , cardexpiredate ];
          const result = await this.db.query(query, values);
          console.log(result)
          return result.rows[0];
          
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      
      
    }



    async  getUserIdByUsername(username) {
      try {
        console.log (username);
        const query = `
          SELECT UserID
          FROM UserIdByUserName
          WHERE UserName = $1;
        `;
    
        const values = [username]; // Use parameterized values to prevent SQL injection
    
        const result = await this.db.query(query, values);
    
        if (result.rows.length > 0) {
          return result.rows[0].userid; // Return the UserID
        } else {
          return null; // User not found
        }
      } catch (err) {
        console.error('Error querying the database:', err);
        throw err; // Re-throw the error for handling by the caller
      }
    };
  async getArtists(){
    try {
      const query = 'SELECT * FROM users WHERE role=$1';
      const values = ['Artist'];
      const result = await this.db.query(query,values);
      return result.rows;
    } catch (error) {
      console.error('Error fetching user :', error);
      throw error;
    }
  }
   
    
  }
  
  module.exports =new UserModel(db); // Export an instance of the class