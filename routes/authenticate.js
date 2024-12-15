const express = require('express');
const router = express.Router();
const Authneticate=require('../controllers/AuthenticationController');
router.post('/',Authneticate.login); // done front
module.exports = router;