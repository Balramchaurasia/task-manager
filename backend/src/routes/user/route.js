import { Router } from "express";
import userController from "./controller.js";
import auth from "../../utils/auth.js";
const userRouter = Router();

userRouter.post('/register', userController.userRegister);
userRouter.post('/login', userController.userLogin); 
userRouter.get('/me',auth,userController.getMe);




export default userRouter;