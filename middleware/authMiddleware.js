const jwt = require('jsonwebtoken');
require("dotenv").config();


const isAuth = (req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                msg:"Unauthorize"
            });

        }
            const decoded = jwt.verify(token,process.env.JWT_KEY);
            
            req.user = decoded;
            next();

    }catch(err){
        return res.status(403).json({
            msg:"invalid token !"
        })
    }
}

module.exports = isAuth