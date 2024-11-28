const express = require('express');
const  registercontroller  = require('../controllers/registerController');
const router = express.Router();
router.post('/', registercontroller.register);
module.exports= router;