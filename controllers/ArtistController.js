const users = require("../Models/userqueries");
const arts = require("../Models/artsQueries")
const getId=require("../util/getUserId")
const auction=require("../Models/AuctionQueries");
const getArtistArt = async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
    const allArts=await arts.getArtsbyArtist(id);
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
module.exports={getArtistArt,addArtToAuction};