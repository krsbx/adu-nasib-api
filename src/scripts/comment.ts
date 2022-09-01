import _ from 'lodash';
import repository from '../repository';
import { ModelStructure } from '../repository/models';

export const getCommentLikeDislikeCount = async (comment: ModelStructure['comment']) => {
  const [likes, dislikes] = await Promise.all([
    repository.comment.getLikes(comment.id),
    repository.comment.getDislikes(comment.id),
  ]);

  return {
    likes,
    dislikes,
  };
};

export const getCommentInformations = async (
  comment: ModelStructure['comment'],
  userAuth: ModelStructure['user']
) => {
  const [{ likes, dislikes }, isLiked, isDisliked] = await Promise.all([
    getCommentLikeDislikeCount(comment),
    !_.isEmpty(userAuth) ? repository.comment.getLikeStatus(comment.id, userAuth.id) : false,
    !_.isEmpty(userAuth) ? repository.comment.getDislikeStatus(comment.id, userAuth.id) : false,
  ]);

  Object.assign(comment, {
    likes,
    dislikes,
    isLiked,
    isDisliked,
  });
};

export const getCommentLikeDislike = async (
  condition: Pick<ModelStructure['commentLike'], 'userId' | 'commentId'>
) => {
  const [like, dislike] = await Promise.all([
    repository.like.comment.findOne(condition),
    repository.dislike.comment.findOne(condition),
  ]);

  return {
    like,
    dislike,
  };
};
