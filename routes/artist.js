const express = require("express");
const router = express.Router();
const authorize=require('../middlewares/ِAuthorizeArtist.js');
const Controller=require('../controllers/ArtistController');
router.use(authorize);
router.get("/arts", Controller.getArtistArt); // done front
router.post("/art/auction", Controller.addArtToAuction);
router.post("/art/delete", Controller.deleteArt); // done front
router.get("/followers", Controller.getFollowers); // done front
module.exports = router;