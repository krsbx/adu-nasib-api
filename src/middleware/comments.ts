import _ from 'lodash';
import { ZodError } from 'zod';
import asyncMw from 'express-asyncmw';
import repository from '../repository';
import { handleZodError } from '../utils/errors';
import { commentSchema } from '../utils/schema';

export const createCommentMw = asyncMw(async (req, res, next) => {
  if (!req.body.userId) req.body.userId = req.userAuth.id;
  if (!req.isAdmin) req.body.userId = req.userAuth.id;

  try {
    const body = commentSchema.create.parse(req.body);
    const comment = await repository.comment.resourceToModel(body);

    req.comment = await repository.comment.create(comment, {
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

  req.comment.likes = await repository.like.comment.model.count({
    where: {
      commentId: comment.id,
    },
  });

  // eslint-disable-next-line no-param-reassign
  req.comment.dislikes = await repository.dislike.comment.model.count({
    where: {
      commentId: comment.id,
    },
  });

  // eslint-disable-next-line no-param-reassign
  req.comment.isLiked = !_.isEmpty(req.userAuth)
    ? !!(await repository.like.comment.findOne({
        userId: req.userAuth.id,
      }))
    : false;

  // eslint-disable-next-line no-param-reassign
  req.comment.isDisliked = !_.isEmpty(req.userAuth)
    ? !!(await repository.dislike.comment.findOne({
        userId: req.userAuth.id,
      }))
    : false;

  return next();
});

export const getCommentsMw = asyncMw(async (req, res, next) => {
  let condition = {};

  if (req.user) condition = { userId: req.user.id };

  req.comments = await repository.comment.findAll(condition, req.filterQueryParams, req.query, {
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!_.isEmpty(req.comments) && req.comments.count > 0) {
    await Promise.all(
      _.map(req.comments.rows, async (comment) => {
        // eslint-disable-next-line no-param-reassign
        comment.likes = await repository.like.comment.model.count({
          where: {
            commentId: comment.id,
          },
        });

        // eslint-disable-next-line no-param-reassign
        comment.dislikes = await repository.dislike.comment.model.count({
          where: {
            commentId: comment.id,
          },
        });

        // eslint-disable-next-line no-param-reassign
        comment.isLiked = !_.isEmpty(req.userAuth)
          ? !!(await repository.like.comment.findOne({
              userId: req.userAuth.id,
            }))
          : false;

        // eslint-disable-next-line no-param-reassign
        comment.isDisliked = !_.isEmpty(req.userAuth)
          ? !!(await repository.dislike.comment.findOne({
              userId: req.userAuth.id,
            }))
          : false;
      })
    );
  }

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
      _.map(_.get(req.comments, 'rows', []), async (comment) => ({
        ...(await repository.comment.modelToResource(comment)),
        ...(comment.user ? { user: await repository.user.modelToResource(comment.user) } : {}),
      }))
    ),
    count: _.get(req.comments, 'count', 0),
  });
});

export const likeCommentMw = asyncMw(async (req, res) => {
  const resource = {
    commentId: req.comment.id,
    userId: req.userAuth.id,
  };

  const like = await repository.like.comment.findOne(_.pick(resource, ['userId']));
  const dislike = await repository.dislike.comment.findOne(_.pick(resource, ['userId']));

  if (like) await repository.like.comment.delete(like.id);
  else {
    await repository.like.comment.create(resource);
    if (dislike) await repository.dislike.comment.delete(dislike.id);
  }

  res.json({
    isLiked: !like,
    isDisliked: dislike,
  });
});

export const dislikeCommentMw = asyncMw(async (req, res) => {
  const resource = {
    commentId: req.comment.id,
    userId: req.userAuth.id,
  };

  const like = await repository.like.comment.findOne(_.pick(resource, ['userId']));
  const dislike = await repository.dislike.comment.findOne(_.pick(resource, ['userId']));

  if (dislike) await repository.dislike.comment.delete(dislike.id);
  else {
    await repository.dislike.comment.create(resource);
    if (like) await repository.like.comment.delete(like.id);
  }

  res.json({
    isLiked: like,
    isDisliked: !dislike,
  });
});
