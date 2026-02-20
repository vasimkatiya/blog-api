const { Router } = require("express");
const isAuth = require("../middleware/authMiddleware");
const { createPostController } = require("../controllers/post.controller");
const multer = require('multer');
const { createCommentController } = require("../controllers/comment.controller");
// const pool = require("../db/pool");


const upload = multer({
    storage:multer.memoryStorage()
})

const postRouter = Router();

postRouter.post("/create",isAuth,upload.single('image'),createPostController);

postRouter.post("/:postId/comments",createCommentController)

module.exports = postRouter;