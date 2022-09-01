import _ from 'lodash';
import repository from '../repository';
import { ModelStructure } from '../repository/models';

export const getPostInformations = async (
  post: ModelStructure['post'],
  userAuth: ModelStructure['user']
) => {
  const [replies, likes, dislikes, isLiked, isDisliked] = await Promise.all([
    repository.comment.count({
      postId: post.id,
    }),
    repository.post.getPostLikes(post.id),
    repository.post.getPostDislikes(post.id),
    !_.isEmpty(userAuth) ? repository.post.getPostLikeStatus(post.id, userAuth.id) : false,
    !_.isEmpty(userAuth) ? repository.post.getPostDislikeStatus(post.id, userAuth.id) : false,
  ]);

  Object.assign(post, {
    replies,
    likes,
    dislikes,
    isLiked,
    isDisliked,
  });
};

export const getPostLikeDislike = async (
  condition: Pick<ModelStructure['postLike'], 'userId' | 'postId'>
) => {
  const [like, dislike] = await Promise.all([
    repository.like.post.findOne(condition),
    repository.dislike.post.findOne(condition),
  ]);

  return {
    like,
    dislike,
  };
};
