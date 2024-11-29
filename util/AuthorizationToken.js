const jwt=require("jsonwebtoken");
module.exports=(user)=>{
const token=jwt.sign({_id:user.userid,Rule:user.role},"OurjwtSecret");
return token;
}