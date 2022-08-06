import z from 'zod';
import { USER_ROLE } from './constant';

export const commentSchema = {
  create: z.object({
    content: z.string(),
    userId: z.number(),
    postId: z.number(),
  }),
  update: z.object({
    content: z.string(),
  }),
};

export const postSchema = {
  create: z.object({
    content: z.string(),
    userId: z.number(),
  }),
  update: z.object({
    content: z.string(),
  }),
};

export const userSchema = {
  create: z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email(),
    role: z.enum([USER_ROLE.ADMIN, USER_ROLE.USER]).optional(),
  }),
};
