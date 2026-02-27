const pool = require("../db/pool");
const { uploadFiles } = require("../services/imageKit");


exports.updateProfile = async (req, res) => {
    try {

        const userId = req.user.id;

        const profileInfo = await pool.query(`SELECT * FROM users WHERE id = $1;`, [userId]);

        if (profileInfo.rows.length == 0) {
            return res.status(400).json({
                msg: 'bad request or profile data not fetched !',
            });
        }

        res.status(400).json({
            msg: 'profile data fetched !',
            profile: profileInfo.rows[0],
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'internal server error.',
        })
    }
}

exports.postUpdateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { username } = req.body;
        const file = req.file

        const result = await uploadFiles(file.buffer.toString('base64'));

        const avatar_url = result.url;

        const update = await pool.query(
            "UPDATE users SET username = $1, avatar_url = $2 WHERE id = $3 RETURNING *",
            [username, avatar_url, userId]
        );
        if (update.rows.length == 0) {
            return res.status(400).json({
                msg: 'profile data can not updated !',
            });
        }

        res.status(200).json({
            msg: 'profile update successfully !',
            update: update.rows[0]
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'internal server error.',
        })
    }
}