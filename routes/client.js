const express = require('express');
const router = express.Router();
const Controller = require("../controllers/ArtistController")
const clientController = require("../controllers/ClientController");
const artsController=require('../controllers/ArtsController');
router.post('/review',artsController.reviewArt);
router.put('/review',artsController.reviewArt);
router.delete('/review',artsController.deleteReview);
router.post('/addFollower',clientController.addFollower);
router.delete('/removeFollower',clientController.deleteFollower);
router.get('/getFollowings',clientController.getFollowings);
router.post('/addWishlist',clientController.addToWishlist);
router.delete('/removeWishlist',clientController.RemoveFromWishlst);
router.get('/getWishlist',clientController.getWishlist);
router.get('/getArtists',clientController.getArtists);
router.post("/arts", Controller.getArtistArtpreview);
module.exports = router;