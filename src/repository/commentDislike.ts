import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

class CommentDislikeRepository extends BaseRepository(MODELS_NAME.COMMENT_DISLIKE) {
  public static async resourceToModel(resource: AnyRecord) {
    const model = _.pick(resource, ['commentId', 'userId']);

    return model;
  }

  public static async modelToResource(model: ModelStructure['commentDislike']) {
    return model;
  }
}

export default CommentDislikeRepository;
