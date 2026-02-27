const { Router } = require("express");
const { indexController } = require("../controllers/index.controller");
const { searchController } = require("../controllers/search.Controller");
const isAuth = require("../middleware/authMiddleware");
const { searchProfileController } = require("../controllers/profileController");
const { singlePostController } = require("../controllers/post.controller");

const indexRouter = Router();

indexRouter.get("/",indexController);

indexRouter.get('/search',isAuth,searchController);

indexRouter.get('/search/:id/profile',searchProfileController);

indexRouter.get("/search/profile/post/:id",singlePostController);


module.exports = indexRouter;