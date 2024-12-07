const users = require("../Models/userqueries");
const GenToken = require("../util/AuthorizationToken");
const bcrypt = require("bcrypt");
const login=async (req,res)=>{
    try{
        res.clearCookie("Role");
        res.clearCookie("x-auth-token");
        res.clearCookie("Logged");
        res.clearCookie("name");
        let user=await users.getUserByusername(req.body.username);
        if(!user)
            return res.status(300).send("Invalid username");
        let validpass=await bcrypt.compare(req.body.password,user.password);
        if(!validpass)
            return res.status(300).send("Invalid password");
        if(user.status!="available")
            return res.status(300).send("Account is not banned");
        const token=GenToken(user);
        res.cookie("Role",user.role,{httpOnly:false,secure: false,  expires:null});
        res.cookie("Logged","true",{httpOnly:false,secure: false,  expires:null});
        res.cookie("name",user.name,{httpOnly:false,secure: false,  expires:null});
        res.cookie("x-auth-token",token,{httpOnly:true,expires:null,  sameSite: 'None',   secure: true});
        res.status(200).send("Logged in successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal error sorry !");
    }
}
module.exports={login};