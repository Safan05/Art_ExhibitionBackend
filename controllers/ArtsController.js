const users = require("../Models/userqueries");
const arts = require("../Models/artsQueries")
const getId=require("../util/getUserId")
const comments = require("../Models/comments");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
// Controller function to handle upload
async function addArt(req, res) {
  console.log("Adding art...");
  console.log(req.file);
  console.log(req.body);
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "ArtExhibtion" }, // Replace with your desired folder in Cloudinary
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer); // Pipe the file buffer to Cloudinary
    });

    // Remove the temporary file
    //fs.unlinkSync(req.file.path);
    const d = new Date();
    const new_id=await arts.getmaxId();
    let num=new_id?parseInt(new_id):2000;
    console.log(num+1);
    arts.AddArt(num+1,id,result.secure_url,req.body.title,req.body.price,d,req.body.description);
    res.status(200).json({message:"Image uploaded successfully",imageUrl:result.secure_url});
  };

const getArts = async (req,res)=>{
    const cookies=req.cookies;
    const logged=cookies["Logged"];
    try{
    if(logged=="true"){
      const allArts=await arts.getArtsNew();
      for(i in allArts){
        const user=await users.getUserById(allArts[i].theartistid);
        allArts[i].artistName=user.username;
        allArts[i].artistPic=user.profilepic;
        
    }
      res.send(allArts);
    }
    else
    {
      const allArts=await arts.getArtsLimit();
      for(i in allArts){
        const user=await users.getUserById(allArts[i].theartistid);
       
        allArts[i].artistName=user.username;
        allArts[i].artistPic=user.profilepic;
       
      }
      res.send(allArts);
    }
}
    catch(err){
        res.status(500).send("Internal error sorry !"+err.message);
    }
}

const getCommentspost = async(req , res) =>{

  try {

    const commentsOnArt=await comments.getCommentsOnArt(req.query.artid);
    let theComments = [];
    let newComment = {};
    for(j in commentsOnArt){
      const client=await users.getArtistById(commentsOnArt[j].clientid);
      newComment = commentsOnArt[j];
      if(client){
        newComment.clientprofilepic=client.profilepic;
        newComment.clientname=client.name;
      }
     
      theComments.push(newComment);
    }
    res.send(theComments);

  }
   catch(err) {
    res.status(500).send("error in fetching comments...try again later");
   }
   

}

const reviewArt = async (req,res)=>{
    try{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    await comments.addComment(id,req.body.artId,req.body.comment,req.body.rate);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
}

const deleteReview = async(req,res)=>{
    try{
    const cookies=req.cookies;
    const token=cookies["x-auth-token"];
    const id=getId(token);
    await comments.getCommentsOnArt(req.body.artId,id);
    }
    catch(err){
        res.status(500).send("Internal error sorry !");
    }
  }

   

module.exports={addArt,getArts,reviewArt,deleteReview , getCommentspost};