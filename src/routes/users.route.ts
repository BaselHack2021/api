import {
  GetAllUsersResponse,
  GetUserByIdRequest,
  GetUserByIdResponse,
  RegisterUserResponse,
  UpdateUserResponse,
} from '@baselhack2021/interfaces/endpoints';
import { User } from '@baselhack2021/interfaces/models';
import express from 'express';
import { body, validationResult } from 'express-validator';
import parseValidationErrors from '../helpers/parse-validation-error';
import { version } from '../../package.json';
import { createUser, getAllUsers, getUserById, updateUserById } from '../models/User';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const users = await getAllUsers();
  const resObj: GetAllUsersResponse = {
    status: 200,
    data: users,
    message: 'Success',
    version,
  };
  return res.json(resObj);
});

router.get('/:id', async (req: express.Request & { params: GetUserByIdRequest }, res: express.Response) => {
  const userId: string = req.params.id;

  let resObj: GetUserByIdResponse = {
    status: 404,
    data: null,
    message: 'Not Found.',
    version,
  };

  const user = await getUserById(userId);
  if (user) {
    resObj = {
      status: 200,
      data: user,
      message: 'Success',
      version,
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
      data: (await createUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      })) as User,
      message: 'Created',
      version,
    });
  },
);

router.put(
  '/:id',
  body('firstName').isString().isLength({ min: 2 }),
  body('lastName').isString().isLength({ min: 2 }),
  body('gender').isBoolean(),
  body('birthdate').isString(),
  body('email').isString().isEmail(),
  body('phoneNumber').isString(),
  body('status').isBoolean(),
  async (req: express.Request, res: express.Response) => {
    const userId: string = req.params.id;

    let resObj: UpdateUserResponse = {
      status: 404,
      data: null,
      message: 'Not Found.',
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
      data: (await updateUserById(userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        status: req.body.status ? 'verified' : 'unverified',
      })) as User,
      message: 'Updated',
      version,
    });
  },
);

export default router;
