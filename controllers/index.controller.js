const pool = require("../db/pool")


exports.indexController = async (req,res) => {
    const posts = await pool.query("select * from posts;");

    if(posts.rows.length == 0){
        res.status(404).json({
            msg:"post can't fetched"
        });
    }

    res.status(200).json({
        msg:'post fetched successfully',
        posts:posts.rows,
        title:"hey, welcome",
    });

}