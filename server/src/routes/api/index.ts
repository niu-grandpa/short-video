import { Router } from 'express';
import userRouter from '../UserRoutes';
import Paths from '../constants/Paths';

const apiRouter = Router();

apiRouter.use(Paths.Users.Base, userRouter);

export default apiRouter;
