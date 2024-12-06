const users = require("../Models/userqueries");
const arts = require("../Models/artsQueries")
const getId=require("../util/getUserId")
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
module.exports={getArtistArt};