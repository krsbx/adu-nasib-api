import comment from './comment';
import commentDislike from './commentDislike';
import commentLike from './commentLike';
import post from './post';
import postDislike from './postDislike';
import postLike from './postLike';
import profile from './profile';
import user from './user';

const repository = {
  user,
  profile,
  post,
  comment,
  like: {
    post: postLike,
    comment: commentLike,
  },
  dislike: {
    post: postDislike,
    comment: commentDislike,
  },
};

export default repository;
