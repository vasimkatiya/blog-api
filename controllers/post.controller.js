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