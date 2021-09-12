import {
  GetAllQRCodesResponse,
  GetQRCodeByIdRequest,
  GetQRCodeByIdResponse,
  LinkQRCodeRequest,
  LinkQRCodeResponse,
} from '@baselhack2021/interfaces/endpoints';
import express from 'express';
import { version } from '../version';
import { getAllQRCodes, getQRCodeById, linkQRCode } from '../models/QRCode';
import { QRCode } from '@baselhack2021/interfaces/models';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const codes = await getAllQRCodes();
  const resObj: GetAllQRCodesResponse = {
    status: 200,
    data: codes,
    message: 'Success',
    version,
  };
  return res.json(resObj);
});

router.get('/:id', async (req: express.Request & { params: GetQRCodeByIdRequest }, res: express.Response) => {
  const codeId: string = req.params.id;

  let resObj: GetQRCodeByIdResponse = {
    status: 404,
    data: null,
    message: 'Not Found.',
    version,
  };

  const code = await getQRCodeById(codeId);
  if (code) {
    resObj = {
      status: 200,
      data: code as QRCode, // todo set type
      message: 'Success',
      version,
    };
    return res.json(resObj);
  }

  return res.json(resObj);
});

router.put('/link', async (req: express.Request & { body: LinkQRCodeRequest }, res: express.Response) => {
  await linkQRCode(req.body.qrcode, { user: req.body.festivalUserId } as any);
  const resObj: LinkQRCodeResponse = {
    status: 201,
    data: null,
    message: 'Created',
    version,
  };
  return res.json(resObj);
});

export default router;
