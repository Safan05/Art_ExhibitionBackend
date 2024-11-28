const { log } = require("console");
const users = require("../Models/userqueries");
const bcrypt = require("bcrypt");  
const register=async (req,res)=>{
    try{
        console.log("creating...");
    let user=await users.checkEmailExists(req.body.email);
    if(user)
        return res.status(300).send("Dublicated accounted ... Bad Request");
    user=await users.checkUsernameExists(req.body.username);
    if(user)
        return res.status(300).send("Dublicated username ... Bad Request");
    let salt=await bcrypt.genSalt(10);
    console.log("doing...");
    let hashedpass=await bcrypt.hash(req.body.password,salt);
    let id=await users.getMaxId();
    let num=id.max?parseInt(id.max):0;
    await users.createUser(num+1,req.body.username,req.body.email,hashedpass,"Client",req.body.name,req.body.address,req.body.age,req.body.gender,req.body.phonenumber,req.body.cardnumber,req.body.cardexpiredate);
    res.status(200).send("User created successfully");
}
catch(err){
    console.log(err);
}
    }
module.exports={register}