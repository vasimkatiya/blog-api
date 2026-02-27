const { Router } = require("express");
const isAuth = require("../middleware/authMiddleware");
const { createPostController, showPostController, deletePostController, singlePostController } = require("../controllers/post.controller");
const multer = require('multer');
const { createCommentController, showCommentsController } = require("../controllers/commentController");
// const pool = require("../db/pool");


const upload = multer({
    storage:multer.memoryStorage()
});

const postRouter = Router();

postRouter.get("/",showPostController)

postRouter.post("/create",isAuth,upload.single('image'),createPostController);

postRouter.post("/:postId/comments",isAuth,createCommentController);

postRouter.get("/:postId/comments",isAuth,showCommentsController);

postRouter.get("/:id/delete",isAuth,deletePostController)

postRouter.get('/:id',singlePostController)

module.exports = postRouter;