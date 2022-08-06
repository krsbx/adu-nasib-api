import { Tag } from 'swagger-jsdoc';
import path from './path';

const tag: Tag = {
  name: 'Post Collection',
  description: 'This collection is in /',
};

const posts = {
  tag,
  path,
};

export default posts;
