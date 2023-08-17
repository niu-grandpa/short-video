import mongoose from 'mongoose';

// 描述文档的结构

const User = new mongoose.Schema({
  uid: String,
  nickname: String,
  avatar: String,
  gender: Number,
  user_sign: String,
  role: Number,
  token: String,
  logged: Boolean,
  posts: Array,
  favorites: Array,
  following: Array,
  followers: Array,
  phoneNumber: String,
  permissions: {
    no_access: Boolean,
    lock_posts: Boolean,
    lock_favorited: Boolean,
  },
});

const Video = new mongoose.Schema({
  vid: Number,
  url: String,
  title: String,
  seen: Number,
  uid: String,
  avatar: String,
  likes: Array,
  favorites: Array,
  permissions: {
    publicity: Boolean,
    private: Boolean,
    friends_only: Boolean,
  },
});

const Comment = new mongoose.Schema({
  belong: Number,
  comments: Array,
});

export default {
  User,
  Video,
  Comment,
} as const;
