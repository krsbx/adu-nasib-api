import cors from 'cors';
import express, { Express } from 'express';
import routes from '../routes';
import { queryParserMw } from '../middleware/queryParser';
import { useJSONManipulator } from './server';

export default (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cors());
  useJSONManipulator(app);

  app.get('*', queryParserMw);
  app.use(routes);
};
