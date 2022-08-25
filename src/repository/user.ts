import _ from 'lodash';
import { hashText } from '../utils/encryption';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import factory from './baseRepository';

const userRepository = factory(MODELS_NAME.USER);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['username', 'email', 'password', 'role']);

  if (model.password) {
    model.password = await hashText(model.password);
  }

  return model;
};

const modelToResource = async (model: ModelStructure['user']) => {
  const resource = _.omit(model, ['updatedAt', 'password']);

  return resource;
};

const extendUserRepository = {
  modelToResource,
  resourceToModel,
};

const repository = _.merge(userRepository, extendUserRepository);

export default repository;
