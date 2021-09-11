import express from 'express';
import { body, ValidationError, validationResult } from 'express-validator';
import {
  GetAllUsersResponse,
  GetUserByIdRequest,
  GetUserByIdResponse,
  RegisterUserResponse,
} from '../interfaces/endpoints';
import { createUser, getAllUsers, getUserById } from '../models/User';

const router = express.Router();

router.get('/',async (req: express.Request, res: express.Response) => {
  const users = await getAllUsers();
  const resObj: GetAllUsersResponse = {
    status: 200,
    data: users,
    message: 'Success',
  };
  return res.json(resObj);
});

router.get('/:id', async (req: express.Request & { params: GetUserByIdRequest }, res: express.Response) => {
  const userId: string = req.params.id;

  let resObj: GetUserByIdResponse = {
    status: 404,
    data: null,
    message: 'Not implemented yet.',
  };

  const user = await getUserById(userId);
  if (user) {
    resObj = {
      status: 200,
      data: user,
      message: 'Success',
    };
    return res.json(resObj);
  }

  return res.json(resObj);
});

router.post(
  '/register',
  body('firstName').isString().isLength({ min: 2 }),
  body('lastName').isString().isLength({ min: 2 }),
  body('gender').isBoolean(),
  body('birthdate').isString(),
  body('email').isString().isEmail(),
  body('phoneNumber').isString(),
  async (req: express.Request, res: express.Response) => {
    // const { firstName, lastName, gender, birthdate, email, phoneNumber } = req.body;

    console.log(req.query);
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

    // const u = await createUser({
    //   firstName: 'Test',
    //   lastName: 'Muster Alpha Mann',
    //   birthdate: new Date(),
    //   email: 'test@wdawd.ch',
    //   gender: true,
    // });

    resObj = {
      status: 201,
      data: req.body,
      message: 'Created',
    };

    return res.json(resObj);
  },
);

export default router;
