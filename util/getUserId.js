const jwt=require("jsonwebtoken");
module.exports=(token)=>{
    const payload=jwt.verify(token,"OurjwtSecret");
    const id=payload._id;
    return id;
}