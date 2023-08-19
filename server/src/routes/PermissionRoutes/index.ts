import { Router } from 'express';
import Paths from '../constants/Paths';
import Controllers from './controllers';

const actionRouter = Router();

actionRouter.put(Paths.Permissions.SetUser, Controllers.setUser);
actionRouter.put(Paths.Permissions.SetVideo, Controllers.setVideo);

export default actionRouter;
