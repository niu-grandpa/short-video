import { Router } from 'express';
import Paths from '../constants/Paths';

import ActionRoutes from '../ActionRoutes';
import CommentRoutes from '../CommentRoutes';
import PermissionRoutes from '../PermissionRoutes';
import userRouter from '../UserRoutes';
import videoRouter from '../VideoRoutes';

const apiRouter = Router();

apiRouter
  .use(Paths.Users.Base, userRouter)
  .use(Paths.Videos.Base, videoRouter)
  .use(Paths.Actions.Base, ActionRoutes)
  .use(Paths.Comments.Base, CommentRoutes)
  .use(Paths.Permissions.Base, PermissionRoutes);

export default apiRouter;
