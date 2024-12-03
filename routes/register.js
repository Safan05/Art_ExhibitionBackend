const express = require('express');
const  registercontroller  = require('../controllers/registerController');
const validator = require('../middlewares/RegisterationValidator');
const router = express.Router();
router.post('/', validator,registercontroller.register);
router.post('/logout', (req,res)=>{
    console.log("logging out...");
    res.clearCookie("Role");
    res.clearCookie("x-auth-token");
    res.clearCookie("Logged");
    res.clearCookie("name");
    res.status(200).send("Logged out successfully");
});
module.exports= router;