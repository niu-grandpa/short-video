import Comments, {
  AddComment,
  ICommentItem,
  IComments,
  RemoveComment,
} from '@src/models/Comments';
import db from '@src/mongodb';

async function getOne(belong: string): Promise<IComments | null> {
  return await db.CommentModel.findOne({ belong });
}

async function addOne(data: AddComment): Promise<ICommentItem> {
  const item = Comments.new(data);
  const res = await getOne(data.belong);

  // @ts-ignore
  delete item.belong;

  if (res !== null) {
    // 是回复的子评论
    if (data?.father_id) {
      await db.CommentModel.updateOne(
        { belong: data.belong, 'comments._id': data.father_id },
        { $push: { 'comments.$.replies': item } }
      );
    } else {
      await db.CommentModel.updateOne(
        { belong: data.belong },
        { $push: { comments: item } }
      );
    }
  } else {
    await new db.CommentModel(item).save();
  }

  return item;
}

async function removeOne(data: RemoveComment): Promise<void> {
  // 删除回复的子评论
  if (data?.child_id) {
    await db.CommentModel.updateOne(
      { belong: data.belong, 'comments._id': data.father_id },
      { $pull: { 'comments.$.replies': { _id: data.child_id } } }
    );
  } else {
    // 删除父评论
    await db.CommentModel.updateOne(
      { belong: data.belong },
      { $pull: { comments: { _id: data.father_id } } }
    );
  }
}

export default {
  getOne,
  addOne,
  removeOne,
} as const;
