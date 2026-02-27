const { Router } = require("express");
const { profileController } = require("../controllers/profileController");
const isAuth = require("../middleware/authMiddleware");
const multer = require('multer')
const { updateProfile, postUpdateProfile } = require("../controllers/updateProfileControllers");

const upload = multer({ storage: multer.memoryStorage() });

const profileRouter = Router();

profileRouter.get('/',isAuth,profileController);

profileRouter.get('/update',isAuth,updateProfile)

profileRouter.post("/edit",isAuth,upload.single('avatar'),postUpdateProfile)

module.exports = profileRouter;
