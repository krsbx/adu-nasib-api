import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

class PostDislikeRepository extends BaseRepository(MODELS_NAME.POST_DISLIKE) {
  public static async resourceToModel(resource: AnyRecord) {
    const model = _.pick(resource, ['postId', 'userId']);

    return model;
  }

  public static async modelToResource(model: ModelStructure['postDislike']) {
    return model;
  }
}

export default PostDislikeRepository;
