import cors from 'cors';
import { Application, Request, Response } from 'express';
import morgan from 'morgan';
import usersRoute from '../routes/users.route';

export default async ({ app }: { app: Application }) => {
  app.get('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  app.head('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  app.enable('trust proxy');

  app.use('/users', usersRoute);

  app.use(cors());
  app.use(morgan('dev'));
};
