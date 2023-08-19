import { Router } from 'express';
import Paths from '../constants/Paths';
import Controllers from './controllers';

const userRouter = Router();

userRouter.get(Paths.Users.Get, Controllers.getAll);
userRouter.get(Paths.Users.One, Controllers.getOne);
userRouter.get(Paths.Users.Recommend, Controllers.getRandom);
userRouter.get(Paths.Users.HasSessionExpired, Controllers.sessionExpired);

userRouter.post(Paths.Users.Login, Controllers.login);
userRouter.post(Paths.Users.Logout, Controllers.logout);

userRouter.put(Paths.Users.Update, Controllers.update);
userRouter.put(Paths.Users.Profile, Controllers.profile);

export default userRouter;
