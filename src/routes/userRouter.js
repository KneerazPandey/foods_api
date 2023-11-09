import { Router } from "express";
import { getUser, deleteUser, updateUser } from "../controllers/userController.js";
import { verifyAndAuthorization } from "../middleware/middlewares.js";

const userRouter = Router();

userRouter.get('/', verifyAndAuthorization, getUser);

userRouter.put('/update', verifyAndAuthorization, updateUser);

userRouter.delete('/delete', verifyAndAuthorization, deleteUser);

export default userRouter;