const express = require('express');
const router = express.Router();
const Controller = require("../controllers/ArtistController")
const clientController = require("../controllers/ClientController");
const artsController=require('../controllers/ArtsController');
router.post('/review',artsController.reviewArt); // done front
router.put('/review',artsController.reviewArt);
router.delete('/review',artsController.deleteReview);
router.post('/addFollower',clientController.addFollower); // done front
router.post('/removeFollower',clientController.deleteFollower); // done front
router.get('/getFollowings',clientController.getFollowings); // done front
router.post('/addWishlist',clientController.addToWishlist); // done front
router.delete('/removeWishlist',clientController.RemoveFromWishlst);
router.get('/getWishlist',clientController.getWishlist); 
router.get('/getArtists',clientController.getArtists);  // done front
router.post("/arts", Controller.getArtistArtpreview);
module.exports = router;