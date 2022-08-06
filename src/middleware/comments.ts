import _ from 'lodash';
import { ZodError } from 'zod';
import asyncMw from 'express-asyncmw';
import repository from '../repository';
import { handleZodError } from '../utils/errors';
import { commentSchema } from '../utils/schema';

export const createCommentMw = asyncMw(async (req, res, next) => {
  try {
    const body = commentSchema.create.parse(req.body);
    const comment = await repository.comment.resourceToModel(body);

    if (!req.isAdmin) comment.userId = req.userAuth.id;

    req.comment = await repository.comment.create(comment);

    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return handleZodError(err, res);
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
});

export const updateCommentMw = asyncMw(async (req, res, next) => {
  // Only admin and the user himself can update the user comment
  if (!req.isAdmin && req.userAuth.id !== req.comment.userId)
    return res.status(403).json({ message: 'Forbidden' });

  const comment = await repository.comment.resourceToModel(req.body);

  if (comment.postId) delete comment.postId;
  if (comment.userId) delete comment.userId;

  req.comment = await repository.comment.update(req.params.id, comment);

  return next();
});

export const deleteCommentMw = asyncMw(async (req, res) => {
  // Only admin and the user himself can delete the user comment
  if (!req.isAdmin && req.userAuth.id !== req.comment.userId)
    return res.status(403).json({ message: 'Forbidden' });

  await repository.comment.delete(req.params.id);

  return res.json({
    message: 'Comment deleted',
  });
});

export const getCommentMw = asyncMw(async (req, res, next) => {
  const comment = await repository.comment.findOne(req.params.id, {
    include: {
      user: true,
    },
  });

  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  req.comment = comment;

  return next();
});

export const getCommentsMw = asyncMw(async (req, res, next) => {
  let condition = {};

  if (req.user) condition = { userId: req.user.id };

  req.comments = await repository.comment.findAll(condition, req.filterQueryParams, req.query, {
    user: true,
  });

  return next();
});

export const returnCommentMw = asyncMw(async (req, res) => {
  const comment = await repository.comment.modelToResource(req.comment);

  return res.json({
    ...comment,
    ...(req.comment?.user ? { user: await repository.user.modelToResource(req.comment.user) } : {}),
  });
});

export const returnCommentsMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.comments, 'rows', []), (comment) => ({
        ...repository.comment.modelToResource(comment),
        ...(comment.user ? { user: repository.user.modelToResource(comment.user) } : {}),
      }))
    ),
    count: _.get(req.comments, 'count', 0),
  });
});
