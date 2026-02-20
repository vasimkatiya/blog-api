const express = require('express');
const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/post.routes');
require("dotenv").config();



const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// add routes 

app.use("/",indexRouter);
app.use("/auth",authRouter);
app.use("/post",postRouter);

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`);
});