export {};

declare global {
  namespace Express {
    import type { User, Profile, Post, Comment } from '@prisma/client';

    interface Request {
      user?: User;
      users?: User[] | { rows: User[]; count: number };
      profile?: Profile;
      profiles?: Profile[] | { rows: Profile[]; count: number };
      post?: Post;
      posts?: Post[] | { rows: Post[]; count: number };
      comment?: Comment;
      comments?: Comment[] | { rows: Comment[]; count: number };
    }
  }
}
