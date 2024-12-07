const express=require('express');
const router=express.Router();
const feedbackQueries=require('../Models/feedbackQueries');
const adminController=require('../controllers/AdminController');
router.get('/Feedback',async (req,res)=>{
    try{
    const result=await feedbackQueries.getFeedback(req,res);
    res.send(result);
    }
    catch(err){
        res.status(500).send("Error getting the feedback !");
    }
});

router.get('/exhibition',adminController.getExhibitions);
router.get('/exhibition/art',adminController.getExhibitionArts);
module.exports=router;