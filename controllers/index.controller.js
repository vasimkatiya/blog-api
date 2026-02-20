const pool = require("../db/pool")


exports.indexController = async (req,res) => {
    const {posts} = await pool.query("select * from posts;");

    if(!posts){
        res.status(500).json({
            msg:"post can't fetched"
        });
    }

    res.status().json({
        posts,
        title:"hey, welcome",
    });

}