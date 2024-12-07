const express= require ('express');
const router = express.Router();
const userController = require('../controllers/UserController');
router.post('/Feedback',userController.addFeedback);
router.put('/Feedback',userController.updateFeedback);
router.delete('/Feedback',userController.deleteFeedback);
router.get('/name',userController.getartistName);
module.exports = router;