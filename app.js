const express=require("express");
const app = express();
const helmet = require("helmet");
const cors = require('cors');
const register=require("./routes/register");
const login = require("./routes/authenticate");
const admin = require("./routes/admin");
const arts = require("./routes/Arts");
const artist = require("./routes/artist");
const uploadimg = require("./routes/imgupload");
const user = require('./routes/users');
const Client=require('./routes/client');
const cookieParser = require('cookie-parser');
process.on("uncaughtException",(exception)=>{console.log("Exception !")});  // used to handle any sync exception that may happen
process.on("unhandledRejection",(exception)=>{console.log("Rejection !")});  // used to handle any asyn rejection that may happen
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/helloWorld",(req,res)=>{
    console.log("Had Req Hello World");
    res.send("Hello World");
});
app.use("/artist",artist);
app.use("/register",register);
app.use("/login",login);
app.use("/admin",admin);
app.use("/arts",arts);
app.use("/upload",uploadimg);
app.use("/client",Client);
app.use("/user",user);
const port = process.env.port||3000;
app.listen(port,()=>{console.log(`listening to port ${port}`)});