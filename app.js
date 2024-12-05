const express=require("express");
const app = express();
const helmet = require("helmet");
const cors = require('cors');
const register=require("./routes/register");
const login = require("./routes/authenticate");
const admin = require("./routes/admin");
const uploadimg = require("./routes/imgupload");
const cookieParser = require('cookie-parser');
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/helloWorld",(req,res)=>{
    res.send("Hello World");
});
app.use("/register",register);
app.use("/login",login);
app.use("/admin",admin);
app.use("/upload",uploadimg);
const port = process.env.port||3000;
app.listen(port,()=>{console.log(`listening to port ${port}`)});