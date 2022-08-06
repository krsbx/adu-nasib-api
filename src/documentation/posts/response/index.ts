import create from './create';
import get from './get';
import gets from './gets';
import update from './update';
import deletePost from './delete';

const reponse = {
  create,
  get,
  gets,
  update,
  delete: deletePost,
};

export default reponse;
