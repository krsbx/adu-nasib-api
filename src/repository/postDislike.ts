import _ from 'lodash';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import factory from './baseRepository';

const postDislikeRepository = factory(MODELS_NAME.POST_DISLIKE);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['postId', 'userId']);

  return model;
};

const modelToResource = async (model: ModelStructure['postLike']) => {
  return model;
};

const extendPostDislikeRepository = {
  modelToResource,
  resourceToModel,
};

const repository = _.merge(postDislikeRepository, extendPostDislikeRepository);

export default repository;
