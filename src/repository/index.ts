import user from './user';
import profile from './profile';
import post from './post';
import comment from './comment';
import postLike from './postLike';
import commentLike from './commentLike';
import postDislike from './postDislike';
import commentDislike from './commentDislike';

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
