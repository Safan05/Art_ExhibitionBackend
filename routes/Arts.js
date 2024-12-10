const express = require('express');
const router = express.Router();
const upload = require("../util/UploadImg");
const artsController = require("../controllers/ArtsController");
router.post('/',upload.single("image"),artsController.addArt);
router.get('/',artsController.getArts);
router.post('/review',artsController.reviewArt);
module.exports=router;