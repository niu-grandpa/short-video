import { Router } from 'express';
import Paths from '../constants/Paths';
import Controllers from './controllers';

const actionRouter = Router();

actionRouter.put(Paths.Actions.Following, Controllers.following);
actionRouter.put(Paths.Actions.Favorites, Controllers.favorites);
actionRouter.put(Paths.Actions.LikeVideo, Controllers.likeVideo);
actionRouter.put(Paths.Actions.VideoWatched, Controllers.videoWatched);

export default actionRouter;
