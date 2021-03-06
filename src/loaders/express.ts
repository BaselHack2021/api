import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import usersRoute from '../routes/users.route';
import festivalRoute from '../routes/festivals.route';
import festivalUserRoute from '../routes/festival-user.route';
import qrCodeRoute from '../routes/qr-codes.route';
import transactionRoute from '../routes/transactions.route';

export default async ({ app }: { app: Application }) => {
  app.use(express.json());
  app.use('*', cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
  app.use(morgan('dev'));

  app.get('/', (req, res) => res.json({ status: 200, message: 'Cool API', data: { apiGender: true } }));

  app.get('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  app.head('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  app.enable('trust proxy');

  app.use('/users', usersRoute);
  app.use('/festivals', festivalRoute);
  app.use('/festival-users', festivalUserRoute);
  app.use('/qr-codes', qrCodeRoute);
  app.use('/transactions', transactionRoute);

  app.get('/tea-time', (req: express.Request, res: express.Response) => res.status(418).json({ teaTime: '🫖' }));
};
