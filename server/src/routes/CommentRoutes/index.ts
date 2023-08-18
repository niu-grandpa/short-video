import { Router } from 'express';
import Paths from '../constants/Paths';
import Controllers from './controllers';

const commentRouter = Router();

commentRouter.get(Paths.Comments.Get, Controllers.get);
commentRouter.post(Paths.Comments.Add, Controllers.add);
commentRouter.delete(Paths.Comments.Remove, Controllers.remove);

export default commentRouter;
