import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import usersRoute from '../routes/users.route';

export default async ({ app }: { app: Application }) => {
  app.get('/', (req, res) => res.json({ status: 200, message: 'Cool API', data: { apiGender: true } }));

  app.get('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  app.head('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  app.enable('trust proxy');

  app.use('/users', usersRoute);

  app.use(express.json());
  app.use(cors({ origin: '*' }));
  app.use(morgan('dev'));
};
