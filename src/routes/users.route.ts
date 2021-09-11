import express from 'express';
import { body, ValidationError, validationResult } from 'express-validator';
import { User } from '../interfaces/models';
import {
  GetAllUsersResponse,
  GetUserByIdRequest,
  GetUserByIdResponse,
  RegisterUserResponse,
  UpdateUserRequestResponse,
} from '../interfaces/endpoints';
import { createUser, getAllUsers, getUserById, updateUserById } from '../models/User';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
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
      data: (await createUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      })) as User,
      message: 'Created',
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

    let resObj: UpdateUserRequestResponse = {
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
    });
  },
);

export default router;
