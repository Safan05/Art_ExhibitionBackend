const express = require('express');
const router = express.Router();
const artsController = require("../controllers/ArtsController");
router.post('/',artsController.addArt);
router.get('/',artsController.getArts);
router.post('/review',artsController.reviewArt);
module.exports=router;