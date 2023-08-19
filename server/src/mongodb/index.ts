import mongoose from 'mongoose';

import EnvVars from '@src/constants/EnvVars';
import Schemas from './schemas';

// 连接数据库

mongoose.connect(EnvVars.DB.Host + EnvVars.DB.Database);

const db = mongoose.connection;

// 监听数据库连接状态
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
  console.log('成功连接到数据库');
});

// 用于操作数据库文档的模型

const UserModel = db.model('users', Schemas.User);
const VideoModel = db.model('video_posts', Schemas.Video);
const CommentModel = db.model('video_comments', Schemas.Comment);

// 为集合中的字段创建随机索引，便于$sample 阶段高性能获取随机文档
db.collection('users').createIndex({ random: 1 });
db.collection('video_posts').createIndex({ random: 1 });

export default {
  UserModel,
  VideoModel,
  CommentModel,
} as const;
