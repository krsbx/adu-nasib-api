import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import express from 'express';
import { server } from './utils/server';
import root from './utils/root';

const envConfig = config();
expand(envConfig);

const app = express();
const PORT = process.env.PORT || 3000;

root(app);
server(app, +PORT);
