const pool = require("../db/pool")


exports.createCommentController = async(req,res)=>{
    try{
        const {content} = req.body;
        const {postId} = req.params;
        const userId = req.user.id;

        if(!content){
            return res.status(400).json({
                msg:"invalid content"
            })
        }

        const postCheck = await pool.query('select * from posts where id = $1;',[postId]);

        if(postCheck.rows.length == 0){
            return res.status(404).json({
                msg:"post not found !"
            });
        };

        const insert = await pool.query("INSERT INTO comments (content,post_id,user_id) VALUES ($1,$2,$3);",[content,postId,userId]);

        res.status(201).json({
            msg:"comment created",
            comment:insert.rows[0]
        })

    }catch(err){
        res.status(500).json({
            msg:"internal server error"
        })
    }
}