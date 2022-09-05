import _ from 'lodash';
import factory from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

const postLikeRepository = factory(MODELS_NAME.POST_LIKE);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['postId', 'userId']);

  return model;
};

const modelToResource = async (model: ModelStructure['postLike']) => {
  return model;
};

const extendPostLikeRepository = {
  modelToResource,
  resourceToModel,
};

const repository = _.merge(postLikeRepository, extendPostLikeRepository);

export default repository;
