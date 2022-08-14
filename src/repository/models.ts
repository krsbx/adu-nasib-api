//! Do not edit this file manually, it is generate by `prisma repo generator`

import _ from 'lodash';
import { PrismaClient, Prisma, User, Profile, Post, Comment, PostLike, CommentLike, PostDislike, CommentDislike } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<string, any>;

export type BaseOption<Include, Select> = {
  include?: Include;
  select?: Select;
};

export type Find<Select, Include, Cursor, Order, Distinct> = BaseOption<Include, Select> & {
  cursor?: Cursor;
  take?: number;
  skip?: number;
  orderBy?: Prisma.Enumerable<Order>;
  distinct?: Distinct;
};

export type CountArgs<Select, Cursor, Order, Distinct> = Omit<
  Find<Select, never, Cursor, Order, Distinct>,
  'include'
>;

export type Aggregate<Cursor, Order, Distinct> = Omit<
  CountArgs<never, Cursor, Order, Distinct>,
  'select' | 'distinct'
>;

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export const models = _.omit(prisma, [
  '$on',
  '$connect',
  '$disconnect',
  '$use',
  '$executeRaw',
  '$executeRawUnsafe',
  '$queryRaw',
  '$queryRawUnsafe',
  '$transaction',
]);

export const MODELS_NAME = {
  USER: 'user',
  PROFILE: 'profile',
  POST: 'post',
  COMMENT: 'comment',
  POST_LIKE: 'postLike',
  COMMENT_LIKE: 'commentLike',
  POST_DISLIKE: 'postDislike',
  COMMENT_DISLIKE: 'commentDislike',
} as const;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ModelStructure = {
  user: User;
  profile: Profile;
  post: Post;
  comment: Comment;
  postLike: PostLike;
  commentLike: CommentLike;
  postDislike: PostDislike;
  commentDislike: CommentDislike;
};

export type ModelName = keyof ModelStructure;

export type ModelScalarFields<T extends keyof ModelStructure> = Prisma.Enumerable<keyof ModelStructure[T]>;

export type ModelDelegate = Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined;

export type ModelTypes = {
  user: {
    Where: Prisma.UserWhereInput;
    Select: Prisma.UserSelect;
    Include: Prisma.UserInclude;
    Create: Prisma.UserCreateInput | Prisma.UserUncheckedCreateInput;
    Update: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput;
    Cursor: Prisma.UserWhereUniqueInput;
    Order: Prisma.UserOrderByWithRelationInput;
    Delegate: Prisma.UserDelegate<ModelDelegate>;
  };
  profile: {
    Where: Prisma.ProfileWhereInput;
    Select: Prisma.ProfileSelect;
    Include: Prisma.ProfileInclude;
    Create: Prisma.ProfileCreateInput | Prisma.ProfileUncheckedCreateInput;
    Update: Prisma.ProfileUpdateInput | Prisma.ProfileUncheckedUpdateInput;
    Cursor: Prisma.ProfileWhereUniqueInput;
    Order: Prisma.ProfileOrderByWithRelationInput;
    Delegate: Prisma.ProfileDelegate<ModelDelegate>;
  };
  post: {
    Where: Prisma.PostWhereInput;
    Select: Prisma.PostSelect;
    Include: Prisma.PostInclude;
    Create: Prisma.PostCreateInput | Prisma.PostUncheckedCreateInput;
    Update: Prisma.PostUpdateInput | Prisma.PostUncheckedUpdateInput;
    Cursor: Prisma.PostWhereUniqueInput;
    Order: Prisma.PostOrderByWithRelationInput;
    Delegate: Prisma.PostDelegate<ModelDelegate>;
  };
  comment: {
    Where: Prisma.CommentWhereInput;
    Select: Prisma.CommentSelect;
    Include: Prisma.CommentInclude;
    Create: Prisma.CommentCreateInput | Prisma.CommentUncheckedCreateInput;
    Update: Prisma.CommentUpdateInput | Prisma.CommentUncheckedUpdateInput;
    Cursor: Prisma.CommentWhereUniqueInput;
    Order: Prisma.CommentOrderByWithRelationInput;
    Delegate: Prisma.CommentDelegate<ModelDelegate>;
  };
  postLike: {
    Where: Prisma.PostLikeWhereInput;
    Select: Prisma.PostLikeSelect;
    Include: Prisma.PostLikeInclude;
    Create: Prisma.PostLikeCreateInput | Prisma.PostLikeUncheckedCreateInput;
    Update: Prisma.PostLikeUpdateInput | Prisma.PostLikeUncheckedUpdateInput;
    Cursor: Prisma.PostLikeWhereUniqueInput;
    Order: Prisma.PostLikeOrderByWithRelationInput;
    Delegate: Prisma.PostLikeDelegate<ModelDelegate>;
  };
  commentLike: {
    Where: Prisma.CommentLikeWhereInput;
    Select: Prisma.CommentLikeSelect;
    Include: Prisma.CommentLikeInclude;
    Create: Prisma.CommentLikeCreateInput | Prisma.CommentLikeUncheckedCreateInput;
    Update: Prisma.CommentLikeUpdateInput | Prisma.CommentLikeUncheckedUpdateInput;
    Cursor: Prisma.CommentLikeWhereUniqueInput;
    Order: Prisma.CommentLikeOrderByWithRelationInput;
    Delegate: Prisma.CommentLikeDelegate<ModelDelegate>;
  };
  postDislike: {
    Where: Prisma.PostDislikeWhereInput;
    Select: Prisma.PostDislikeSelect;
    Include: Prisma.PostDislikeInclude;
    Create: Prisma.PostDislikeCreateInput | Prisma.PostDislikeUncheckedCreateInput;
    Update: Prisma.PostDislikeUpdateInput | Prisma.PostDislikeUncheckedUpdateInput;
    Cursor: Prisma.PostDislikeWhereUniqueInput;
    Order: Prisma.PostDislikeOrderByWithRelationInput;
    Delegate: Prisma.PostDislikeDelegate<ModelDelegate>;
  };
  commentDislike: {
    Where: Prisma.CommentDislikeWhereInput;
    Select: Prisma.CommentDislikeSelect;
    Include: Prisma.CommentDislikeInclude;
    Create: Prisma.CommentDislikeCreateInput | Prisma.CommentDislikeUncheckedCreateInput;
    Update: Prisma.CommentDislikeUpdateInput | Prisma.CommentDislikeUncheckedUpdateInput;
    Cursor: Prisma.CommentDislikeWhereUniqueInput;
    Order: Prisma.CommentDislikeOrderByWithRelationInput;
    Delegate: Prisma.CommentDislikeDelegate<ModelDelegate>;
  };
};
