const { Router } = require("express");
const { registerController, loginController } = require("../controllers/auth.controller");
const multer = require('multer');

const upload = multer({
    storage:multer.memoryStorage(),
})

const authRouter = Router();


authRouter.post("/sign-up",upload.single('avatar'),registerController);
authRouter.post("/log-in",loginController);



module.exports = authRouter;