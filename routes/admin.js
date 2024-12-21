const express = require('express');
const router = express.Router();
const authorize=require('../middlewares/AuthorizeAdmin.js');
const adminController = require('../controllers/AdminController.js');
router.use(authorize);
router.get('/Users',adminController.getUsers);  // done front
router.post('/ban/user',adminController.BanUser);    // done front
router.post('/unban/user',adminController.unBanUser); // done front
router.get('/ban/user',adminController.getBannedUsers); // done front
router.post('/ban/art',adminController.BanArt); // done front
router.post('/unban/art',adminController.unBanArt); // done front
router.get('/ban/art',adminController.getBannedArts); // done front
router.get('/req/auctions',adminController.getAuctionRequests); // done front
router.get('/exhibition',adminController.getExhibitions); // done front
router.post('/exhibition',adminController.startExhibition); // done front
router.post('/Endexhibition',adminController.endExhibition); // done front
router.put('/exhibition',adminController.updateExhibition); // done front
router.post('/exhibition/arts',adminController.addArtToExhibition); // done front
router.post('/exhibition/Remarts',adminController.removeArtFromExhibition); // done front
router.put('/auction/approve',adminController.approveAuction); // done front
router.put('/auction/reject',adminController.rejectAuction);
router.post('/auction',adminController.deleteAuction);
router.post('/MakeAdmin',adminController.MakeAdmin);    // done front
router.post('/RemoveAdmin',adminController.RemoveAdmin); // done front
router.get('/Statistics',adminController.getStatistics); // done front
router.get('/Activity',adminController.getActivity); // done front
module.exports = router;