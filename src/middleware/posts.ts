import asyncMw from 'express-asyncmw';
import _ from 'lodash';
import { ZodError } from 'zod';
import repository from '../repository';
import { getPostInformations, getPostLikeDislike, getPostLikeDislikeCount } from '../scripts/post';
import { handleZodError } from '../utils/errors';
import { postSchema } from '../utils/schema';

export const createPostMw = asyncMw(async (req, res, next) => {
  if (!req.body.userId) req.body.userId = req.userAuth.id;
  if (!req.isAdmin) req.body.userId = req.userAuth.id;

  try {
    const body = postSchema.create.parse(req.body);
    const post = await repository.post.resourceToModel(body);

    req.post = await repository.post.create(post, {
      include: {
        user: true,
      },
    });

    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return handleZodError(err, res);
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
});

export const updatePostMw = asyncMw(async (req, res, next) => {
  // Only admin and the user himself can update the user post
  if (!req.isAdmin && req.userAuth.id !== req.post.userId)
    return res.status(403).json({ message: 'Forbidden' });

  const post = await repository.post.resourceToModel(req.body);

  if (post.userId) delete post.userId;

  req.post = await repository.post.update(req.params.id, post);

  return next();
});

export const deletePostMw = asyncMw(async (req, res) => {
  // Only admin and the user himself can delete the user post
  if (!req.isAdmin && req.userAuth.id !== req.post.userId)
    return res.status(403).json({ message: 'Forbidden' });

  await repository.post.delete(req.params.id);

  return res.json({
    message: 'Post deleted',
  });
});

export const getPostMw = asyncMw(async (req, res, next) => {
  const post = await repository.post.findOne(req.params.id, {
    include: {
      user: true,
    },
  });

  if (!post) return res.status(404).json({ message: 'Post not found' });

  req.post = post;

  await getPostInformations(req.post, req.userAuth);

  return next();
});

export const getPostsMw = asyncMw(async (req, res, next) => {
  let condition = {};

  if (req.user) condition = { userId: req.user.id };

  req.posts = await repository.post.findAll(condition, req.filterQueryParams, req.query, {
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!_.isEmpty(req.posts) && req.posts.count > 0) {
    await Promise.all(
      _.map(req.posts.rows, async (post) => getPostInformations(post, req.userAuth))
    );
  }

  return next();
});

export const returnPostMw = asyncMw(async (req, res) => {
  const post = await repository.post.modelToResource(req.post);

  return res.json({
    ...post,
    ...(req.post?.user ? { user: await repository.user.modelToResource(req.post.user) } : {}),
  });
});

export const returnPostsMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.posts, 'rows', []), async (post) => ({
        ...(await repository.post.modelToResource(post)),
        ...(post.user ? { user: await repository.user.modelToResource(post.user) } : {}),
      }))
    ),
    count: _.get(req.posts, 'count', 0),
  });
});

export const likePostMw = asyncMw(async (req, res) => {
  const resource = {
    postId: req.post.id,
    userId: req.userAuth.id,
  };

  const likeDislike = await getPostLikeDislike(resource);

  if (likeDislike.like) await repository.like.post.delete(likeDislike.like.id);
  else await repository.like.post.create(resource);

  if (likeDislike.dislike) {
    await repository.dislike.post.delete(likeDislike.dislike.id);
    likeDislike.dislike = null;
  }

  const likesDislikes = await getPostLikeDislikeCount(req.post);

  return res.json({
    isLiked: !likeDislike.like,
    isDisliked: !!likeDislike.dislike,
    ...likesDislikes,
  });
});

export const dislikePostMw = asyncMw(async (req, res) => {
  const resource = {
    postId: req.post.id,
    userId: req.userAuth.id,
  };

  const likeDislike = await getPostLikeDislike(resource);

  if (likeDislike.dislike) await repository.dislike.post.delete(likeDislike.dislike.id);
  else await repository.dislike.post.create(resource);

  if (likeDislike.like) {
    await repository.like.post.delete(likeDislike.like.id);
    likeDislike.like = null;
  }

  const likesDislikes = await getPostLikeDislikeCount(req.post);

  return res.json({
    isLiked: !!likeDislike.like,
    isDisliked: !likeDislike.dislike,
    ...likesDislikes,
  });
});
