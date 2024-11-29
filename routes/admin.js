const express = require('express');
const router = express.Router();
const authorize=require('../middlewares/AuthorizeAdmin.js');
router.post('/',authorize,(req,res)=>{
    res.send("Admin Page");
});
module.exports = router;