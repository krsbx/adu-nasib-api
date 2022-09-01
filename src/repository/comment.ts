import _ from 'lodash';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import commentLike from './commentLike';
import commentDislike from './commentDislike';
import factory from './baseRepository';

const commentRepository = factory(MODELS_NAME.COMMENT);

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['content', 'postId', 'userId']);

  return model;
};

const modelToResource = async (model: ModelStructure['comment']) => {
  return model;
};

const getCommentLikes = async (commentId: number) =>
  commentLike.count({
    commentId,
  });

const getCommentDislikes = async (commentId: number) =>
  commentDislike.count({
    commentId,
  });

const getCommentLikeStatus = async (commentId: number, userId: number) =>
  !_.isEmpty(
    await commentLike.findOne({
      commentId,
      userId,
    })
  );

const getCommentDislikeStatus = async (commentId: number, userId: number) =>
  !_.isEmpty(
    await commentDislike.findOne({
      commentId,
      userId,
    })
  );

const extendCommentRepository = {
  modelToResource,
  resourceToModel,
  getCommentLikes,
  getCommentDislikes,
  getCommentLikeStatus,
  getCommentDislikeStatus,
};

const repository = _.merge(commentRepository, extendCommentRepository);

export default repository;
