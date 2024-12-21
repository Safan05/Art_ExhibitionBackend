const arts=require('../Models/artsQueries');
const followers=require('../Models/followQueries');
const wishlist = require('../Models/wishlistQueries');
const getId=require('../util/getUserId');
const artists=require('../Models/userqueries');
const reciepts=require('../Models/reciept');
const getUserId = require('../util/getUserId');
const userqueries = require('../Models/userqueries');
const auctions = require('../Models/AuctionQueries');
const bids=require('../Models/bids');

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
const getReceipts = async(req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        let Receipts=[];
        let newReceipt={};
        const result=await reciepts.getRecieptByClient(id);
       // console.log(result)

       for (const Receipt of result) {
        const newReceipt = { ...Receipt }; // Create a copy of the receipt
        console.log(newReceipt);
      
        const theart = await arts.getArtById(Receipt.artid);
        newReceipt.artdescription = theart.description;
        newReceipt.artname = theart.artname;
        newReceipt.artpic = theart.photo;
      
        const theartist = await artists.getArtistById(Receipt.artistid);
        newReceipt.artistname = theartist.name;
      
        const theBuyer = await userqueries.getArtistById(Receipt.buyerid);
        newReceipt.buyerName = theBuyer.name;
        newReceipt.cardNumber = theBuyer.cardnumber;
      
        Receipts.push(newReceipt);
      }
      
      console.log(Receipts); // Now Receipts will contain all the updated data
      res.status(200).send(Receipts);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const buyArt = async (req,res)=>{
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
        const artist=await artists.getArtistById(art.theartistid);
        if(!artist)
        {
            res.status(404).send("Artist not found");
            return;
        }
        const d= new Date();
        const maxid= await reciepts.getMaxId();
        const recieptid= maxid+1;
        await reciepts.addReciept(recieptid , id  ,req.body.description ,artist.userid, req.body.artId , art.baseprice );
        res.status(200).send("Art bought successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const buyArtAuction=async(req,res)=>{
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
        const artist=await artists.getArtistById(art.theartistid);
        if(!artist)
        {
            res.status(404).send("Artist not found");
            return;
        }
        const d= new Date();
        const maxid= await reciepts.getMaxId();
        const recieptid= maxid+1;
        await reciepts.addReciept(recieptid , id  ,req.body.description ,artist.userid, req.body.artId , req.body.price );
        res.status(200).send("Art bought successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getAuctions=async(req,res)=>{
    try{
        const result=await auctions.DisplayAuctions();
        for(i in result){
            if(result[i].highestbid>0){
            const winner=await auctions.getWinnerAuction(result[i].auctionid);
            console.log(winner);
            result[i].winner=winner;
            }
        }
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const addBid=async(req,res)=>{
    if(req.body.bid<req.body.baseprice)
    {
        res.status(400).send("Bid should be greater than base price");
        return;
    }
    if(req.body.bid<req.body.highestbid)
    {
        res.status(400).send("Bid should be greater than highest bid");
        return;
    }
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    console.log(req.body);
    try{
        const result=await bids.addBid(id, req.body.auctionId , req.body.bid,req.body.auctiondate);
        console.log(result);
        res.status(200).send("Bid added successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getWonAuctions= async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        const result=await auctions.getWonAuctions(id);
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
module.exports={addFollower,getWonAuctions,buyArtAuction,deleteFollower,getFollowings,addToWishlist,RemoveFromWishlst,getWishlist,getArtists,getReceipts,buyArt,getAuctions,addBid};