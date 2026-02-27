const pool = require("../db/pool");

exports.searchController = async(req,res)=>{
    try{
        const {username} = req.query;
        
        const users = await pool.query("select * from users where username ilike $1;",[`%${username}%`]);

        if(users.rows.length == 0){
            return res.status(404).json({
                msg:"search result not found."
            });
        }

        res.status(200).json({
            msg:'search result fetched !',
            users:users.rows,
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:"internal server error"
        })
    }
}