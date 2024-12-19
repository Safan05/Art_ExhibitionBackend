const express = require('express');
const  registercontroller  = require('../controllers/registerController');
const validator = require('../middlewares/RegisterationValidator');
const upload = require("../util/UploadImg");
const router = express.Router();
router.post('/', upload.single("image"),validator,registercontroller.register);    // done front
router.post('/logout', registercontroller.logout);  // done front
router.put('/change-password', registercontroller.updatePassword); // done front
router.put('/profilePic', upload.single("image"),registercontroller.updateProfilepic); // done front
router.put('/update-info' , registercontroller.updateTheUserInfo);   // done front
module.exports= router;