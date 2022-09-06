import BadwordFilter from 'badwords-ts';
import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import postDislike from './postDislike';
import postLike from './postLike';

class Post extends BaseRepository(MODELS_NAME.POST) {
  public static async resourceToModel(resource: AnyRecord) {
    const model = _.pick(resource, ['content', 'userId']);

    if (model.content) model.content = BadwordFilter.instance.clean(model.content);

    return model;
  }

  public static async modelToResource(model: ModelStructure['comment']) {
    return model;
  }

  public static async getLikes(postId: number) {
    return postLike.count({
      postId,
    });
  }

  public static async getDislikes(postId: number) {
    return postDislike.count({
      postId,
    });
  }

  public static async getLikeStatus(postId: number, userId: number) {
    return !_.isEmpty(
      await postLike.findOne({
        postId,
        userId,
      })
    );
  }

  public static async getDislikeStatus(postId: number, userId: number) {
    return !_.isEmpty(
      await postDislike.findOne({
        postId,
        userId,
      })
    );
  }
}

export default Post;
