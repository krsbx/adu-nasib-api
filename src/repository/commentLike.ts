import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

class CommentLikeRepository extends BaseRepository(MODELS_NAME.COMMENT_LIKE) {
  public static async resourceToModel(resource: AnyRecord) {
    const model = _.pick(resource, ['commentId', 'userId']);

    return model;
  }

  public static async modelToResource(model: ModelStructure['commentLike']) {
    return model;
  }
}

export default CommentLikeRepository;
