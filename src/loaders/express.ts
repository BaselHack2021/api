import cors from 'cors';
import { Application, Request, Response } from 'express';
import morgan from 'morgan';

export default async ({ app }: { app: Application }) => {
  app.get('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  app.head('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  app.enable('trust proxy');

  app.use(cors());
  app.use(morgan('dev'));
};
