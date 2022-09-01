import _ from 'lodash';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import postLike from './postLike';
import postDislike from './postDislike';
import factory from './baseRepository';

const postRepository = factory(MODELS_NAME.POST);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['content', 'userId']);

  return model;
};

const modelToResource = async (model: ModelStructure['post']) => {
  return model;
};

const getPostLikes = async (postId: number) =>
  postLike.count({
    postId,
  });

const getPostDislikes = async (postId: number) =>
  postDislike.count({
    postId,
  });

const getPostLikeStatus = async (postId: number, userId: number) =>
  !_.isEmpty(
    await postLike.findOne({
      postId,
      userId,
    })
  );

const getPostDislikeStatus = async (postId: number, userId: number) =>
  !_.isEmpty(
    await postDislike.findOne({
      postId,
      userId,
    })
  );

const extendPostRepository = {
  modelToResource,
  resourceToModel,
  getPostLikes,
  getPostDislikes,
  getPostLikeStatus,
  getPostDislikeStatus,
};

const repository = _.merge(postRepository, extendPostRepository);

export default repository;
