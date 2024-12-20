const express = require('express');
const router = express.Router();
const upload = require("../util/UploadImg");
const artsController = require("../controllers/ArtsController");
router.post('/',upload.single("image"),artsController.addArt); // done front
router.get('/',artsController.getArts); // done front
router.post('/review',artsController.reviewArt);  //done
router.get('/comments' , artsController.getCommentspost)  //done 
router.put('/edit' , artsController.updateart) // done 
module.exports=router;