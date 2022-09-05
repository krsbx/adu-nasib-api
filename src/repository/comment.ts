import BadwordFilter from 'badwords-ts';
import _ from 'lodash';
import BaseRepository from './baseRepository';
import commentDislike from './commentDislike';
import commentLike from './commentLike';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

class Comment extends BaseRepository(MODELS_NAME.COMMENT) {
  public static async resourceToModel(resource: AnyRecord) {
    const model = _.pick(resource, ['content', 'postId', 'userId']);

    if (model.content) model.content = BadwordFilter.instance.clean(model.content);

    return model;
  }

  public static async modelToResource(model: ModelStructure['comment']) {
    return model;
  }

  public static async getLikes(commentId: number) {
    return commentLike.count({
      commentId,
    });
  }

  public static async getDislikes(commentId: number) {
    return commentDislike.count({
      commentId,
    });
  }

  public static async getLikeStatus(commentId: number, userId: number) {
    return !_.isEmpty(
      await commentLike.findOne({
        commentId,
        userId,
      })
    );
  }

  public static async getDislikeStatus(commentId: number, userId: number) {
    return !_.isEmpty(
      await commentDislike.findOne({
        commentId,
        userId,
      })
    );
  }
}

export default Comment;
