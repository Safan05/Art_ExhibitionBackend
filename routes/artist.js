const express = require("express");
const router = express.Router();
const authorize=require('../middlewares/ِAuthorizeArtist.js');
const Controller=require('../controllers/ArtistController');
router.use(authorize);
router.get("/arts", Controller.getArtistArt);
module.exports = router;