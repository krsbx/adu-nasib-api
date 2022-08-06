import create from './create';
import get from './get';
import gets from './gets';
import update from './update';
import deleteUser from './delete';

const reponse = {
  create,
  get,
  gets,
  update,
  delete: deleteUser,
};

export default reponse;
