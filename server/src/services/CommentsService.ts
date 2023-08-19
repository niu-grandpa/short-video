import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import Comments, {
  AddComment,
  GetComments,
  IComment,
  UpdateComment,
} from '@src/models/Comments';
import genera from '@src/models/genera';
import db from '@src/mongodb';
import { RouteError } from '@src/other/classes';
import UserService from './UserService';

async function getList(opts: GetComments): Promise<IComment[]> {
  const syncInfo = genera.updateOnceAuthorInfo(1);
  try {
    await syncInfo(UserService.getAll, db.CommentModel);
    const { belong, page, size, sort, level } = opts;
    // @ts-ignore
    return await db.CommentModel.find({ belong, level })
      .sort({ create_at: sort ?? 1 })
      .skip(page * size)
      .limit(size);
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to get comments'
    );
  }
}

async function addOne(data: AddComment): Promise<IComment> {
  try {
    const { avatar, nickname } = await UserService.getProfile(data.uid);
    const newData = Comments.new({
      ...data,
      avatar: avatar!,
      author: nickname!,
    });
    await new db.CommentModel(newData).save();
    return newData;
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to add comment'
    );
  }
}

async function removeOne(_id: string): Promise<void> {
  try {
    await db.CommentModel.findOneAndRemove({ _id });
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to delete comment'
    );
  }
}

async function updateOne({ _id, content }: UpdateComment): Promise<void> {
  try {
    await db.CommentModel.findOneAndUpdate(
      { _id },
      { $set: { content, updated_at: Date.now() } }
    );
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to update comment'
    );
  }
}

export default {
  getList,
  addOne,
  updateOne,
  removeOne,
} as const;
