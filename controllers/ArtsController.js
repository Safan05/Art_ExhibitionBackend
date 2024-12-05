const users = require("../Models/userqueries");
const arts = require("../Models/artsQueries")
const getId=require("../util/getUserId")
const addArt = async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
}
const getArts = async (req,res)=>{
    const cookies=req.cookies;
    const logged=cookies["Logged"];
    try{
    const allArts=await arts.getArts();
    if(logged==ture){
        res.send(allArts);
    }
    else
    {
        res.send(allArts[0]);
    }
}
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const reviewArt = async (req,res)=>{
    try{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    await arts.reviewArt(id,req.body.artId,req.body.rate,req.body.comment);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
module.exports={addArt,getArts,reviewArt};