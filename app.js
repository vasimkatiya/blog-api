const express = require('express');
const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/post.routes');
const isAuth = require('./middleware/authMiddleware');
const profileRouter = require('./routes/profile.routes');
const cors = require("cors");
require("dotenv").config();


const port = process.env.PORT || 3000;

const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// add routes 

app.use("/auth",authRouter);
app.use("/",isAuth,indexRouter);
app.use("/post",isAuth,postRouter);
app.use("/profile",isAuth,profileRouter)

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`);
});