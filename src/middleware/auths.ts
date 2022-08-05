import _ from 'lodash';
import asyncMw from 'express-asyncmw';
import repository from '../repository';
import { signAccessToken, verifyAccessToken } from '../utils/token';
import { USER_ROLE } from '../utils/constant';
import { compareText } from '../utils/encryption';

export const authMw = asyncMw(async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.split(' ')[1];

  const isVerifiedToken = await verifyAccessToken(bearerToken);

  if (!isVerifiedToken) res.status(400).json({ message: 'Invalid token' });

  const user = await repository.user.findOne(isVerifiedToken.id);

  if (!user) return res.status(400).json({ message: 'Invalid token' });

  req.userAuth = user;
  req.isAdmin = req.userAuth.role === USER_ROLE.ADMIN;

  return next();
});

export const isAdminMw = asyncMw(async (req, res, next) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

  return next();
});

export const loginMw = asyncMw(async (req, res) => {
  const user = await repository.user.findOne({ email: req.body.email });

  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!(await compareText(req.body.password, user.password)))
    return res.status(401).json({ message: 'Invalid password' });

  const token = signAccessToken(_.pick(user, ['id', 'role']), req.body.always);

  return res.json({ id: user.id, token });
});
