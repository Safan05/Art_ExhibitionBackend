const validator=require("../util/Validator.js");
module.exports=(req,res,nxt)=>{
    let valid=validator(req.body);
    if(valid){
        req.valid=1;
        nxt();
    }
    else{
        console.log(req.body);
        res.status(403).send("Bad Request ..... enter a valid data");
    }
}