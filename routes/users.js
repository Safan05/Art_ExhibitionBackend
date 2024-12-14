const express= require ('express');
const router = express.Router();
const userController = require('../controllers/UserController');
router.post('/Feedback',userController.addFeedback); // done front
router.get('/UserFeedback',userController.getUserFeedback); // done front
router.put('/Feedback',userController.updateFeedback);
router.post('/deleteFeedback',userController.deleteFeedback);
router.get('/Feedback',userController.getFeedback); // done front
router.get('/name',userController.getartistName);   // done front
router.get('/data',userController.getUser);   // done front
module.exports = router;