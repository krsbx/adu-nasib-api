import _ from 'lodash';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import factory from './baseRepository';

const commentLikeRepository = factory(MODELS_NAME.COMMENT_LIKE);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['commentId', 'userId']);

  return model;
};

const modelToResource = async (model: ModelStructure['commentLike']) => {
  return model;
};

const extendCommentLikeRepository = {
  modelToResource,
  resourceToModel,
};

const repository = _.merge(commentLikeRepository, extendCommentLikeRepository);

export default repository;
