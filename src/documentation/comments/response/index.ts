import create from './create';
import get from './get';
import gets from './gets';
import update from './update';
import deleteComment from './delete';

const reponse = {
  create,
  get,
  gets,
  update,
  delete: deleteComment,
};

export default reponse;
