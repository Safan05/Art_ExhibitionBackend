const express = require('express');
const router = express.Router();
const uploadimg=require('../controllers/ImagesUpload');
router.post('/',uploadimg.uploadImage); // done front
module.exports = router;