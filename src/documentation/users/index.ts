import { Tag } from 'swagger-jsdoc';
import path from './path';

const tag: Tag = {
  name: 'User Collection',
  description: 'This collection is in /',
};

const users = {
  tag,
  path,
};

export default users;
