const users = require("../Models/userqueries");
const bcrypt = require("bcrypt");  
const jwt = require("jsonwebtoken");
const register=async (req,res)=>{
    try{
        console.log("creating...");
    let user=await users.checkEmailExists(req.body.email);
    if(user)
        return res.status(300).send("Dublicated account ... Bad Request");
    user=await users.checkUsernameExists(req.body.username);
    if(user)
        return res.status(300).send("Dublicated username ... Bad Request");
    user=await users.checkCardNumberExists(req.body.cardnumber);
    if(user)
        return res.status(300).send("Dublicated card ... Bad Request");
    let salt=await bcrypt.genSalt(10);
    console.log("doing...");
    let hashedpass=await bcrypt.hash(req.body.password,salt);
    let id=await users.getMaxId();
    let num=id.max?parseInt(id.max):0;
    await users.createUser(num+1,req.body.username,req.body.email,hashedpass,req.body.role,req.body.name,req.body.address,req.body.age,req.body.gender,req.body.phonenumber,req.body.cardnumber,req.body.cardexpiredate);
    const token=jwt.sign({_id:num+1,Rule:"Client"},"OurjwtSecret");
    res.clearCookie("Role");
    res.clearCookie("x-auth-token");
    res.cookie("Role",req.body.role,{httpOnly:false,secure: false,  expires:null});
    res.cookie("x-auth-token",token,{httpOnly:true,expires:null,  sameSite: 'None',   secure: true});
    res.status(200).send("User created successfully");
}
catch(err){
    console.log(err);
}
    }
module.exports={register}