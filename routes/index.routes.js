const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/",(req,res)=>{
    res.send("<h1>hello world!</h1>");
})

module.exports = indexRouter;