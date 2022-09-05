import _ from 'lodash';
import factory from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

const commentDislikeRepository = factory(MODELS_NAME.COMMENT_DISLIKE);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['commentId', 'userId']);

  return model;
};

const modelToResource = async (model: ModelStructure['commentLike']) => {
  return model;
};

const extendCommentDislikeRepository = {
  modelToResource,
  resourceToModel,
};

const repository = _.merge(commentDislikeRepository, extendCommentDislikeRepository);

export default repository;
