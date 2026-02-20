const { Router } = require("express");
const isAuth = require("../middleware/authMiddleware");
const { createPostController } = require("../controllers/post.controller");
const multer = require('multer');
// const pool = require("../db/pool");


const upload = multer({
    storage:multer.memoryStorage()
})

const postRouter = Router();

postRouter.post("/create",isAuth,upload.single('image'),createPostController)

module.exports = postRouter;