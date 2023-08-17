import { Router } from 'express';
import Paths from '../constants/Paths';

import ActionRoutes from '../ActionRoutes';
import userRouter from '../UserRoutes';
import videoRouter from '../VideoRoutes';

const apiRouter = Router();

apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Videos.Base, videoRouter);
apiRouter.use(Paths.Actions.Base, ActionRoutes);

export default apiRouter;
