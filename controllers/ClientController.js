const arts=require('../Models/artsQueries');
const followers=require('../Models/followQueries');
const wishlist = require('../Models/wishlistQueries');
const getId=require('../util/getUserId');
const artists=require('../Models/userqueries');

const addFollower=async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        console.log(req.body);
        let artist=await artists.getUserById(req.body.artistId);
        if(!artist)
        {
            res.status(404).send("Artist not found");
            return;
        }
        await followers.follow(req.body.artistId,id);
        res.status(200).send("Followed successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const deleteFollower = async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        const result=await followers.unfollow(req.body.artistId,id);
        if(result)
        res.status(200).send("Unfollowed successfully");
        else
        res.status(404).send("Not found");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getFollowings = async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    console.log(id);
    try{
        const result=await followers.getClientFollows(id);
        const follower=[];
        for(i in result){
            const artist=await artists.getArtistById(result[i]);
            follower.push(artist);
        }
        res.status(200).send(follower);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const addToWishlist =  async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        const art=await arts.getArtById(req.body.artId);
        if(!art)
        {
            res.status(404).send("Art not found");
            return;
        }
        await wishlist.addToWishlist(req.body.artId , id);
        res.status(200).send("Added to wishlist successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const RemoveFromWishlst = async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    console.log(req.query.artId);
    try{
        const result=await wishlist.RemoveFromWishlst(id,req.query.artId);
        if(result)
        res.status(200).send("Removed from wishlist successfully");
        else
        res.status(404).send("Not found");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getWishlist = async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        const result=await wishlist.getWishlist(id);
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getArtists = async (req,res)=>{
    try{
        const result=await artists.getArtists();
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
module.exports={addFollower,deleteFollower,getFollowings,addToWishlist,RemoveFromWishlst,getWishlist,getArtists};