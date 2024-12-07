const feedbackQueries = require('../Models/feedbackQueries.js');
const userQueries = require('../Models/userqueries.js');
const addFeedback = async (req, res) => {
    try {
        const cookies=req.cookies;
        const token=cookies["x-auth-token"];
        const userid=getId(token);
        const maxid= await feedbackQueries.getMaxId();
        const id= maxid+1;
        const d= new Date();
        await feedbackQueries.addFeedback(id,userid,req.body.rate,req.body.description,d);
        res.status(200).send("Feedback added successfully");
    } catch (error) {
        res.status(500).send("Error adding the feedback !");
    }
};
const updateFeedback=async(req,res)=>{
    try{
        const cookies=req.cookies;
        const token=cookies["x-auth-token"];
        const userid=getId(token);
        const d= new Date();
        await feedbackQueries.updateFeedback(userid,req.body.rate,req.body.description,d);
        res.status(200).send("Feedback updated successfully");
    }
    catch(err){
        res.status(500).send("Error updating the feedback !");
    }
}
const deleteFeedback=async(req,res)=>{
    try{
        const cookies=req.cookies;
        const token=cookies["x-auth-token"];
        const userid=getId(token);
        await feedbackQueries.deleteFeedback(userid);
        res.status(200).send("Feedback deleted successfully");
    }
    catch(err){
        res.status(500).send("Error deleting the feedback !");
    }
}
const getartistName=async(req,res)=>{
    try{
        const artist=await userQueries.getUserById(req.body.artistId);
        res.send(artist.username);
    }
    catch(err){
        res.status(500).send("Error getting the artist name !");
    }
}
module.exports = {
    addFeedback,
    updateFeedback,
    deleteFeedback,
    getartistName
};