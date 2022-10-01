import cors from 'cors';
import express, { Express } from 'express';
import { errorHandling } from '../config/error';
import { queryParserMw } from '../middleware/queryParser';
import routes from '../routes';
import { jsonManipulator } from './server';

export default (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cors());
  app.use(jsonManipulator());

  app.get('*', queryParserMw);
  app.use(routes);
  app.use(errorHandling);
};
