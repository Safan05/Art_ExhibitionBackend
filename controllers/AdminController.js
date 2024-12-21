const users=require("../Models/userqueries");
const arts=require("../Models/artsQueries");
const getId=require("../util/getUserId");
const feedbacks=require("../Models/feedbackQueries");
const bans=require("../Models/bans");
const exhibitions=require("../Models/ExhibitionQueries");
const auctions=require("../Models/AuctionQueries");
const reciept = require("../Models/reciept");

const BanUser=async (req,res)=>{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    try{
        console.log(req.body);
        await bans.BanUser(req.body.userID,id,req.body.reason);
        res.status(200).send("User banned successfully");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getUsers=async (req,res)=>{
    try{
        console.log("Getting users...");
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
        let art=await arts.getArtById(req.body.artID);
        if(!art)
        {
            console.log("Art not found"+art);
            res.status(404).send("Art not found");
            return;
        }
        await bans.DeleteArt(req.body.artID,id,req.body.reason);
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
        let art=await bans.getBannedArtById(req.body.artID);
        if(!art)
        {
            res.status(404).send("Art not found");
            return;
        }
        await bans.removeDeletedArt(req.body.artID,id);
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
    try{
        const new_id=await exhibitions.getMaxId();
        let num=new_id?parseInt(new_id):7600;
        console.log(req.body)
        await exhibitions.StartExhibition(num+1,req.body.title,req.body.theme,req.body.startDate,req.body.endDate);
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
        for(i in allExhibitions){
            const arts=await exhibitions.GetArtsInExhibition(allExhibitions[i].exhibitionid);
            allExhibitions[i].artworks=arts;
            for(j in arts){
                const artist=await users.getArtistById(arts[j].theartistid);
                arts[j].artistName=artist.name;
            }
        }
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
        console.log(req.body);
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
        console.log("Approving auction...");
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
const MakeAdmin=async(req,res)=>{
    try{
        let user=await users.checkUsernameExists(req.body.username);
        if(!user)
        {
            res.status(404).send("User not found");
            return;
        }
        console.log("Making admin...");
        await users.MakeAdmin(req.body.username);
        res.status(200).send("User is now an admin");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const RemoveAdmin=async(req,res)=>{
    try{
        let user=await users.checkUsernameExists(req.body.username);
        if(!user)
        {
            res.status(404).send("User not found");
            return;
        }
        console.log("Removing admin...");
        await users.RemoveAdmin(req.body.username);
        res.status(200).send("User is no longer an admin");
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getStatistics=async(req,res)=>{
    try{
        const allUsers=await users.getUsersCount();
        const allArts=await arts.getArtsCount();
        const allAuctions=await auctions.getAuctionsCount();
        const sales=await reciept.getTotalSalesThisMonth();
        const statistics={totalUsers:allUsers,totalArtworks:allArts,activeAuctions:allAuctions,salesThisMonth:sales};
        res.send(statistics);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getActivity=async(req,res)=>{
    try{
        const Activity=await reciept.getRecieptsCountForThisYear();
        const monthlyActivity={};
        for(i in Activity){
            let month="january";
            if(Activity[i].month==2)
                month="february";
            else if(Activity[i].month==3)
                month="march";
            else if(Activity[i].month==4)
                month="april";
            else if(Activity[i].month==5)
                month="may";
            else if(Activity[i].month==6)
                month="june";
            else if(Activity[i].month==7)
                month="july";
            else if(Activity[i].month==8)
                month="august";
            else if(Activity[i].month==9)
                month="september";
            else if(Activity[i].month==10)
                month="october";
            else if(Activity[i].month==11)
                month="november";
            else if(Activity[i].month==12){
                month="december";
            }

            monthlyActivity[month]=Activity[i].count;
        }
        res.send(monthlyActivity);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const getAuctionRequests=async(req,res)=>{
    try{
        const allAuctions=await auctions.GetAuctionRequests();
        res.send(allAuctions);
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
    deleteAuction,
    MakeAdmin,
    RemoveAdmin,
    getStatistics,
    getActivity,
    getAuctionRequests
};