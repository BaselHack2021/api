import express from 'express';
import { createTransaction } from '../models/Payment';
import { version } from '../version';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  const transaction = await createTransaction({
    amount: req.body.amount,
    festivalUser: req.body.festivalUserId,
  });
  return res.json({
    status: 200,
    message: 'Created',
    version,
    data: transaction,
  });
});

export default router;
