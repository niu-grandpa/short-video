import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import Comments, {
  AddComment,
  GetComments,
  IComment,
  RemoveComment,
  UpdateComment,
} from '@src/models/Comments';
import db from '@src/mongodb';
import { RouteError } from '@src/other/classes';

async function getList(opts: GetComments): Promise<IComment[]> {
  try {
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
    const newData = Comments.new(data);
    await new db.CommentModel(newData).save();
    return newData;
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to add comment'
    );
  }
}

async function removeOne(filter: RemoveComment): Promise<void> {
  try {
    await db.CommentModel.findOneAndRemove(filter);
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
