const express = require('express');
const  registercontroller  = require('../controllers/registerController');
const validator = require('../middlewares/RegisterationValidator');
const router = express.Router();
router.post('/', validator,registercontroller.register);
module.exports= router;