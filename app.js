const express=require("express");
const app = express();
const bodyParser = require("body-parser");
const pg=require("pg");
const path=require("path");
const register=require("./routes/register");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/helloWorld",(req,res)=>{
    res.send("Hello World");
});
app.use("/register",register);
const port = process.env.port||3000;
app.listen(port,()=>{console.log(`listening to port ${port}`)});