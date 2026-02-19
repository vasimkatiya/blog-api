const express = require('express');
const indexRouter = require('./routes/index.routes');
require("dotenv").config();


const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// add routes 

app.use("/",indexRouter)

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`);
})