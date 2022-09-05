import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import express from 'express';
import { badWordScheduler } from './scheduler/badwords';
import root from './utils/root';
import { server } from './utils/server';

const envConfig = config();
expand(envConfig);

const app = express();
const PORT = process.env.PORT || 3000;

root(app);
server(app, +PORT);

badWordScheduler();
