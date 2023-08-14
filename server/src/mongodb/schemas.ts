import mongoose from 'mongoose';

// 描述文档的结构

const User = new mongoose.Schema({
  uid: String,
  role: String,
  token: String,
  password: String,
  logged: Boolean,
  posts: Array,
  favorites: Array,
  following: Array,
  followers: Array,
  phoneNumber: Number,
});

const Profile = new mongoose.Schema({
  uid: String,
  nickname: String,
  avatar: String,
  gender: Number,
  user_sign: String,
  privacy_settings: Object,
});

const Video = new mongoose.Schema({
  vid: Number,
  url: String,
  title: String,
  seen: Number,
  user_id: String,
  user_icon: String,
  likes: Number,
  followers: Number,
  is_public: Boolean,
});

const Comment = new mongoose.Schema({
  belong: Number,
  comments: Array,
  // comments: [
  //   {
  //     content: String,
  //     likes: Number,
  //     dislikes: Number,
  //     user_id: String,
  //     user_icon: String,
  //     replys: Array,
  //   },
  //   ...
  // ]
});

const Like = new mongoose.Schema({
  belong: Number,
  users: Array,
});

const Favorite = new mongoose.Schema({
  belong: Number,
  users: Array,
});

export default {
  User,
  Profile,
  Video,
  Comment,
  Like,
  Favorite,
} as const;
