import express from 'express';
import { body, ValidationError, validationResult } from 'express-validator';
import { createFestivaluser, getFestivalUserById } from '../models/FestivalUser';
import { GetUserByIdRequest, GetUserByIdResponse, RegisterUserResponse } from '../interfaces/endpoints';
import { FestivalUser } from '../interfaces/models';

const router = express.Router();

router.get('/:id', async (req: express.Request & { params: GetUserByIdRequest }, res: express.Response) => {
  const userId: string = req.params.id;

  let resObj: GetUserByIdResponse = {
    status: 404,
    data: null,
    message: 'Not Found.',
  };

  const user = await getFestivalUserById(userId);
  if (user) {
    resObj = {
      status: 200,
      data: user as any, // todo set type
      message: 'Success',
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
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      resObj = {
        status: 400,
        data: null,
        message: 'Bad Request',
        errors: errors.array().map((error: ValidationError) => ({
          code: 400,
          message: `${error.param}: ${error.msg}`,
        })),
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
    });
  },
);

export default router;
