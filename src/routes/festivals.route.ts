import express from 'express';
import { body, ValidationError, validationResult } from 'express-validator';
import { Festival } from '@baselhack2021/interfaces/models';
import {
  CreateFestivalResponse,
  GetAllFestivalsResponse,
  GetFestivalByIdRequest,
  GetFestivalByIdResponse,
  UpdateFestivalResponse,
} from '@baselhack2021/interfaces/endpoints';
import { createFestival, getAllFestivals, getFestivalById, updateFestivalByID } from '../models/Festival';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const festivals = await getAllFestivals();
  const resObj: GetAllFestivalsResponse = {
    status: 200,
    data: festivals,
    message: 'Success',
  };
  return res.json(resObj);
});

router.get('/:id', async (req: express.Request & { params: GetFestivalByIdRequest }, res: express.Response) => {
  const festivalId: string = req.params.id;

  let resObj: GetFestivalByIdResponse = {
    status: 404,
    data: null,
    message: 'Not implemented yet.',
  };

  const festival = await getFestivalById(festivalId);
  if (festival) {
    resObj = {
      status: 200,
      data: festival,
      message: 'Success',
    };
    return res.json(resObj);
  }

  return res.json(resObj);
});

router.post(
  '/',
  body('name').isString().isLength({ min: 2 }),
  body('description').isString().isLength({ min: 2 }),
  body('location').isString(),
  async (req: express.Request, res: express.Response) => {
    // const { firstName, lastName, gender, birthdate, email, phoneNumber } = req.body;

    let resObj: CreateFestivalResponse = {
      status: 404,
      data: null,
      message: 'Not Found.',
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
      data: (await createFestival({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
      })) as Festival,
      message: 'Created',
    });
  },
);

router.put(
  '/:id',
  body('name').isString().isLength({ min: 2 }),
  body('description').isString().isLength({ min: 2 }),
  body('location').isString(),
  async (req: express.Request, res: express.Response) => {
    const festivalId: string = req.params.id;

    let resObj: UpdateFestivalResponse = {
      status: 404,
      data: null,
      message: 'Not Found.',
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      resObj = {
        status: 400,
        data: null,
        message: 'Bad Request',
        errors: errors.array().map((error: ValidationError) => ({
          code: 400,
          message: `${error.param}: ${error.msg} => ${error.value}`,
        })),
      };
      return res.status(400).json(resObj);
    }

    return res.json({
      status: 201,
      data: (await updateFestivalByID(festivalId, {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
      })) as Festival,
      message: 'Updated',
    });
  },
);

export default router;
