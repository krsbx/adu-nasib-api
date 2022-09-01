import os from 'os';
import cluster from 'cluster';
import { Express } from 'express';
import { SERVER_MODE } from './constant';
import { jsonManipulator } from '../config/json';

const N_CPU = os.cpus().length;

export const getCPUToUse = () => {
  let nCPUToUse = 1;

  switch ((process.env.MODE ?? '').toUpperCase()) {
    case SERVER_MODE.PRODUCTION:
      nCPUToUse = N_CPU;
      break;

    case SERVER_MODE.DEVELOPMENT:
      nCPUToUse = 1;
      break;

    default:
      if (!process.env.MODE) break;
      if (Number.isNaN(+process.env.MODE)) break;
      if (+process.env.MODE < 1) break;

      nCPUToUse = +process.env.MODE;
  }

  return nCPUToUse;
};

export const useJSONManipulator = (app: Express) => {
  const nCPU = getCPUToUse();

  if (nCPU === 1) return;

  app.use(jsonManipulator);
};

const spawnServer = (app: Express, port: number, nCPU: number) => {
  if (cluster.isPrimary) {
    for (let i = 0; i < nCPU; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    app.listen(port, () => console.log(`PID ${process.pid}: Server started at port ${port}`));
  }
};

export const server = (app: Express, port: number) => {
  const nCPU = getCPUToUse();

  if (nCPU <= 1) {
    app.listen(port, () => console.log(`Server started at port ${port}`));
    return;
  }

  spawnServer(app, port, nCPU);
};
