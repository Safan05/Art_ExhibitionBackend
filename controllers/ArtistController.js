const users = require("../Models/userqueries");
const arts = require("../Models/artsQueries")
const getId=require("../util/getUserId")
const auction=require("../Models/AuctionQueries");
const comments = require("../Models/comments");

const getArtistArt = async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
    console.log("Getting arts...");
    const allArts=await arts.getArtsbyArtist(id);
    for(i in allArts){
        const user=await users.getUserById(allArts[i].theartistid);
        const commentsOnArt=await comments.getCommentsOnArt(allArts[i].artid);
        allArts[i].artistName=user.username;
        allArts[i].artistPic=user.profilepic;
        allArts[i].comments=commentsOnArt;
      }
    console.log(allArts);
    res.send(allArts);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}

const getArtistArtpreview = async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    
    const id = req.body.artistname? await users.getUserIdByUsername(req.body.artistname) : getId(token);
    try{
    console.log("Getting arts...");
    console.log(id);
    const allArts= await arts.getArtsbyArtist(id);
    for(i in allArts){
        const user=await users.getUserById(allArts[i].theartistid);
        const commentsOnArt=await comments.getCommentsOnArt(allArts[i].artid);
        allArts[i].artistName=user.username;
        allArts[i].artistPic=user.profilepic;
        allArts[i].comments=commentsOnArt;
      }
    console.log(allArts);
    res.send(allArts);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}

const addArtToAuction = async(req,res)=>{
    try{
        const art=await arts.getArtById(req.body.artId);
        if(!art)
        {
            res.status(404).send("Art not found");
            return;
        }
        const new_id=await auction.getmaxId();
        let num=new_id?parseInt(new_id):43200;
        auction.RequestAuction(num+1,req.body.artId,req.body.startDate,req.body.endDate,req.body.startingPrice);
        res.status(200).send("Art added to auction successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
module.exports={getArtistArt,addArtToAuction,getArtistArtpreview};