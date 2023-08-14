import mongoose from 'mongoose';

import EnvVars from '@src/constants/EnvVars';
import { NodeEnvs } from '@src/constants/misc';

import Schemas from './schemas';

const dbName =
  EnvVars.NodeEnv === NodeEnvs.Dev.valueOf() ? EnvVars.Db.Database : '';

// 连接数据库

mongoose
  .connect(EnvVars.Db.Host + dbName)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB', error));

const db = mongoose.connection;

// 用于操作数据库文档的模型

const UserModel = db.model('users', Schemas.User);
const VideoModel = db.model('videos', Schemas.Video);
const LikeModel = db.model('likes', Schemas.Like);
const FavoriteModel = db.model('favorites', Schemas.Favorite);
const ProfileModel = db.model('personal_profiles', Schemas.Profile);
const CommentModel = db.model('comments', Schemas.Comment);

// 使用模型来创建文档。例如，要创建一个新的用户文档，可以这样做:
// const newUser = new UserModel({
//   nickname: 'John Doe',
//   phoneNumber: '13246578946',
// });
// newUser.save().then(() => {
//   console.log('User created successfully');
// })
// .catch(error => {
//   console.error('Error creating user', error);
// });

// 查询匹配特定条件的文档
// newUser.find({ name: 'John Doe' })
//   .then(users => {
//     console.log(users);
//   })
//   .catch(error => {
//     console.error('Error querying users', error);
//   });

export default {
  UserModel,
  VideoModel,
  LikeModel,
  FavoriteModel,
  ProfileModel,
  CommentModel,
} as const;
