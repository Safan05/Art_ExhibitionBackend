const users = require("../Models/userqueries");
const bcrypt = require("bcrypt");  
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
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
    console.log(req.body);
    console.log(req.file);
    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "ArtExhibtion" }, // Replace with your desired folder in Cloudinary
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer); // Pipe the file buffer to Cloudinary
      });
    await users.createUser(num+1,req.body.username,req.body.email,hashedpass,req.body.role,req.body.name,req.body.address,req.body.age,req.body.gender,req.body.phoneNumber,req.body.cardNumber,req.body.cardExpiry,result.secure_url);
    const token=jwt.sign({_id:num+1,Rule:"Client"},"OurjwtSecret");
    res.clearCookie("Role");
    res.clearCookie("x-auth-token");
    res.cookie("Role",req.body.role,{httpOnly:false,secure: false,  expires:null});
    res.cookie("Logged","true",{httpOnly:false,secure: false,  expires:null});
    res.cookie("name",req.body.name,{httpOnly:false,secure: false,  expires:null});
    res.cookie("x-auth-token",token,{httpOnly:true,expires:null,  sameSite: 'None',   secure: true});
    res.status(200).send("User created successfully");
}
catch(err){
    console.log(err);
    res.status(500).send("Internal error sorry !");
}
    }
const updatePassword= async (req,res)=>{
    try{
    console.log("updating...");
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const payload=jwt.verify(token,"OurjwtSecret");
    const id=payload._id;
    let user=await users.getArtistById(id);
    console.log(user);
    console.log(req.body);
    let validpass=await bcrypt.compare(req.body.currentpassword,user.password);
    if(!validpass)
        return res.status(300).send("Invalid Current password");
    let salt=await bcrypt.genSalt(10);
    let hashedpass=await bcrypt.hash(req.body.password,salt);
    await users.updatePassword(id,hashedpass);
    res.status(200).send("Password updated successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal error sorry !");
    }
}
const updateProfilepic= async (req,res)=>{
    try{
    console.log("updating...Pic");
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const payload=jwt.verify(token,"OurjwtSecret");
    const id=payload._id;
    console.log(req.file);
    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "ArtExhibtion" }, // Replace with your desired folder in Cloudinary
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer); // Pipe the file buffer to Cloudinary
      });
    await users.updateProfilepic(id,result.secure_url);
    res.status(200).send("Profile pic updated successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal error sorry !");
    }
}

const updateTheUserInfo = async(req , res)=> {
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const payload=jwt.verify(token,"OurjwtSecret");
    const id=payload._id;
    try{
     const result = await users.updateuser(id , req.body.email , req.body.address , req.body.phonenumber , req.body.cardnumber , req.body.cardexpiredate);
    console.log(result)
    res.status(200).send("user info updated successfuly");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal error sorry!");
    }
}
const logout =(req,res)=>{
    console.log("logging out...");
    res.clearCookie("Role");
    res.clearCookie("x-auth-token");
    res.clearCookie("Logged");
    res.clearCookie("name");
    res.status(200).send("Logged out successfully");
}
module.exports={register,updatePassword,updateProfilepic,logout , updateTheUserInfo};