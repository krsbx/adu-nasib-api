import _ from 'lodash';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import factory from './baseRepository';

const postRepository = factory(MODELS_NAME.POST);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['content', 'userId']);

  return model;
};

const modelToResource = async (model: ModelStructure['post']) => {
  return model;
};

const extendPostRepository = {
  modelToResource,
  resourceToModel,
};

const repository = _.merge(postRepository, extendPostRepository);

export default repository;
