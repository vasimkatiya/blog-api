const pool = require("../db/pool");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require('bcryptjs');
const { uploadFiles } = require("../services/imageKit");

exports.registerController = async (req, res) => {
  try {
    const { username, password} = req.body;
    const file = req.file

    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (rows.length > 0) {
      return res.status(400).json({
        msg: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10)
   
    const result = await uploadFiles(file.buffer.toString('base64'));

    const avatar_url = result.url;

    const insertUser = await pool.query(
      "INSERT INTO users (username, password, avatar_url) VALUES ($1, $2, $3) RETURNING *",
      [username,hashedPassword, avatar_url]
    );

    const user = insertUser.rows[0];

    
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

  
    res.cookie("token",token)

    res.status(201).json({
      msg: "User registered successfully!",
      user:{
        id:user.id,
        username:user.username,
        role:user.role
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};


exports.loginController = async (req,res)=>{

    const {username,password} = req.body;

    const {rows} = await pool.query('select * from users where username = $1;',[username]);

    if(rows.length < 0)
    {
        res.status(401).json({
            msg:"user not found !"
        });
    };

    const validPassword = await bcrypt.compare(password,rows[0].password);

    if(!validPassword){
        res.status(401).json({
            msg:"invalid password"
        })
    }

    const token = jwt.sign({
        id:rows[0].id,
        username:rows[0].username
    },process.env.JWT_KEY);


    res.cookie("token",token);

    res.status(200).json({
        msg:"user login successfully !",
        user:rows[0]
    })

}