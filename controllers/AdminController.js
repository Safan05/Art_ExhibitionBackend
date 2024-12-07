const users=require("../Models/userqueries");
const arts=require("../Models/artsQueries");
const getId=require("../util/getUserId");
const feedbacks=require("../Models/feedbackQueries");
const bans=require("../Models/bans");
const exhibitions=require("../Models/ExhibitionQueries");
const auctions=require("../Models/AuctionQueries");
const BanUser=async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        let user=await users.checkUsernameExists(req.body.username);
        if(!user)
        {
            res.status(404).send("User not found");
            return;
        }
        await bans.BanUser(req.body.username,id,req.body.reason);
        res.status(200).send("User banned successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getUsers=async (req,res)=>{
    try{
        console.log("Getting users...")
        const allUsers=await users.getUsers();
        res.send(allUsers);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getBannedUsers=async (req,res)=>{
    try{
        const allUsers=await bans.getBannedUsers();
        res.send(allUsers);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const unBanUser=async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        let user=await users.checkUsernameExists(req.body.username);
        if(!user)
        {
            res.status(404).send("User not found");
            return;
        }
        await bans.unBanUser(req.body.username,id);
        res.status(200).send("User unbanned successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const BanArt=async(req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        let art=await arts.getArtById(req.body.artId);
        if(!art)
        {
            res.status(404).send("Art not found");
            return;
        }
        await bans.DeleteArt(req.body.artId,id,req.body.reason);
        res.status(200).send("Art banned successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const unBanArt=async(req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        let art=await arts.getBannedArtById(req.body.artId);
        if(!art)
        {
            res.status(404).send("Art not found");
            return;
        }
        await bans.removeDeletedArt(req.body.artId,id);
        res.status(200).send("Art unbanned successfully");
    }
    catch(err){
        res.status(500).send("Error removing the ban");
    }
}
const getBannedArts=async(req,res)=>{
    try{
        const allArts=await bans.getBannedArts();
        res.send(allArts);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const startExhibition=async(req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        const new_id=await exhibitions.getMaxId();
        let num=new_id?parseInt(new_id):7600;
        await exhibitions.StartExhibition(num+1,id,req.body.title,req.body.theme,req.body.startdate,req.body.enddate);
        res.status(200).send("Exhibition started successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const endExhibition=async(req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        let exhibition=await exhibitions.getExhibitionById(req.body.exhibitionId);
        if(!exhibition)
        {
            res.status(404).send("Exhibition not found");
            return;
        }
        await exhibitions.endExhibition(req.body.exhibitionId,id);
        res.status(200).send("Exhibition ended successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getExhibitions=async(req,res)=>{
    try{
        const allExhibitions=await exhibitions.DisplayExhibition();
        res.send(allExhibitions);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const updateExhibition=async(req,res)=>{
    try{
        let exhibition=await exhibitions.getExhibitionById(req.body.exhibitionId);
        if(!exhibition)
        {
            res.status(404).send("Exhibition not found");
            return;
        }
        await exhibitions.updateExhibition(req.body.exhibitionId,req.body.startdate,req.body.enddate);
        res.status(200).send("Exhibition updated successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const addArtToExhibition=async(req,res)=>{
    try{
        let art=await arts.getArtById(req.body.artId);
        if(!art)
        {
            res.status(404).send("Art not found");
            return;
        }
        let exhibition=await exhibitions.getExhibitionById(req.body.exhibitionId);
        if(!exhibition)
        {
            res.status(404).send("Exhibition not found");
            return;
        }
        await exhibitions.addArtToExhibition(req.body.artId,req.body.exhibitionId);
        res.status(200).send("Art added to exhibition successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const removeArtFromExhibition=async(req,res)=>{
    try{
        let art=await arts.getArtById(req.body.artId);
        if(!art)
        {
            res.status(404).send("Art not found");
            return;
        }
        let exhibition=await exhibitions.getExhibitionById(req.body.exhibitionId);
        if(!exhibition)
        {
            res.status(404).send("Exhibition not found");
            return;
        }
        await exhibitions.RemoveArtFromExhibition(req.body.artId,req.body.exhibitionId);
        res.status(200).send("Art removed from exhibition successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getExhibitionArts=async(req,res)=>{
    try{
        let exhibition=await exhibitions.getExhibitionById(req.body.exhibitionId);
        if(!exhibition)
        {
            res.status(404).send("Exhibition not found");
            return;
        }
        const allArts=await exhibitions.getExhibitionArts(req.body.exhibitionId);
        res.send(allArts);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const approveAuction=async(req,res)=>{
    try{
        let auction=await auctions.getAuctionByID(req.body.auctionId);
        if(!auction)
        {
            res.status(404).send("Auction not found");
            return;
        }
        await auctions.StartAuction(req.body.auctionId,req.body.startDate,req.body.endDate,req.body.startingPrice);
        res.status(200).send("Auction approved successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const rejectAuction=async(req,res)=>{
    try{
        let auction=await auctions.getAuctionByID(req.body.auctionId);
        if(!auction)
        {
            res.status(404).send("Auction not found");
            return;
        }
        await auctions.rejectAuction(req.body.auctionId);
        res.status(200).send("Auction rejected successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const deleteAuction=async(req,res)=>{
    try{
        let auction=await auctions.getAuctionByID(req.body.auctionId);
        if(!auction)
        {
            res.status(404).send("Auction not found");
            return;
        }
        await auctions.deleteAuction(req.body.auctionId);
        res.body(200).send("Auction deleted successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
module.exports={BanUser,
    getUsers,
    getBannedUsers,
    unBanUser,
    BanArt,
    unBanArt,
    getBannedArts,
    startExhibition,
    endExhibition,
    getExhibitions,
    updateExhibition,
    addArtToExhibition,
    removeArtFromExhibition,
    getExhibitionArts,
    approveAuction,
    rejectAuction,
    deleteAuction
};