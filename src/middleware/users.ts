import _ from 'lodash';
import asyncMw from 'express-asyncmw';
import repository from '../repository';

export const createUserMw = asyncMw(async (req, res, next) => {
  const user = await repository.user.resourceToModel(req.body);

  req.user = await repository.user.create({
    ...user,
    // create a new user including the profiles
    profile: {
      create: {
        firstName: '',
        middleName: '',
        lastName: '',
      },
    },
  });

  return next();
});

export const updateUserMw = asyncMw(async (req, res, next) => {
  const user = await repository.user.resourceToModel(req.body);

  req.user = await repository.user.update(req.params.id, user);

  return next();
});

export const deleteUserMw = asyncMw(async (req, res) => {
  await repository.user.delete(req.params.id);

  return res.json({
    message: 'User deleted',
  });
});

export const getUserMw = asyncMw(async (req, res, next) => {
  req.user = await repository.user.findOne(req.params.id);

  return next();
});

export const getUsersMw = asyncMw(async (req, res, next) => {
  req.users = await repository.user.findAll({}, req.filterQueryParams, req.query);

  return next();
});

export const returnUserMw = asyncMw(async (req, res) => {
  const user = await repository.user.modelToResource(req.user);

  return res.json({
    ...user,
    ...(req.user?.profile
      ? { profile: await repository.profile.modelToResource(req.user.profile) }
      : {}),
  });
});

export const returnUsersMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.users, 'rows', []), (user) => repository.user.modelToResource(user))
    ),
    count: _.get(req.users, 'count', 0),
  });
});
