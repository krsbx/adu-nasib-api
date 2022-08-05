import _ from 'lodash';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import factory from './baseRepository';

const profileRepository = factory(MODELS_NAME.PROFILE);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['firstname', 'middlename', 'lastname', 'userId']);

  return model;
};

const modelToResource = async (model: ModelStructure['profile']) => {
  return model;
};

const extendProfileRepository = {
  modelToResource,
  resourceToModel,
};

const repository = _.merge(profileRepository, extendProfileRepository);

export default repository;
