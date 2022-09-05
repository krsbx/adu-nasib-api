import BadwordFilter from 'badwords-ts';
import _ from 'lodash';
import factory from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import postDislike from './postDislike';
import postLike from './postLike';

const postRepository = factory(MODELS_NAME.POST);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['content', 'userId']);

  if (model.content) model.content = BadwordFilter.instance.clean(model.content);

  return model;
};

const modelToResource = async (model: ModelStructure['post']) => {
  return model;
};

const getLikes = async (postId: number) =>
  postLike.count({
    postId,
  });

const getDislikes = async (postId: number) =>
  postDislike.count({
    postId,
  });

const getLikeStatus = async (postId: number, userId: number) =>
  !_.isEmpty(
    await postLike.findOne({
      postId,
      userId,
    })
  );

const getDislikeStatus = async (postId: number, userId: number) =>
  !_.isEmpty(
    await postDislike.findOne({
      postId,
      userId,
    })
  );

const extendPostRepository = {
  modelToResource,
  resourceToModel,
  getLikes,
  getDislikes,
  getLikeStatus,
  getDislikeStatus,
};

const repository = _.merge(postRepository, extendPostRepository);

export default repository;
