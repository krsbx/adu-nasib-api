import _ from 'lodash';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import factory from './baseRepository';

const commentRepository = factory(MODELS_NAME.COMMENT);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['content', 'postId', 'userId']);

  return model;
};

const modelToResource = async (model: ModelStructure['comment']) => {
  return model;
};

const extendCommentRepository = {
  modelToResource,
  resourceToModel,
};

const repository = _.merge(commentRepository, extendCommentRepository);

export default repository;
