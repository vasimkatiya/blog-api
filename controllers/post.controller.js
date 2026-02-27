const pool = require("../db/pool");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { uploadFiles } = require("../services/imageKit")


exports.createPostController = async (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ msg: "Token not provided" });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }

    const { rows } = await pool.query('select * from users where id = $1', [decoded.id]);

    if (rows.length == 0) {
        return res.status(404).json({
            msg: "user not found !"
        });
    };

    const user = rows[0];

    const { caption } = req.body;

    const file = req.file;

    if (!file) {
        return res.status(400).json({
            msg: "file does not found !"
        });
    };

    const result = await uploadFiles(file.buffer.toString('base64'));

    const insert = await pool.query("INSERT INTO posts (caption,image_url,user_id,is_publish) VALUES ($1,$2,$3,$4) RETURNING *;", [caption, result.url, user.id, true]);

    res.status(201).json({
        msg: "post created successfully !",
        posts: insert.rows[0]
    });

}


exports.showPostController = async (req,res)=>{
    try{

        const posts = await pool.query("SELECT * from posts;");

        if(posts.rows.length == 0){
            return res.status(404).json({
                msg:"post not found or not fetched !",
            })
        }

        res.status(200).json({
            msg:'post fetched successfully',
            posts:posts.rows,
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:'internal server error',
        })
    }
}

exports.singlePostController = async(req,res)=>{
    const {id} = req.params;
    
    const post = await pool.query('select * from posts where id = $1;',[id]);

    
    res.status(200).json({
        msg:'post fetched',
        post:post.rows[0],
    })

}


exports.profilesPostsController = async (req,res)=>{
    //searched users profiles
    const {userId} = req.params;

    const posts = await pool.query('select * from posts where user_id = $1;',[userId]);

    res.status(200).json({
        msg:'profile post fetched',
        posts:posts.rows,
    });

}


exports.OwnProfilePost = async(req,res)=>{
    const userId = req.user.id;
    const posts = await pool.query('select * from posts where user_id = $1;',[userId]);


    res.status(200).json({
        msg:'profile post fetched',
        posts:posts.rows,
    });

}

exports.deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        if (!id) {
            return res.status(400).json({
                msg: "Post ID is required",
            });
        }

        const deletedPost = await pool.query(
            "DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *;",
            [id, userId]
        );

        if (deletedPost.rows.length === 0) {
            return res.status(403).json({
                msg: "Post not found or you are not authorized to delete it",
            });
        }

        res.status(200).json({
            msg: "Post deleted successfully!",
            deletedPost: deletedPost.rows[0],
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
};