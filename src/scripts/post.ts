import _ from 'lodash';
import repository from '../repository';
import { ModelStructure } from '../repository/models';

export const getPostLikeDislikeCount = async (post: ModelStructure['post']) => {
  const [likes, dislikes] = await Promise.all([
    repository.post.getLikes(post.id),
    repository.post.getDislikes(post.id),
  ]);

  return {
    likes,
    dislikes,
  };
};

export const getPostInformations = async (
  post: ModelStructure['post'],
  userAuth: ModelStructure['user']
) => {
  const [replies, { likes, dislikes }, isLiked, isDisliked] = await Promise.all([
    repository.comment.count({
      postId: post.id,
    }),
    getPostLikeDislikeCount(post),
    !_.isEmpty(userAuth) ? repository.post.getLikeStatus(post.id, userAuth.id) : false,
    !_.isEmpty(userAuth) ? repository.post.getDislikeStatus(post.id, userAuth.id) : false,
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
