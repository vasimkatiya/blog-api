const pool = require("../db/pool");

exports.profileController = async (req,res)=>{
    try{
        const id = req.user.id;

        console.log(id);
        

        const user = await pool.query('select * from users where id = $1;',[id]);

        if(user.rows.length == 0){
            return res.status(404).json({
                msg:'user not fetched !',
            });
        };

         const posts = await pool.query('select * from posts where user_id = $1;',[id]);

        

        res.status(200).json({
            msg:"user fetched successfully",
            user:user.rows[0],
            posts:posts.rows ||[]
        })


    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:'internal server error',
        })
    }

}

exports.searchProfileController = async (req,res)=>{
    try{
        
        const {id} = req.params;
        
        if(!id){
            return res.status(404).json({
                msg:'user id can not fetched ',
            })
        }

        const user = await pool.query('select * from users where id = $1;',[id]);

        if(user.rows.length == 0){
            return res.status(404).json({
                msg:'user not found',
            })
        }

        const posts = await pool.query('select * from posts where user_id = $1;',[id]);

        if(posts.rows.length == 0){
            return res.status(404).json({
                msg:'posts not found',
            })
        }

        res.status(200).json({
            msg:'user fetched !',
            user:user.rows[0],
            posts:posts.rows,
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:'internal server error'
        })
    }
}