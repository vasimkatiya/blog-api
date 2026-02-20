const { Router } = require("express");
const isAuth = require("../middleware/authMiddleware");
const { createPostController, showPostController } = require("../controllers/post.controller");
const multer = require('multer');
const { createCommentController, showCommentsController } = require("../controllers/comment.controller");
// const pool = require("../db/pool");


const upload = multer({
    storage:multer.memoryStorage()
})

const postRouter = Router();

postRouter.get("/",showPostController)

postRouter.post("/create",isAuth,upload.single('image'),createPostController);

postRouter.post("/:postId/comments",isAuth,createCommentController);

postRouter.get("/:postId/comments",showCommentsController)

module.exports = postRouter;