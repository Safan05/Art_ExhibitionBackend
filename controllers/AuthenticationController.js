const users = require("../Models/userqueries");
const GenToken = require("../util/AuthorizationToken");
const bcrypt = require("bcrypt");
const login=async (req,res)=>{
    try{
        let user=await users.getUserByusername(req.body.username);
        if(!user)
            return res.status(300).send("Invalid username");
        let validpass=await bcrypt.compare(req.body.password,user.password);
        if(!validpass)
            return res.status(300).send("Invalidpassword");
        const token=GenToken(user);
        res.header("x-auth-token",token);
        res.cookie("x-auth-token",token);
        res.status(200).send("Logged in successfully");
    }
    catch(err){
        console.log(err);
    }
}
module.exports={login};