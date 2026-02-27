const pool = require("../db/pool");


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

        const insert = await pool.query("INSERT INTO comments (content,post_id,user_id) VALUES ($1,$2,$3) RETURNING *;",[content,postId,userId]);

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


exports.showCommentsController = async (req,res)=>{
    try{

        const {postId} = req.params;

        const postCheck = await pool.query('select * from posts where id = $1;',[postId]);

        if(postCheck.rows.length == 0){
            return res.status(404).json({
                msg:"post not found !"
            });
        };

        const comments = await pool.query("SELECT comments.id,comments.content,comments.created_at, users.id AS user_id.users.username,users.avatar_url FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = $1 ORDER BY comments.created_at DESC ;",[postId]);

        res.status(200).json({
            msg:"comments fetched successfully",
            total:comments.rows.length,
            comments:comments.rows,
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:"internal server error"
        })
    }
}