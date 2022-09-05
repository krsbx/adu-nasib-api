import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

class ProfileRepository extends BaseRepository(MODELS_NAME.PROFILE) {
  public static async resourceToModel(resource: AnyRecord) {
    const model = _.pick(resource, ['firstname', 'middlename', 'lastname', 'userId']);

    return model;
  }

  public static async modelToResource(model: ModelStructure['profile']) {
    return model;
  }
}

export default ProfileRepository;
