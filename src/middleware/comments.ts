import _ from 'lodash';
import asyncMw from 'express-asyncmw';
import repository from '../repository';

export const createCommentMw = asyncMw(async (req, res, next) => {
  const comment = await repository.comment.resourceToModel(req.body);

  if (!comment.userId) comment.userId = req.userAuth.id;

  req.comment = await repository.comment.create(comment);

  return next();
});

export const updateCommentMw = asyncMw(async (req, res, next) => {
  const comment = await repository.comment.resourceToModel(req.body);

  req.comment = await repository.comment.update(req.params.id, comment);

  return next();
});

export const deleteCommentMw = asyncMw(async (req, res) => {
  await repository.comment.delete(req.params.id);

  return res.json({
    message: 'Comment deleted',
  });
});

export const getCommentMw = asyncMw(async (req, res, next) => {
  req.comment = await repository.comment.findOne(req.params.id, {
    include: {
      user: true,
    },
  });

  return next();
});

export const getCommentsMw = asyncMw(async (req, res, next) => {
  req.comments = await repository.comment.findAll({}, req.filterQueryParams, req.query, {
    user: true,
  });

  return next();
});

export const returnCommentMw = asyncMw(async (req, res) => {
  const comment = await repository.comment.modelToResource(req.comment);

  return res.json({
    ...comment,
    ...(req.comment?.user
      ? { user: await repository.comment.modelToResource(req.comment.user) }
      : {}),
  });
});

export const returnCommentsMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.comments, 'rows', []), (comment) => ({
        ...repository.comment.modelToResource(comment),
        ...(comment.user ? { user: repository.comment.modelToResource(comment.user) } : {}),
      }))
    ),
    count: _.get(req.comments, 'count', 0),
  });
});
