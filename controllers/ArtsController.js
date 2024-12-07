const users = require("../Models/userqueries");
const arts = require("../Models/artsQueries")
const getId=require("../util/getUserId")
const multer = require("multer");
const upload = require("../util/UploadImg");
// Controller function to handle upload
async function addArt(req, res) {
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
  upload.single("image")(req, res,async (err) => {
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
    const new_id=await arts.getmaxId();
    let num=new_id?parseInt(new_id):2000;
    console.log(num+1);
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
    if(logged=="true"){
      console.log("Getting arts...");
      const allArts=await arts.getArtsNew();
      res.send(allArts);
    }
    else
    {
      const allArts=await arts.getArtsLimit();
      res.send(allArts);
    }
}
    catch(err){
        res.status(500).send("Internal error sorry !"+err.message);
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