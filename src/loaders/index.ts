import { Application } from 'express';
import expressLoader from './express';
import Logger from './logger';
import mongooseLoader from './mongoose';

export default async ({ expressApp }: { expressApp: Application }): Promise<void> => {
  await mongooseLoader();
  Logger.info('🧮 MongoDB Initialized!');

  await expressLoader({ app: expressApp });
  Logger.info('🚂 Express Initialized!');
};
