const users = require("../Models/userqueries");
const arts = require("../Models/artsQueries")
const getId=require("../util/getUserId")
const multer = require("multer");
const upload = require("../util/UploadImg");
// Controller function to handle upload
const addArt = (req, res) => {
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      
      return res.status(403).send( err.message);
    } else if (err) {
      // Other errors
      console.log("error here!");
      return res.status(403).send( err.message);
    }

    if (!req.file) {
      return res.status(403).send( "No dile uploaded");
    }
    try{
    const d = new Date();
    const new_id=arts.getmaxId();
    let num=new_id.max?parseInt(new_id.max):2000;
    arts.AddArt(num+1,id,'/upload/'+req.file.filename,req.body.title,req.body.price,d,req.body.description);
    res.status(200).json({
      message: "File uploaded successfully",
      imageUrl: `/upload/${req.file.filename}`,
    });
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
  });
};

const getArts = async (req,res)=>{
    const cookies=req.cookies;
    const logged=cookies["Logged"];
    try{
    const allArts=await arts.getArts();
    if(logged==ture){
        res.send(allArts);
    }
    else
    {
        res.send(allArts[0]);
    }
}
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
const reviewArt = async (req,res)=>{
    try{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    await arts.reviewArt(id,req.body.artId,req.body.rate,req.body.comment);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}
module.exports={addArt,getArts,reviewArt};