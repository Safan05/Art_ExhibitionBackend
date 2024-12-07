const jwt=require("jsonwebtoken");
module.exports=(req,res,nxt)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const payload=jwt.verify(token,"OurjwtSecret");
    console.log(payload);
    if(payload.Rule=="Admin")
        nxt();
    else
        res.status(403).send("Forbidden .... you are not authorized to access this page");
}