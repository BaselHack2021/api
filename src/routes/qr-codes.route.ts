import { GetAllQRCodesResponse, LinkQRCodeRequest, LinkQRCodeResponse } from '@baselhack2021/interfaces/endpoints';
import express from 'express';
import { version } from '../../package.json';
import { getAllQRCodes, linkQRCode } from '../models/QRCode';

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
