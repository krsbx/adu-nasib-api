import _ from 'lodash';
import asyncMw from 'express-asyncmw';
import repository from '../repository';

export const createPostMw = asyncMw(async (req, res, next) => {
  const post = await repository.post.resourceToModel(req.body);

  if (!post.userId) post.userId = req.userAuth.id;

  req.post = await repository.post.create(post);

  return next();
});

export const updatePostMw = asyncMw(async (req, res, next) => {
  const post = await repository.post.resourceToModel(req.body);

  req.post = await repository.post.update(req.params.id, post);

  return next();
});

export const deletePostMw = asyncMw(async (req, res) => {
  await repository.post.delete(req.params.id);

  return res.json({
    message: 'Post deleted',
  });
});

export const getPostMw = asyncMw(async (req, res, next) => {
  req.post = await repository.post.findOne(req.params.id, {
    include: {
      user: true,
    },
  });

  return next();
});

export const getPostsMw = asyncMw(async (req, res, next) => {
  req.posts = await repository.post.findAll({}, req.filterQueryParams, req.query, {
    user: true,
  });

  return next();
});

export const returnPostMw = asyncMw(async (req, res) => {
  const post = await repository.post.modelToResource(req.post);

  return res.json({
    ...post,
    ...(req.post?.user ? { user: await repository.post.modelToResource(req.post.user) } : {}),
  });
});

export const returnPostsMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.posts, 'rows', []), (post) => ({
        ...repository.post.modelToResource(post),
        ...(post.user ? { user: repository.post.modelToResource(post.user) } : {}),
      }))
    ),
    count: _.get(req.posts, 'count', 0),
  });
});
