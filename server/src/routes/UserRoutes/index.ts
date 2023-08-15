import { Router } from 'express';
import Paths from '../constants/Paths';
import Controllers from './controllers';

const userRouter = Router();

userRouter.get(Paths.Users.Get, Controllers.getAll);
userRouter.get(Paths.Users.One, Controllers.getOne);
userRouter.post(Paths.Users.Update, Controllers.update);
userRouter.post(Paths.Users.Login, Controllers.login);
userRouter.post(Paths.Users.Logout, Controllers.logout);

export default userRouter;
