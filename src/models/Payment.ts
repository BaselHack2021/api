import { Schema, model } from 'mongoose';
import { Payment } from '@baselhack2021/interfaces/models';
import { getFestivalUserById, updateFestivalUserById } from './FestivalUser';

const schema = new Schema<Payment>({
  amount: { type: Number, required: true },
  description: String,
  festivalUser: { type: Schema.Types.ObjectId, ref: 'Festivaluser', required: true },
});

const PaymentModel = model<Payment>('Payment', schema);

const createTransaction = async (transactionObj: any) => {
  const { amount } = transactionObj;
  const currentBalance = await getFestivalUserById(transactionObj.festivalUser);

  if (currentBalance >= amount) {
    const newBalance = currentBalance + transactionObj.amount;
    await updateFestivalUserById(transactionObj.festivalUser, { balance: newBalance });
    return PaymentModel.create(transactionObj);
  }

  return 'insufficientBalance';
};

export {
  createTransaction,
};
