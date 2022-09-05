import _ from 'lodash';
import factory from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

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
