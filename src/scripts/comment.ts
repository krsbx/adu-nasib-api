import _ from 'lodash';
import repository from '../repository';
import { ModelStructure } from '../repository/models';

export const getCommentInformations = async (
  comment: ModelStructure['comment'],
  userAuth: ModelStructure['user']
) => {
  const [likes, dislikes, isLiked, isDisliked] = await Promise.all([
    repository.comment.getCommentLikes(comment.id),
    repository.comment.getCommentDislikes(comment.id),
    !_.isEmpty(userAuth) ? repository.comment.getCommentLikeStatus(comment.id, userAuth.id) : false,
    !_.isEmpty(userAuth)
      ? repository.comment.getCommentDislikeStatus(comment.id, userAuth.id)
      : false,
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
