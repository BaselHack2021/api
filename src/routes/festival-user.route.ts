import { GetUserByIdRequest, GetUserByIdResponse, RegisterUserResponse } from '@baselhack2021/interfaces/endpoints';
import { FestivalUser } from '@baselhack2021/interfaces/models';
import express from 'express';
import { body, validationResult } from 'express-validator';
import parseValidationErrors from '../helpers/parse-validation-error';
import { version } from '../../package.json';
import { createFestivaluser, getFestivalUserById } from '../models/FestivalUser';

const router = express.Router();

router.get('/:id', async (req: express.Request & { params: GetUserByIdRequest }, res: express.Response) => {
  const userId: string = req.params.id;

  let resObj: GetUserByIdResponse = {
    status: 404,
    data: null,
    message: 'Not Found.',
    version,
  };

  const user = await getFestivalUserById(userId);
  if (user) {
    resObj = {
      status: 200,
      data: user as any, // todo set type
      message: 'Success',
      version,
    };
    return res.json(resObj);
  }

  return res.json(resObj);
});

router.post(
  '/',
  body('festivalId').isString().isLength({ min: 2 }),
  body('userId').isString().isLength({ min: 2 }),
  async (req: express.Request, res: express.Response) => {
    // const { firstName, lastName, gender, birthdate, email, phoneNumber } = req.body;

    let resObj: RegisterUserResponse = {
      status: 404,
      data: null,
      message: 'Not implemented yet.',
      version,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      resObj = {
        status: 400,
        data: null,
        message: 'Bad Request',
        errors: parseValidationErrors(errors),
        version,
      };
      return res.status(400).json(resObj);
    }

    return res.json({
      status: 201,
      data: (await createFestivaluser({
        user: req.body.userId,
        festival: req.body.festivalId,
      })) as FestivalUser,
      message: 'Created',
      version,
    });
  },
);

export default router;
