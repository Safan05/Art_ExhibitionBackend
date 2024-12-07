const arts=require('../Models/artsQueries');
const followers=require('../Models/followQueries');
const wishlist = require('../Models/wishlistQueries');
const getId=require('../util/getUserId');
const artists=require('../Models/userqueries');
const addReview=async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        arts.addReview(id,req.body.artId,req.body.rate,req.body.comment);
        res.status(200).send("Review added successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const addFollower=async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        let artist=await artists.getUserByusername(req.body.artistId);
        if(!artist)
        {
            res.status(404).send("Artist not found");
            return;
        }
        await followers.follow(id,req.body.artistId);
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
        const result=await followers.unfollow(id,req.body.artistId);
        if(result)
        res.status(200).send("Unfollowed successfully");
        else
        res.status(404).send("Not found");
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
        await wishlist.addToWishlist(id,req.body.artId);
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
    try{
        const result=await wishlist.RemoveFromWishlst(id,req.body.artId);
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
module.exports={addReview,addFollower,deleteFollower,addToWishlist,RemoveFromWishlst,getWishlist};