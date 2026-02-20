const { Router } = require("express");
const { registerController, loginController } = require("../controllers/auth.controller");

const authRouter = Router();


authRouter.post("/sign-up",registerController);
authRouter.post("/log-in",loginController);



module.exports = authRouter;