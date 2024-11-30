const express = require('express');
const router = express.Router();
const authorize=require('../middlewares/AuthorizeAdmin.js');
router.use(authorize);
module.exports = router;